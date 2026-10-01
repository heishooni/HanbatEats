package com.hanbateats.room;

import java.util.List;
import java.util.Map;

import com.hanbateats.auth.Sessions;
import com.hanbateats.support.Api;
import com.hanbateats.support.Body;
import com.hanbateats.support.Db;
import com.hanbateats.support.Row;
import com.hanbateats.support.Values;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.hanbateats.support.Payloads.publicUser;

/**
 * 방의 결제·정산 단계.
 * 결제 동의 요청 → 참여자 동의/거절 → (전원 동의 시) 결제 잠금 → 방장 주문 완료 → 참여자 받기 완료 → 정산 완료
 */
@Service
@Transactional
public class PaymentService {

  private static final long RETRY_SECONDS = 20;

  private final Db db;
  private final Sessions sessions;
  private final RoomSupport rooms;

  public PaymentService(Db db, Sessions sessions, RoomSupport rooms) {
    this.db = db;
    this.sessions = sessions;
    this.rooms = rooms;
  }

  private Row roomWithTotal(long roomId) {
    return db.one(
      """
      SELECT
        rooms.*,
        COALESCE(SUM(room_orders.order_amount), 0) AS current_order_amount
      FROM rooms
      LEFT JOIN room_orders ON room_orders.room_id = rooms.id
      WHERE rooms.id = ?
        AND rooms.completed_at IS NULL
      GROUP BY rooms.id
      """,
      roomId
    );
  }

  /** 잔액이 충분할 때만 차감한다. 차감했으면 true. */
  private boolean debit(long userId, long amount, long updatedAt) {
    int updated = db.update(
      """
      UPDATE users
      SET strawberry_balance = strawberry_balance - ?,
          updated_at = ?
      WHERE id = ?
        AND strawberry_balance >= ?
      """,
      amount, updatedAt, userId, amount
    );
    return updated == 1;
  }

  private Row activeRoom(long roomId) {
    return db.one("SELECT * FROM rooms WHERE id = ? AND completed_at IS NULL", roomId);
  }

  private Row myOrder(long roomId, long userId) {
    return db.one(
      """
      SELECT *
      FROM room_orders
      WHERE room_id = ? AND user_id = ?
      """,
      roomId, userId
    );
  }

