package com.hanbateats.room;

import java.util.List;
import java.util.Map;

import com.hanbateats.support.Api;
import com.hanbateats.support.Db;
import com.hanbateats.support.Payloads;
import com.hanbateats.support.Row;
import org.springframework.stereotype.Component;

/** RoomService와 PaymentService가 같이 쓰는 조회·기록 로직. server.py 핸들러 클래스의 보조 메서드들. */
@Component
public class RoomSupport {

  /**
   * 참여 인원 수. 방장이 주문을 안 넣었어도 방장 1명을 더한다.
   * server.py의 participant_count_sql(order_alias)
   */
  static String participantCountSql(String orderAlias) {
    return """
          COUNT(DISTINCT %1$s.user_id)
          + CASE
              WHEN COUNT(DISTINCT CASE
                WHEN %1$s.user_id = rooms.owner_user_id THEN %1$s.user_id
              END) = 0 THEN 1
              ELSE 0
            END
      """.formatted(orderAlias);
  }

  /** 방 + 현재 모인 금액 + 참여 인원 수. 여러 핸들러에서 같은 SELECT를 쓴다. */
  static final String ROOM_WITH_TOTALS_SQL = """
      SELECT
        rooms.*,
        COALESCE(SUM(room_orders.order_amount), 0) AS current_order_amount,
        %s AS order_count
      FROM rooms
      LEFT JOIN room_orders ON room_orders.room_id = rooms.id
      """.formatted(participantCountSql("room_orders"));

  private final Db db;

  public RoomSupport(Db db) {
    this.db = db;
  }

  public long currentOrderAmount(long roomId) {
    return db.count(
      """
      SELECT COALESCE(SUM(order_amount), 0) AS current_order_amount
      FROM room_orders
      WHERE room_id = ?
      """,
      roomId
    );
  }

  public List<Row> otherParticipants(long roomId, long ownerUserId) {
    return db.list(
      """
      SELECT user_id
      FROM room_orders
      WHERE room_id = ?
        AND user_id != ?
      """,
      roomId, ownerUserId
    );
  }

  public boolean canAccessRoom(long roomId, long userId) {
    Row access = db.one(
      """
      SELECT rooms.id
      FROM rooms
      LEFT JOIN room_orders
        ON room_orders.room_id = rooms.id
       AND room_orders.user_id = ?
      WHERE rooms.id = ?
        AND rooms.completed_at IS NULL
        AND (rooms.owner_user_id = ? OR room_orders.id IS NOT NULL)
      LIMIT 1
      """,
      userId, roomId, userId
    );
    return access != null;
  }

  /** 방 상세(방 정보, 주문 목록, 채팅). 방이 없거나 완료됐으면 null. */
  public Map<String, Object> roomDetailPayload(long roomId, long userId) {
    Row room = db.one(
      ROOM_WITH_TOTALS_SQL + """
      WHERE rooms.id = ?
        AND rooms.completed_at IS NULL
      GROUP BY rooms.id
      """,
      roomId
    );

    if (room == null) {
      return null;
    }

    List<Row> orders = db.list(
      """
      SELECT
        room_orders.*,
        users.nickname AS nickname
      FROM room_orders
      JOIN users ON users.id = room_orders.user_id
      WHERE room_orders.room_id = ?
      ORDER BY room_orders.created_at ASC, room_orders.id ASC
      """,
      roomId
    );

    // 참여자는 자기가 들어온 시점 이후의 채팅만 본다.
    long visibleSince = room.getLong("created_at");

    if (room.getLong("owner_user_id") != userId) {
      for (Row order : orders) {
        if (order.getLong("user_id") == userId) {
          visibleSince = order.getLong("created_at");
          break;
        }
      }
    }

    // 최근 100개를 고른 뒤(DESC LIMIT) 화면에는 시간순(ASC)으로 보낸다.
    // 예전 코드는 ASC LIMIT 100이라 100개가 넘으면 새 메시지가 보이지 않았다.
    List<Row> messages = db.list(
      """
      SELECT *
      FROM (
        SELECT
          room_messages.*,
          users.nickname AS nickname
        FROM room_messages
        JOIN users ON users.id = room_messages.user_id
        WHERE room_messages.room_id = ?
          AND room_messages.created_at >= ?
        ORDER BY room_messages.created_at DESC, room_messages.id DESC
        LIMIT 100
      )
      ORDER BY created_at ASC, id ASC
      """,
      roomId, visibleSince
    );

    return Api.obj(
      "room", Payloads.publicRoom(room),
      "orders", orders.stream().map(Payloads::publicOrder).toList(),
      "messages", messages.stream().map(Payloads::publicMessage).toList()
    );
  }

