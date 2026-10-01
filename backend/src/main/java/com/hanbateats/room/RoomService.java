package com.hanbateats.room;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.hanbateats.auth.Sessions;
import com.hanbateats.support.Api;
import com.hanbateats.support.Body;
import com.hanbateats.support.Db;
import com.hanbateats.support.Payloads;
import com.hanbateats.support.Row;
import com.hanbateats.support.Values;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.hanbateats.room.RoomSupport.ROOM_WITH_TOTALS_SQL;
import static com.hanbateats.room.RoomSupport.participantCountSql;

/** 공동 주문 방: 목록, 생성, 입장, 메뉴 수정, 내 방, 상세, 채팅, 삭제, 나가기. */
@Service
@Transactional
public class RoomService {

  private static final Set<String> ROOM_PLATFORMS = Set.of("baemin", "yogiyo", "coupang", "other");

  private final Db db;
  private final Sessions sessions;
  private final RoomSupport rooms;

  public RoomService(Db db, Sessions sessions, RoomSupport rooms) {
    this.db = db;
    this.sessions = sessions;
    this.rooms = rooms;
  }

  /** 내가 만들지도, 참여하지도 않은 모집 중인 방. */
  public ResponseEntity<Map<String, Object>> list(Body body) {
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }

    List<Row> rows = db.list(
      ROOM_WITH_TOTALS_SQL + """
      WHERE rooms.closed_at IS NULL
        AND rooms.completed_at IS NULL
        AND rooms.owner_user_id != ?
        AND NOT EXISTS (
          SELECT 1
          FROM room_orders AS my_orders
          WHERE my_orders.room_id = rooms.id
            AND my_orders.user_id = ?
        )
      GROUP BY rooms.id
      ORDER BY rooms.created_at DESC
      LIMIT 50
      """,
      user.getLong("id"), user.getLong("id")
    );