  /** 방장이 참여자들에게 결제 동의를 요청한다. 참여자가 없으면 바로 결제 단계로 잠근다. */
  public ResponseEntity<Map<String, Object>> requestPayment(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "결제 요청할 방을 찾지 못했습니다.");
    }

    long requestedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = roomWithTotal(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.getLong("owner_user_id") != userId) {
      return Api.error(403, "방장만 결제 요청을 보낼 수 있습니다.");
    }
    if (!room.isNull("payment_requested_at")) {
      return Api.ok("ok", true);
    }
    if (room.getLongOrZero("current_order_amount") < room.getLong("minimum_order_amount")) {
      return Api.error(409, "최소 주문금액을 달성한 뒤 결제 요청을 보낼 수 있습니다.");
    }
    if (!room.isNull("payment_consent_requested_at") && room.isNull("payment_consent_rejected_at")) {
      return Api.ok("ok", true, "pendingConsent", true);
    }

    long retryAfter = room.getLongOrZero("payment_consent_rejected_at") + RETRY_SECONDS;
    if (!room.isNull("payment_consent_rejected_at") && requestedAt < retryAfter) {
      long remainingSeconds = Math.max(retryAfter - requestedAt, 1);
      return Api.error(409, "참여자가 거절했습니다. " + remainingSeconds + "초 뒤 다시 결제 요청을 보낼 수 있습니다.");
    }

    List<Row> participantRows = rooms.otherParticipants(roomId, userId);

    if (participantRows.isEmpty()) {
      db.update(
        """
        UPDATE rooms
        SET payment_requested_at = ?,
            payment_consent_requested_at = NULL,
            payment_consent_rejected_at = NULL,
            closed_at = COALESCE(closed_at, ?),
            updated_at = ?
        WHERE id = ?
        """,
        requestedAt, requestedAt, requestedAt, roomId
      );
      rooms.insertSystemMessage(roomId, userId, "최소 주문 금액이 달성되어 결제 단계로 전환되었습니다.", requestedAt);
      return Api.ok("ok", true, "locked", true);
    }

    rooms.refundPaymentHolds(room, requestedAt);
    db.update(
      """
      UPDATE room_orders
      SET payment_consent_status = NULL,
          payment_consent_responded_at = NULL,
          paid_at = NULL,
          updated_at = ?
      WHERE room_id = ?
      """,
      requestedAt, roomId
    );
    db.update(
      """
      UPDATE rooms
      SET payment_consent_requested_at = ?,
          payment_consent_rejected_at = NULL,
          updated_at = ?
      WHERE id = ?
      """,
      requestedAt, requestedAt, roomId
    );
    rooms.insertSystemMessage(roomId, userId, "방장이 결제 동의를 요청했습니다.", requestedAt);
    for (Row participant : participantRows) {
      rooms.insertNotification(
        participant.getLong("user_id"),
        roomId,
        room.getString("store_name") + " 방장이 결제를 요청했습니다.",
        requestedAt
      );
    }

    return Api.ok("ok", true, "pendingConsent", true);
  }

  /** 참여자가 결제 요청에 동의(잔액에서 차감)하거나 거절한다. */
  public ResponseEntity<Map<String, Object>> respondConsent(Body body) {
    long roomId = body.toInt("roomId");
    boolean accepted = Values.truthy(body.get("accepted"));

    if (roomId <= 0) {
      return Api.error(400, "응답할 방을 찾지 못했습니다.");
    }

    long respondedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");
    String nickname = user.getString("nickname");

    Row room = activeRoom(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    long ownerUserId = room.getLong("owner_user_id");
    String storeName = room.getString("store_name");

    if (ownerUserId == userId) {
      return Api.error(403, "방장은 결제 동의 대상이 아닙니다.");
    }
    if (!room.isNull("payment_requested_at")) {
      return Api.ok("ok", true, "locked", true);
    }
    if (room.isNull("payment_consent_requested_at") || !room.isNull("payment_consent_rejected_at")) {
      return Api.error(409, "현재 응답할 결제 요청이 없습니다.");
    }

    Row order = myOrder(roomId, userId);

    if (order == null) {
      return Api.error(404, "참여 중인 방이 아닙니다.");
    }

    if (!accepted) {
      declineConsent(room, order, respondedAt);
      rooms.insertSystemMessage(roomId, userId, nickname + "님이 결제 요청을 거절했습니다.", respondedAt);
      rooms.insertNotification(
        ownerUserId,
        roomId,
        storeName + " 방 결제 요청이 거절되었습니다. 20초 뒤 다시 요청할 수 있습니다.",
        respondedAt
      );
      return Api.ok("ok", true, "accepted", false, "retryAfter", respondedAt + RETRY_SECONDS);
    }

    long paymentAmount = rooms.orderPaymentAmount(room, order);
    long currentBalance = user.getLongOrZero("strawberry_balance");
    if (order.isNull("paid_at") && currentBalance < paymentAmount) {
      long shortage = paymentAmount - currentBalance;
      declineConsent(room, order, respondedAt);
      rooms.insertSystemMessage(roomId, userId, nickname + "님이 충전금액이 부족해서 주문에 실패하였습니다.", respondedAt);
      rooms.insertNotification(
        ownerUserId,
        roomId,
        storeName + " 방 " + nickname + "님 잔액이 부족해 결제 요청이 거절되었습니다. 20초 뒤 다시 요청할 수 있습니다.",
        respondedAt
      );
      Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", userId);
      return Api.ok(
        "ok", true,
        "accepted", false,
        "autoDeclined", true,
        "retryAfter", respondedAt + RETRY_SECONDS,
        "shortage", shortage,
        "message", "잔액이 부족해서 주문에 실패했습니다. " + Values.comma(shortage) + "원을 더 충전해 주세요.",
        "user", publicUser(updatedUser)
      );
    }

    if (order.isNull("paid_at") && !debit(userId, paymentAmount, respondedAt)) {
      return Api.error(409, "잔액이 부족합니다. 충전 후 다시 시도해 주세요.");
    }

    db.update(
      """
      UPDATE room_orders
      SET payment_consent_status = 'accepted',
          payment_consent_responded_at = ?,
          paid_at = COALESCE(paid_at, ?),
          updated_at = ?
      WHERE id = ?
      """,
      respondedAt, respondedAt, respondedAt, order.getLong("id")
    );
    rooms.insertSystemMessage(
      roomId,
      userId,
      nickname + "님이 결제 요청을 확인하고 " + Values.comma(paymentAmount) + "원을 보냈습니다.",
      respondedAt
    );

    Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", userId);

    if (rooms.allParticipantsConsented(roomId, ownerUserId)) {
      db.update(
        """
        UPDATE rooms
        SET payment_requested_at = ?,
            payment_consent_requested_at = NULL,
            payment_consent_rejected_at = NULL,
            closed_at = COALESCE(closed_at, ?),
            updated_at = ?
        WHERE id = ?
        """,
        respondedAt, respondedAt, respondedAt, roomId
      );
      rooms.insertSystemMessage(roomId, ownerUserId, "입장자 전원이 결제 요청에 동의했습니다.", respondedAt);
      if (rooms.allParticipantsPaid(roomId, ownerUserId)) {
        rooms.insertSystemMessage(
          roomId,
          ownerUserId,
          "참여자 결제가 모두 완료되었습니다. 방장은 주문을 진행해 주세요.",
          respondedAt
        );
      }
      rooms.insertNotification(
        ownerUserId,
        roomId,
        storeName + " 방 입장자 전원이 결제 요청에 동의했습니다.",
        respondedAt
      );
      return Api.ok("ok", true, "accepted", true, "locked", true, "user", publicUser(updatedUser));
    }

    return Api.ok("ok", true, "accepted", true, "locked", false, "user", publicUser(updatedUser));
  }

  /** 거절(직접 거절 또는 잔액 부족 자동 거절): 결제분 환불, 내 주문은 declined, 방은 거절 시각 기록. */
  private void declineConsent(Row room, Row order, long respondedAt) {
    rooms.refundPaymentHolds(room, respondedAt);
    db.update(
      """
      UPDATE room_orders
      SET payment_consent_status = 'declined',
          payment_consent_responded_at = ?,
          paid_at = NULL,
          updated_at = ?
      WHERE id = ?
      """,
      respondedAt, respondedAt, order.getLong("id")
    );
    db.update(
      """
      UPDATE rooms
      SET payment_consent_requested_at = NULL,
          payment_consent_rejected_at = ?,
          updated_at = ?
      WHERE id = ?
      """,
      respondedAt, respondedAt, room.getLong("id")
    );
  }

  /** 결제 단계로 잠긴 뒤 아직 결제하지 않은 참여자가 결제한다. */
  public ResponseEntity<Map<String, Object>> payShare(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "결제할 방을 찾지 못했습니다.");
    }

    long paidAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = activeRoom(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.isNull("payment_requested_at")) {
      return Api.error(409, "방장이 결제 요청을 보낸 뒤 결제할 수 있습니다.");
    }
    if (room.getLong("owner_user_id") == userId) {
      return Api.error(403, "방장은 앱에서 결제하지 않습니다.");
    }

    Row order = myOrder(roomId, userId);

    if (order == null) {
      return Api.error(404, "참여 중인 방이 아닙니다.");
    }
    if (!order.isNull("paid_at")) {
      return Api.ok("ok", true, "user", publicUser(user));
    }

    long paymentAmount = rooms.orderPaymentAmount(room, order);
    long currentBalance = user.getLongOrZero("strawberry_balance");
    if (currentBalance < paymentAmount) {
      return Api.error(409, "잔액이 부족합니다. " + Values.comma(paymentAmount - currentBalance) + "원을 더 충전해 주세요.");
    }

    if (!debit(userId, paymentAmount, paidAt)) {
      return Api.error(409, "잔액이 부족합니다. 충전 후 다시 시도해 주세요.");
    }
    db.update(
      """
      UPDATE room_orders
      SET paid_at = ?,
          updated_at = ?
      WHERE id = ?
      """,
      paidAt, paidAt, order.getLong("id")
    );
    rooms.insertSystemMessage(
      roomId,
      userId,
      user.getString("nickname") + "님이 " + Values.comma(paymentAmount) + "원 결제를 완료했습니다.",
      paidAt
    );

    if (rooms.allParticipantsPaid(roomId, room.getLong("owner_user_id"))) {
      rooms.insertSystemMessage(
        roomId,
        room.getLong("owner_user_id"),
        "참여자 결제가 모두 완료되었습니다. 방장은 주문을 진행해 주세요.",
        paidAt
      );
    }

    db.update("UPDATE rooms SET updated_at = ? WHERE id = ?", paidAt, roomId);

    Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", userId);

    return Api.ok("ok", true, "user", publicUser(updatedUser));
  }

  /** 방장이 배달 앱에서 실제 주문을 마쳤다고 표시한다. */
  public ResponseEntity<Map<String, Object>> markOrdered(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "주문 완료 처리할 방을 찾지 못했습니다.");
    }

    long orderedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = roomWithTotal(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.getLong("owner_user_id") != userId) {
      return Api.error(403, "방장만 주문 완료 표시를 할 수 있습니다.");
    }
    if (!room.isNull("ordered_at")) {
      return Api.ok("ok", true);
    }
    if (room.isNull("payment_requested_at")) {
      return Api.error(409, "먼저 결제 요청을 보내 주세요.");
    }
    if (room.getLongOrZero("current_order_amount") < room.getLong("minimum_order_amount")) {
      return Api.error(409, "최소 주문금액을 달성한 뒤 주문 완료 표시를 할 수 있습니다.");
    }
    if (!rooms.allParticipantsPaid(roomId, room.getLong("owner_user_id"))) {
      return Api.error(409, "참여자 결제가 모두 완료된 뒤 주문 완료 표시를 할 수 있습니다.");
    }

    db.update(
      """
      UPDATE rooms
      SET ordered_at = ?,
          closed_at = COALESCE(closed_at, ?),
          updated_at = ?
      WHERE id = ?
      """,
      orderedAt, orderedAt, orderedAt, roomId
    );
    rooms.insertSystemMessage(roomId, userId, "방장이 배달주문을 완료했어요.", orderedAt);
    for (Row participant : rooms.otherParticipants(roomId, userId)) {
      rooms.insertNotification(
        participant.getLong("user_id"),
        roomId,
        room.getString("store_name") + " 방장이 배달주문을 완료했어요.",
        orderedAt
      );
    }

    return Api.ok("ok", true);
  }

  /** 참여자가 음식을 받았다고 표시한다. 전원이 받으면 방이 정산 완료된다. */
  public ResponseEntity<Map<String, Object>> receive(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "받기 완료할 방을 찾지 못했습니다.");
    }

    long receivedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = activeRoom(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.getLong("owner_user_id") == userId) {
      return Api.error(403, "방장은 받기 완료 대상이 아닙니다.");
    }
    if (room.isNull("ordered_at")) {
      return Api.error(409, "방장이 주문 완료 표시를 한 뒤 받기 완료할 수 있습니다.");
    }

    Row order = myOrder(roomId, userId);

    if (order == null) {
      return Api.error(404, "참여 중인 방이 아닙니다.");
    }
    if (order.isNull("paid_at")) {
      return Api.error(409, "결제 완료 후 받기 완료할 수 있습니다.");
    }
    if (!order.isNull("received_at")) {
      return Api.ok("ok", true);
    }

    db.update(
      """
      UPDATE room_orders
      SET received_at = ?,
          updated_at = ?
      WHERE id = ?
      """,
      receivedAt, receivedAt, order.getLong("id")
    );
    rooms.insertSystemMessage(roomId, userId, user.getString("nickname") + "님이 받기 완료했습니다.", receivedAt);

    long ownerUserId = room.getLong("owner_user_id");
    if (rooms.allParticipantsReceived(roomId, ownerUserId)) {
      rooms.insertSystemMessage(
        roomId,
        ownerUserId,
        "모든 참여자가 받기 완료했습니다. 방장 정산이 완료되었습니다.",
        receivedAt
      );
      db.update(
        """
        UPDATE rooms
        SET settled_at = ?,
            completed_at = ?,
            closed_at = COALESCE(closed_at, ?),
            updated_at = ?
        WHERE id = ?
        """,
        receivedAt, receivedAt, receivedAt, receivedAt, roomId
      );
      rooms.insertNotification(
        ownerUserId,
        roomId,
        room.getString("store_name") + " 방 참여자가 모두 받기 완료해 정산되었습니다.",
        receivedAt
      );
    } else {
      db.update("UPDATE rooms SET updated_at = ? WHERE id = ?", receivedAt, roomId);
    }

    return Api.ok("ok", true);
  }

  /** 방장이 나눔 완료를 눌러 정산을 마친다. */
  public ResponseEntity<Map<String, Object>> complete(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "완료할 방을 찾지 못했습니다.");
    }

    long completedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = activeRoom(roomId);

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.getLong("owner_user_id") != userId) {
      return Api.error(403, "방장만 나눔 완료를 할 수 있습니다.");
    }
    if (room.isNull("ordered_at")) {
      return Api.error(409, "먼저 주문 완료 표시를 해 주세요.");
    }
    if (!rooms.allParticipantsReceived(roomId, room.getLong("owner_user_id"))) {
      return Api.error(409, "입장자 전원이 받기 완료를 눌러야 정산할 수 있습니다.");
    }

    db.update(
      """
      UPDATE rooms
      SET settled_at = ?,
          completed_at = ?,
          closed_at = COALESCE(closed_at, ?),
          updated_at = ?
      WHERE id = ?
      """,
      completedAt, completedAt, completedAt, completedAt, roomId
    );
    rooms.insertSystemMessage(roomId, userId, "방장이 나눔 완료를 눌러 정산을 완료했습니다.", completedAt);
    for (Row participant : rooms.otherParticipants(roomId, userId)) {
      rooms.insertNotification(
        participant.getLong("user_id"),
        roomId,
        room.getString("store_name") + " 방 나눔이 완료되었습니다.",
        completedAt
      );
    }

    return Api.ok("ok", true);
  }
}