  public void insertSystemMessage(long roomId, long userId, String message, long createdAt) {
    db.update(
      """
      INSERT INTO room_messages
        (room_id, user_id, message_text, message_type, created_at)
      VALUES (?, ?, ?, ?, ?)
      """,
      roomId, userId, message, "system", createdAt
    );
  }

  public void insertNotification(long userId, long roomId, String message, long createdAt) {
    db.update(
      """
      INSERT INTO notifications
        (user_id, room_id, message, created_at)
      VALUES (?, ?, ?, ?)
      """,
      userId, roomId, message, createdAt
    );
  }

  /** 최소 주문 금액 달성 알림. minimum_reached_notified_at으로 한 번만 보낸다. */
  public void notifyMinimumReached(long roomId, long ownerUserId, String storeName, long reachedAt) {
    int updated = db.update(
      """
      UPDATE rooms
      SET minimum_reached_notified_at = ?,
          updated_at = ?
      WHERE id = ?
        AND minimum_reached_notified_at IS NULL
      """,
      reachedAt, reachedAt, roomId
    );

    if (updated == 0) {
      return;
    }

    insertSystemMessage(
      roomId,
      ownerUserId,
      "최소 주문 금액이 달성되었습니다. 결제 요청을 보낼 수 있습니다.",
      reachedAt
    );
    insertNotification(
      ownerUserId,
      roomId,
      storeName + " 방 최소 주문 금액이 달성되었습니다. 결제 요청을 보내 주세요.",
      reachedAt
    );
  }

  public boolean allParticipantsPaid(long roomId, long ownerUserId) {
    long unpaid = db.count(
      """
      SELECT COUNT(*) AS count
      FROM room_orders
      WHERE room_id = ?
        AND user_id != ?
        AND paid_at IS NULL
      """,
      roomId, ownerUserId
    );
    return unpaid == 0;
  }

  public boolean allParticipantsConsented(long roomId, long ownerUserId) {
    long pending = db.count(
      """
      SELECT COUNT(*) AS count
      FROM room_orders
      WHERE room_id = ?
        AND user_id != ?
        AND COALESCE(payment_consent_status, '') != 'accepted'
      """,
      roomId, ownerUserId
    );
    return pending == 0;
  }

  public boolean allParticipantsReceived(long roomId, long ownerUserId) {
    long pending = db.count(
      """
      SELECT COUNT(*) AS count
      FROM room_orders
      WHERE room_id = ?
        AND user_id != ?
        AND received_at IS NULL
      """,
      roomId, ownerUserId
    );
    return pending == 0;
  }

  private long participantCount(long roomId, long ownerUserId) {
    Row row = db.one(
      """
      SELECT
        COUNT(DISTINCT user_id) AS order_count,
        COUNT(DISTINCT CASE WHEN user_id = ? THEN user_id END) AS owner_count
      FROM room_orders
      WHERE room_id = ?
      """,
      ownerUserId, roomId
    );
    long count = row.getLongOrZero("order_count");
    if (row.getLongOrZero("owner_count") == 0) {
      count += 1;
    }
    return Math.max(count, 1);
  }

  /** 내 주문 금액 + 배달비를 인원수로 나눈 몫(올림). */
  public long orderPaymentAmount(Row room, Row order) {
    long participantCount = participantCount(room.getLong("id"), room.getLong("owner_user_id"));
    long deliveryShare = Math.floorDiv(room.getLongOrZero("delivery_fee") + participantCount - 1, participantCount);
    return order.getLongOrZero("order_amount") + deliveryShare;
  }

  /** 이미 결제한 참여자에게 금액을 돌려주고 결제 상태를 초기화한다. */
  public void refundPaymentHolds(Row room, long refundedAt) {
    List<Row> paidOrders = db.list(
      """
      SELECT *
      FROM room_orders
      WHERE room_id = ?
        AND user_id != ?
        AND paid_at IS NOT NULL
      """,
      room.getLong("id"), room.getLong("owner_user_id")
    );

    for (Row order : paidOrders) {
      long amount = orderPaymentAmount(room, order);
      db.update(
        """
        UPDATE users
        SET strawberry_balance = COALESCE(strawberry_balance, 0) + ?,
            updated_at = ?
        WHERE id = ?
        """,
        amount, refundedAt, order.getLong("user_id")
      );
      db.update(
        """
        UPDATE room_orders
        SET payment_consent_status = NULL,
            payment_consent_responded_at = NULL,
            paid_at = NULL,
            updated_at = ?
        WHERE id = ?
        """,
        refundedAt, order.getLong("id")
      );
    }
  }
}
