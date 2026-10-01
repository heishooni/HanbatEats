package com.hanbateats.support;

import java.util.Map;

/** DB 행을 프론트로 보낼 JSON 모양으로 바꾼다. server.py의 public_* 함수들과 1:1로 대응한다. */
public final class Payloads {

  private Payloads() {
  }

  public static Map<String, Object> publicUser(Row row) {
    Map<String, Object> payoutAccount = null;

    if (Values.hasPayoutAccount(row)) {
      payoutAccount = Api.obj(
        "bankName", row.getOptional("payout_bank"),
        "accountHolder", row.getOptional("payout_account_holder"),
        "maskedAccountNumber", Values.maskAccountNumber((String) row.getOptional("payout_account_number"))
      );
    }

    return Api.obj(
      "id", row.get("id"),
      "phoneNumber", row.get("phone_number"),
      "nickname", row.get("nickname"),
      "strawberryBalance", row.getLongOrZero("strawberry_balance"),
      "hasPayoutAccount", payoutAccount != null,
      "payoutAccount", payoutAccount
    );
  }

  public static Map<String, Object> publicRoom(Row row) {
    long minimumAmount = row.getLong("minimum_order_amount");
    long currentAmount = row.getLongOrZero("current_order_amount");
    long remainingAmount = Math.max(minimumAmount - currentAmount, 0);
    boolean isClosed = !row.isNull("closed_at");
    boolean isClosing = !isClosed && remainingAmount <= minimumAmount * 0.3;
    Long paymentConsentRequestedAt = (Long) longOrNull(row, "payment_consent_requested_at");
    Long paymentConsentRejectedAt = (Long) longOrNull(row, "payment_consent_rejected_at");
    Long paymentRequestedAt = (Long) longOrNull(row, "payment_requested_at");
    Long paymentConsentRetryAfter = paymentConsentRejectedAt != null && paymentRequestedAt == null
      ? paymentConsentRejectedAt + 20
      : null;

    Map<String, Object> payload = Api.obj(
      "id", row.get("id"),
      "ownerUserId", row.get("owner_user_id"),
      "storeName", row.get("store_name"),
      "shareLocation", row.get("share_location"),
      "platform", row.get("platform"),
      "minimumOrderAmount", minimumAmount,
      "currentOrderAmount", currentAmount,
      "remainingAmount", remainingAmount,
      "deliveryFee", row.get("delivery_fee"),
      "lat", row.get("lat"),
      "lng", row.get("lng"),
      "orderCount", Math.max(row.getLongOrZero("order_count"), 1),
      "status", isClosed ? "closed" : (isClosing ? "closing" : "open"),
      "isClosed", isClosed,
      "createdAt", row.get("created_at"),
      "closedAt", row.get("closed_at"),
      "paymentConsentRequestedAt", paymentConsentRequestedAt,
      "paymentConsentRejectedAt", paymentConsentRejectedAt,
      "paymentConsentRetryAfter", paymentConsentRetryAfter,
      "isPaymentConsentPending", paymentConsentRequestedAt != null
        && paymentConsentRejectedAt == null
        && paymentRequestedAt == null,
      "paymentRequestedAt", paymentRequestedAt,
      "isPaymentRequested", paymentRequestedAt != null,
      "orderedAt", row.getOptional("ordered_at"),
      "isOrdered", row.has("ordered_at") && !row.isNull("ordered_at"),
      "settledAt", row.getOptional("settled_at"),
      "isSettled", row.has("settled_at") && !row.isNull("settled_at"),
      "completedAt", row.getOptional("completed_at")
    );

    if (row.has("my_role")) {
      payload.put("myRole", row.get("my_role"));
    }

    return payload;
  }

  public static Map<String, Object> publicOrder(Row row) {
    Object consentStatus = row.getOptional("payment_consent_status");
    String orderTitle = row.getString("order_title");

    return Api.obj(
      "id", row.get("id"),
      "roomId", row.get("room_id"),
      "userId", row.get("user_id"),
      "nickname", row.get("nickname"),
      // Python의 `x or "메뉴 없음"`은 None뿐 아니라 빈 문자열도 대체한다.
      "orderTitle", orderTitle == null || orderTitle.isEmpty() ? "메뉴 없음" : orderTitle,
      "orderAmount", row.get("order_amount"),
      "paymentConsentStatus", consentStatus,
      "paymentConsentRespondedAt", row.getOptional("payment_consent_responded_at"),
      "isPaymentConsentAccepted", "accepted".equals(consentStatus),
      "isPaymentConsentDeclined", "declined".equals(consentStatus),
      "paidAt", row.getOptional("paid_at"),
      "isPaid", row.getOptional("paid_at") != null,
      "receivedAt", row.getOptional("received_at"),
      "isReceived", row.getOptional("received_at") != null,
      "createdAt", row.get("created_at")
    );
  }

  public static Map<String, Object> publicMessage(Row row) {
    return Api.obj(
      "id", row.get("id"),
      "userId", row.get("user_id"),
      "nickname", row.get("nickname"),
      "message", row.get("message_text"),
      "type", row.has("message_type") ? row.get("message_type") : "chat",
      "createdAt", row.get("created_at")
    );
  }

  public static Map<String, Object> publicNotification(Row row) {
    return Api.obj(
      "id", row.get("id"),
      "roomId", row.getOptional("room_id"),
      "message", row.get("message"),
      "createdAt", row.get("created_at")
    );
  }

  private static Object longOrNull(Row row, String key) {
    return row.has(key) ? row.getLong(key) : null;
  }
}
