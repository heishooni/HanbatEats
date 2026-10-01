package com.hanbateats.account;

import java.util.Map;

import com.hanbateats.auth.Sessions;
import com.hanbateats.support.Api;
import com.hanbateats.support.Body;
import com.hanbateats.support.Db;
import com.hanbateats.support.Row;
import com.hanbateats.support.Values;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.hanbateats.support.Payloads.publicUser;

/** 닉네임 변경, 정산 계좌 등록, 딸기(지갑) 충전. */
@Service
@Transactional
public class AccountService {

  private final Db db;
  private final Sessions sessions;
  private final boolean devMode;

  public AccountService(Db db, Sessions sessions, @Value("${hanbat.dev-mode}") boolean devMode) {
    this.db = db;
    this.sessions = sessions;
    this.devMode = devMode;
  }

  public ResponseEntity<Map<String, Object>> chargeWallet(Body body) {
    String token = body.token();
    long amount = body.toInt("amount");

    // 실제 결제 연동이 없어서 이 API는 돈을 받지 않고 잔액을 늘린다. 개발 모드에서만 연다.
    if (!devMode) {
      return Api.error(403, "충전은 개발 모드에서만 사용할 수 있습니다.");
    }
    if (token.isEmpty()) {
      return Api.unauthorized();
    }
    if (amount <= 0) {
      return Api.error(400, "충전 금액을 입력해 주세요.");
    }
    if (amount > 1_000_000) {
      return Api.error(400, "한 번에 100만원까지만 충전할 수 있습니다.");
    }

    long updatedAt = Values.now();
    Row user = sessions.findUser(token);
    if (user == null) {
      return Api.unauthorized();
    }

    db.update(
      """
      UPDATE users
      SET strawberry_balance = COALESCE(strawberry_balance, 0) + ?,
          updated_at = ?
      WHERE id = ?
      """,
      amount, updatedAt, user.getLong("id")
    );
    Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", user.getLong("id"));

    return Api.ok("ok", true, "user", publicUser(updatedUser));
  }

  public ResponseEntity<Map<String, Object>> updateNickname(Body body) {
    String token = body.token();
    String nickname = body.stripped("nickname");

    if (token.isEmpty()) {
      return Api.unauthorized();
    }
    if (Values.pyLen(nickname) < 2 || Values.pyLen(nickname) > 12) {
      return Api.error(400, "닉네임은 2자 이상 12자 이하로 입력해 주세요.");
    }

    long updatedAt = Values.now();
    Row user = sessions.findUser(token);
    if (user == null) {
      return Api.unauthorized();
    }

    db.update(
      """
      UPDATE users
      SET nickname = ?,
          updated_at = ?
      WHERE id = ?
      """,
      nickname, updatedAt, user.getLong("id")
    );
    Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", user.getLong("id"));

    return Api.ok("ok", true, "user", publicUser(updatedUser));
  }

  public ResponseEntity<Map<String, Object>> registerPayoutAccount(Body body) {
    String token = body.token();
    String payoutBank = body.stripped("payoutBank");
    String payoutAccountNumber = Values.normalizeAccountNumber(body.str("payoutAccountNumber"));
    String payoutAccountHolder = body.stripped("payoutAccountHolder");

    if (token.isEmpty()) {
      return Api.unauthorized();
    }
    if (!Values.isValidAccount(payoutBank, payoutAccountNumber, payoutAccountHolder)) {
      return Api.error(400, "정산 계좌 정보를 다시 확인해 주세요.");
    }

    long updatedAt = Values.now();
    Row user = sessions.findUser(token);
    if (user == null) {
      return Api.unauthorized();
    }

    db.update(
      """
      UPDATE users
      SET payout_bank = ?,
          payout_account_number = ?,
          payout_account_holder = ?,
          updated_at = ?
      WHERE id = ?
      """,
      payoutBank, payoutAccountNumber, payoutAccountHolder, updatedAt, user.getLong("id")
    );
    Row updatedUser = db.one("SELECT * FROM users WHERE id = ?", user.getLong("id"));

    return Api.ok("user", publicUser(updatedUser));
  }
}