    return Api.ok("rooms", rows.stream().map(Payloads::publicRoom).toList());
  }

  public ResponseEntity<Map<String, Object>> create(Body body) {
    String platform = body.str("platform");
    String storeName = body.stripped("storeName");
    String shareLocation = body.stripped("shareLocation");
    String orderTitle = body.stripped("orderTitle");
    Object minimumAmountRaw = body.get("minimumOrderAmount");
    Object deliveryFeeRaw = body.get("deliveryFee");
    Object myOrderAmountRaw = body.get("myOrderAmount");
    long minimumAmount = Values.toInt(minimumAmountRaw, 0);
    long deliveryFee = Values.toInt(deliveryFeeRaw, 0);
    long myOrderAmount = Values.toInt(myOrderAmountRaw, 0);
    Double lat = Values.toFloat(body.get("lat"));
    Double lng = Values.toFloat(body.get("lng"));

    if (!ROOM_PLATFORMS.contains(platform)) {
      return Api.error(400, "배달 플랫폼을 선택해 주세요.");
    }
    if (Values.pyLen(storeName) < 2 || Values.pyLen(storeName) > 40) {
      return Api.error(400, "상호명은 2자 이상 40자 이하로 입력해 주세요.");
    }
    if (isBlank(minimumAmountRaw)) {
      return Api.error(400, "최소 주문 금액을 입력해 주세요.");
    }
    if (minimumAmount < 5000 || minimumAmount > 100000) {
      return Api.error(400, "최소 주문 금액은 5,000원부터 100,000원까지 입력할 수 있습니다.");
    }
    if (isBlank(deliveryFeeRaw)) {
      return Api.error(400, "배달료를 입력해 주세요. 무료 배달이면 0을 입력해 주세요.");
    }
    if (deliveryFee < 0 || deliveryFee > 20000) {
      return Api.error(400, "배달료는 0원부터 20,000원까지 입력할 수 있습니다.");
    }
    if (isBlank(myOrderAmountRaw)) {
      return Api.error(400, "내 주문 금액을 입력해 주세요.");
    }
    if (myOrderAmount < 1000 || myOrderAmount > 100000) {
      return Api.error(400, "내 주문 금액은 1,000원부터 100,000원까지 입력해 주세요.");
    }
    if (Values.pyLen(orderTitle) < 1 || Values.pyLen(orderTitle) > 40) {
      return Api.error(400, "내 주문 메뉴는 1자 이상 40자 이하로 입력해 주세요.");
    }
    if (Values.pyLen(shareLocation) < 2 || Values.pyLen(shareLocation) > 40) {
      return Api.error(400, "나눌 위치는 2자 이상 40자 이하로 입력해 주세요.");
    }
    if (lat == null || lng == null || !(-90 <= lat && lat <= 90 && -180 <= lng && lng <= 180)) {
      return Api.error(400, "지도에서 나눌 위치를 찍어 주세요.");
    }

    long createdAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    if (!Values.hasPayoutAccount(user)) {
      return Api.error(403, "방을 만들려면 정산 계좌 등록이 필요합니다.");
    }

    long roomId = db.insert(
      """
      INSERT INTO rooms
        (owner_user_id, platform, store_name, share_location, minimum_order_amount, delivery_fee, lat, lng, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      """,
      user.getLong("id"), platform, storeName, shareLocation, minimumAmount, deliveryFee, lat, lng, createdAt, createdAt
    );
    db.update(
      """
      INSERT INTO room_orders
        (room_id, user_id, order_title, order_amount, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      """,
      roomId, user.getLong("id"), orderTitle, myOrderAmount, createdAt, createdAt
    );
    if (myOrderAmount >= minimumAmount) {
      db.update(
        """
        UPDATE rooms
        SET closed_at = ?, updated_at = ?
        WHERE id = ? AND closed_at IS NULL
        """,
        createdAt, createdAt, roomId
      );
    }
    Row room = db.one(
      ROOM_WITH_TOTALS_SQL + """
      WHERE rooms.id = ?
      GROUP BY rooms.id
      """,
      roomId
    );

    return Api.json(201, Api.obj("room", Payloads.publicRoom(room)));
  }

  public ResponseEntity<Map<String, Object>> join(Body body) {
    long roomId = body.toInt("roomId");
    String orderTitle = body.stripped("orderTitle");
    long orderAmount = body.toInt("orderAmount");

    if (roomId <= 0) {
      return Api.error(400, "입장할 방을 찾지 못했습니다.");
    }
    if (Values.pyLen(orderTitle) < 1 || Values.pyLen(orderTitle) > 40) {
      return Api.error(400, "주문 메뉴를 1자 이상 40자 이하로 입력해 주세요.");
    }
    if (orderAmount < 1000 || orderAmount > 100000) {
      return Api.error(400, "주문 금액은 1,000원부터 100,000원까지 입력해 주세요.");
    }

    long joinedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = db.one(
      """
      SELECT *
      FROM rooms
      WHERE id = ? AND closed_at IS NULL AND completed_at IS NULL
      """,
      roomId
    );

    if (room == null) {
      return Api.error(409, "이미 마감되었거나 없는 방입니다.");
    }
    if (room.getLong("owner_user_id") == userId) {
      return Api.error(409, "내가 만든 방은 내 방에서 확인해 주세요.");
    }

    Row existingOrder = db.one(
      """
      SELECT id
      FROM room_orders
      WHERE room_id = ? AND user_id = ?
      LIMIT 1
      """,
      roomId, userId
    );

    if (existingOrder != null) {
      return Api.error(409, "이미 참여한 방입니다. 내 방에서 확인해 주세요.");
    }

    long currentBalance = user.getLongOrZero("strawberry_balance");

    if (orderAmount > currentBalance) {
      long shortage = orderAmount - currentBalance;
      return Api.error(409, "잔액이 부족해서 입장할 수 없습니다. " + Values.comma(shortage) + "원을 더 충전해 주세요.");
    }

    db.update(
      """
      INSERT INTO room_orders
        (room_id, user_id, order_title, order_amount, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      """,
      roomId, userId, orderTitle, orderAmount, joinedAt, joinedAt
    );

    long total = rooms.currentOrderAmount(roomId);
    boolean isClosed = total >= room.getLong("minimum_order_amount");

    if (isClosed) {
      db.update(
        """
        UPDATE rooms
        SET closed_at = ?, updated_at = ?
        WHERE id = ? AND closed_at IS NULL
        """,
        joinedAt, joinedAt, roomId
      );
      rooms.notifyMinimumReached(roomId, room.getLong("owner_user_id"), room.getString("store_name"), joinedAt);
    } else {
      db.update(
        """
        UPDATE rooms
        SET updated_at = ?
        WHERE id = ?
        """,
        joinedAt, roomId
      );
    }

    Row updatedRoom = db.one(
      ROOM_WITH_TOTALS_SQL + """
      WHERE rooms.id = ?
        AND rooms.completed_at IS NULL
      GROUP BY rooms.id
      """,
      roomId
    );

    return Api.ok("closed", isClosed, "room", Payloads.publicRoom(updatedRoom));
  }

  public ResponseEntity<Map<String, Object>> updateOrder(Body body) {
    long roomId = body.toInt("roomId");
    String orderTitle = body.stripped("orderTitle");
    long orderAmount = body.toInt("orderAmount");

    if (roomId <= 0) {
      return Api.error(400, "수정할 방을 찾지 못했습니다.");
    }
    if (Values.pyLen(orderTitle) < 1 || Values.pyLen(orderTitle) > 40) {
      return Api.error(400, "주문 메뉴를 1자 이상 40자 이하로 입력해 주세요.");
    }
    if (orderAmount < 1000 || orderAmount > 100000) {
      return Api.error(400, "주문 금액은 1,000원부터 100,000원까지 입력해 주세요.");
    }

    long updatedAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = db.one(
      """
      SELECT *
      FROM rooms
      WHERE id = ?
        AND completed_at IS NULL
        AND canceled_at IS NULL
      """,
      roomId
    );

    if (room == null) {
      return Api.error(404, "이미 종료되었거나 없는 방입니다.");
    }
    if (!room.isNull("payment_requested_at") || room.getOptional("ordered_at") != null) {
      return Api.error(409, "결제 요청 이후에는 메뉴를 변경할 수 없습니다.");
    }
    if (!room.isNull("payment_consent_requested_at") && room.isNull("payment_consent_rejected_at")) {
      return Api.error(409, "결제 확인이 진행 중일 때는 메뉴를 변경할 수 없습니다.");
    }

    Row order = db.one(
      """
      SELECT *
      FROM room_orders
      WHERE room_id = ?
        AND user_id = ?
      LIMIT 1
      """,
      roomId, userId
    );

    if (order == null) {
      return Api.error(403, "내가 참여한 방만 메뉴를 변경할 수 있습니다.");
    }

    long currentBalance = user.getLongOrZero("strawberry_balance");
    if (orderAmount > currentBalance) {
      return Api.error(
        409,
        "잔액이 부족해서 변경할 수 없습니다. " + Values.comma(orderAmount - currentBalance) + "원을 더 충전해 주세요."
      );
    }

    long oldTotal = rooms.currentOrderAmount(roomId);

    db.update(
      """
      UPDATE room_orders
      SET order_title = ?,
          order_amount = ?,
          updated_at = ?
      WHERE id = ?
      """,
      orderTitle, orderAmount, updatedAt, order.getLong("id")
    );

    long newTotal = rooms.currentOrderAmount(roomId);
    long minimumAmount = room.getLong("minimum_order_amount");

    if (newTotal >= minimumAmount) {
      db.update(
        """
        UPDATE rooms
        SET closed_at = COALESCE(closed_at, ?),
            updated_at = ?
        WHERE id = ?
        """,
        updatedAt, updatedAt, roomId
      );

      if (oldTotal < minimumAmount || room.getOptional("minimum_reached_notified_at") == null) {
        rooms.notifyMinimumReached(roomId, room.getLong("owner_user_id"), room.getString("store_name"), updatedAt);
      }
    } else {
      db.update(
        """
        UPDATE rooms
        SET closed_at = NULL,
            minimum_reached_notified_at = NULL,
            updated_at = ?
        WHERE id = ?
        """,
        updatedAt, roomId
      );
    }

    Map<String, Object> payload = rooms.roomDetailPayload(roomId, userId);
    Map<String, Object> response = Api.obj("ok", true);
    if (payload != null) {
      response.putAll(payload);
    }

    return Api.json(200, response);
  }

  /** 내가 만든 방과 참여한 방, 각 방의 주문 목록 포함. */
  public ResponseEntity<Map<String, Object>> mine(Body body) {
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    List<Row> rows = db.list(
      """
      SELECT
        rooms.*,
        COALESCE(SUM(all_orders.order_amount), 0) AS current_order_amount,
        %s AS order_count,
        CASE
          WHEN rooms.owner_user_id = ? THEN 'owner'
          ELSE 'participant'
        END AS my_role
      FROM rooms
      JOIN (
        SELECT id AS room_id
        FROM rooms
        WHERE owner_user_id = ?
        UNION
        SELECT room_id
        FROM room_orders
        WHERE user_id = ?
      ) AS my_room_ids ON my_room_ids.room_id = rooms.id
      LEFT JOIN room_orders AS all_orders ON all_orders.room_id = rooms.id
      WHERE rooms.completed_at IS NULL
      GROUP BY rooms.id
      ORDER BY rooms.updated_at DESC, rooms.created_at DESC
      LIMIT 50
      """.formatted(participantCountSql("all_orders")),
      userId, userId, userId
    );

    // 최소 금액을 넘었는데 아직 알림이 안 간 내 방이 있으면 이때 보낸다.
    long checkedAt = Values.now();
    for (Row row : rows) {
      if (
        row.getLong("owner_user_id") == userId
        && !row.isNull("closed_at")
        && row.getOptional("minimum_reached_notified_at") == null
        && row.getLongOrZero("current_order_amount") >= row.getLong("minimum_order_amount")
      ) {
        rooms.notifyMinimumReached(row.getLong("id"), row.getLong("owner_user_id"), row.getString("store_name"), checkedAt);
      }
    }

    List<Map<String, Object>> roomPayloads = rows.stream().map(Payloads::publicRoom).toList();
    List<Long> roomIds = rows.stream().map(row -> row.getLong("id")).toList();
    Map<Long, List<Map<String, Object>>> ordersByRoom = new LinkedHashMap<>();
    for (Long roomId : roomIds) {
      ordersByRoom.put(roomId, new ArrayList<>());
    }

    if (!roomIds.isEmpty()) {
      String placeholders = String.join(",", Collections.nCopies(roomIds.size(), "?"));
      List<Row> orderRows = db.list(
        """
        SELECT
          room_orders.*,
          users.nickname AS nickname
        FROM room_orders
        JOIN users ON users.id = room_orders.user_id
        WHERE room_orders.room_id IN (%s)
        ORDER BY room_orders.created_at ASC, room_orders.id ASC
        """.formatted(placeholders),
        roomIds.toArray()
      );

      for (Row order : orderRows) {
        ordersByRoom.computeIfAbsent(order.getLong("room_id"), key -> new ArrayList<>()).add(Payloads.publicOrder(order));
      }
    }

    for (int i = 0; i < roomPayloads.size(); i++) {
      roomPayloads.get(i).put("orders", ordersByRoom.getOrDefault(roomIds.get(i), List.of()));
    }

    return Api.ok("rooms", roomPayloads);
  }

  public ResponseEntity<Map<String, Object>> detail(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "방 정보를 찾지 못했습니다.");
    }

    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }

    if (!rooms.canAccessRoom(roomId, user.getLong("id"))) {
      return Api.error(403, "이 방을 볼 권한이 없습니다.");
    }

    Map<String, Object> payload = rooms.roomDetailPayload(roomId, user.getLong("id"));
    if (payload == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }

    return Api.json(200, payload);
  }

  public ResponseEntity<Map<String, Object>> sendMessage(Body body) {
    long roomId = body.toInt("roomId");
    String message = body.stripped("message");

    if (roomId <= 0) {
      return Api.error(400, "방 정보를 찾지 못했습니다.");
    }
    if (Values.pyLen(message) < 1 || Values.pyLen(message) > 300) {
      return Api.error(400, "메시지는 1자 이상 300자 이하로 입력해 주세요.");
    }

    long createdAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }

    if (!rooms.canAccessRoom(roomId, user.getLong("id"))) {
      return Api.error(403, "이 방에 메시지를 보낼 권한이 없습니다.");
    }

    db.update(
      """
      INSERT INTO room_messages (room_id, user_id, message_text, created_at)
      VALUES (?, ?, ?, ?)
      """,
      roomId, user.getLong("id"), message, createdAt
    );

    return Api.json(201, Api.obj("ok", true));
  }

  /** 방장이 방을 삭제한다. 결제 요청 전까지만 가능. */
  public ResponseEntity<Map<String, Object>> cancel(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "삭제할 방을 찾지 못했습니다.");
    }

    long canceledAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = db.one(
      """
      SELECT *
      FROM rooms
      WHERE id = ? AND completed_at IS NULL
      """,
      roomId
    );

    if (room == null) {
      return Api.error(404, "이미 삭제되었거나 없는 방입니다.");
    }
    if (room.getLong("owner_user_id") != userId) {
      return Api.error(403, "방장만 방을 삭제할 수 있습니다.");
    }
    if (!room.isNull("payment_requested_at")) {
      return Api.error(409, "결제 요청 이후에는 방을 삭제할 수 없습니다.");
    }

    List<Row> participantRows = db.list(
      """
      SELECT
        room_orders.user_id AS user_id
      FROM room_orders
      WHERE room_orders.room_id = ?
        AND room_orders.user_id != ?
      """,
      roomId, userId
    );

    rooms.insertSystemMessage(roomId, userId, "방장이 방을 삭제했습니다.", canceledAt);

    String notificationMessage = room.getString("store_name") + " 방이 삭제되었습니다.";
    for (Row participant : participantRows) {
      rooms.insertNotification(participant.getLong("user_id"), roomId, notificationMessage, canceledAt);
    }

    // 결제 동의를 받는 중이면 이미 동의해서 차감된 금액을 돌려준다. (예전 코드는 환불 없이 방만 닫았다)
    rooms.refundPaymentHolds(room, canceledAt);

    db.update(
      """
      UPDATE rooms
      SET canceled_at = ?,
          completed_at = ?,
          closed_at = COALESCE(closed_at, ?),
          updated_at = ?
      WHERE id = ?
      """,
      canceledAt, canceledAt, canceledAt, canceledAt, roomId
    );

    return Api.ok("ok", true, "notifiedCount", participantRows.size());
  }

  /** 참여자가 방을 나간다. 결제 동의 진행 중이면 그 요청을 취소하고 환불한다. */
  public ResponseEntity<Map<String, Object>> leave(Body body) {
    long roomId = body.toInt("roomId");

    if (roomId <= 0) {
      return Api.error(400, "나갈 방을 찾지 못했습니다.");
    }

    long leftAt = Values.now();
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }
    long userId = user.getLong("id");

    Row room = db.one(
      """
      SELECT *
      FROM rooms
      WHERE id = ? AND completed_at IS NULL
      """,
      roomId
    );

    if (room == null) {
      return Api.error(404, "방 정보를 찾지 못했습니다.");
    }
    if (room.getLong("owner_user_id") == userId) {
      return Api.error(403, "방장은 방을 나갈 수 없습니다.");
    }
    if (!room.isNull("payment_requested_at")) {
      return Api.error(409, "결제 요청 이후에는 방을 나갈 수 없습니다.");
    }
    if (!room.isNull("ordered_at")) {
      return Api.error(409, "방장이 주문 완료 표시를 해서 방을 나갈 수 없습니다.");
    }
    // 참여하지 않은 사용자가 이 요청으로 남의 결제 요청을 취소하지 못하게 먼저 확인한다.
    if (db.one("SELECT 1 FROM room_orders WHERE room_id = ? AND user_id = ?", roomId, userId) == null) {
      return Api.error(404, "참여 중인 방이 아닙니다.");
    }

    if (!room.isNull("payment_consent_requested_at") && room.isNull("payment_consent_rejected_at")) {
      rooms.refundPaymentHolds(room, leftAt);
      db.update(
        """
        UPDATE rooms
        SET payment_consent_requested_at = NULL,
            payment_consent_rejected_at = ?,
            updated_at = ?
        WHERE id = ?
        """,
        leftAt, leftAt, roomId
      );
      rooms.insertNotification(
        room.getLong("owner_user_id"),
        roomId,
        room.getString("store_name") + " 방 참여자가 나가 결제 요청이 취소되었습니다. 20초 뒤 다시 요청할 수 있습니다.",
        leftAt
      );
    }

    int deleted = db.update(
      """
      DELETE FROM room_orders
      WHERE room_id = ? AND user_id = ?
      """,
      roomId, userId
    );

    if (deleted == 0) {
      return Api.error(404, "참여 중인 방이 아닙니다.");
    }

    rooms.insertSystemMessage(roomId, userId, user.getString("nickname") + "님이 방을 나갔습니다.", leftAt);

    long total = rooms.currentOrderAmount(roomId);
    Long closedAt = total >= room.getLong("minimum_order_amount") ? leftAt : null;

    db.update(
      """
      UPDATE rooms
      SET closed_at = ?,
          updated_at = ?
      WHERE id = ?
      """,
      closedAt, leftAt, roomId
    );

    return Api.ok("ok", true);
  }

  /** server.py의 `raw is None or str(raw).strip() == ""` */
  private static boolean isBlank(Object raw) {
    return raw == null || Values.pyStrip(raw.toString()).isEmpty();
  }
}
