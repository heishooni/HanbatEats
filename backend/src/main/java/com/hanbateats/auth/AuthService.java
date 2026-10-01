package com.hanbateats.auth;

import java.util.Map;
import java.util.Set;

import com.hanbateats.support.Api;
import com.hanbateats.support.Body;
import com.hanbateats.support.Db;
import com.hanbateats.support.Row;
import com.hanbateats.support.Tokens;
import com.hanbateats.support.Values;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.hanbateats.support.Payloads.publicUser;

/**
 * 휴대폰 인증, 회원가입, 개발용 소셜 로그인, 세션 확인, 로그아웃.
 *
 * 각 메서드는 server.py의 `with get_db() as db:` 블록처럼 하나의 트랜잭션이다.
 * 오류도 예외가 아니라 응답으로 돌려주므로, 오류 응답 전에 실행된 쓰기는 server.py와 똑같이 커밋된다.
 */
@Service
@Transactional
public class AuthService {

  private static final Logger log = LoggerFactory.getLogger(AuthService.class);
  private static final long CODE_SECONDS = 60L * 3;
  private static final long SIGNUP_SECONDS = 60L * 10;
  private static final long MAX_CODE_ATTEMPTS = 5;
  private static final Set<String> SOCIAL_PROVIDERS = Set.of("kakao", "apple");

  private final Db db;
  private final Tokens tokens;
  private final Sessions sessions;
  private final boolean devMode;

  public AuthService(Db db, Tokens tokens, Sessions sessions, @Value("${hanbat.dev-mode}") boolean devMode) {
    this.db = db;
    this.tokens = tokens;
    this.sessions = sessions;
    this.devMode = devMode;
    if (devMode) {
      log.warn("개발 모드(HANBAT_DEV_MODE)가 켜져 있습니다. 인증번호가 응답에 포함되어 누구나 아무 번호로 로그인할 수 있습니다.");
    }
  }

  public ResponseEntity<Map<String, Object>> start(Body body) {
    String phone = Values.normalizePhone(body.str("phoneNumber"));

    if (!Values.isValidPhone(phone)) {
      return Api.error(400, "010으로 시작하는 11자리 번호를 입력해 주세요.");
    }

    String challengeId = Tokens.urlSafe(18);
    String code = Tokens.sixDigitCode();
    long createdAt = Values.now();

    db.update(
      """
      INSERT INTO verification_challenges
        (id, phone_number, code_hash, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?)
      """,
      challengeId, phone, tokens.hash(phone + ":" + code), createdAt + CODE_SECONDS, createdAt
    );

    if (!devMode) {
      // ponytail: 실제 SMS 발송 미구현. 운영 모드에서는 인증번호를 전달할 수단이 없다.
      return Api.ok("challengeId", challengeId, "expiresInSeconds", CODE_SECONDS);
    }

    log.info("[dev-sms] {} 인증번호: {}", phone, code);
    return Api.ok(
      "challengeId", challengeId,
      "expiresInSeconds", CODE_SECONDS,
      "devCode", code
    );
  }

  public ResponseEntity<Map<String, Object>> verify(Body body) {
    String challengeId = body.str("challengeId");
    String phone = Values.normalizePhone(body.str("phoneNumber"));
    String code = Values.digits(body.str("code"), 6);

    if (challengeId.isEmpty() || !Values.isValidPhone(phone) || code.length() != 6) {
      return Api.error(400, "인증 정보를 다시 확인해 주세요.");
    }

    Row challenge = db.one("SELECT * FROM verification_challenges WHERE id = ?", challengeId);

    if (challenge == null) {
      return Api.error(404, "인증 요청을 찾을 수 없습니다.");
    }
    if (!challenge.isNull("consumed_at")) {
      return Api.error(400, "이미 사용한 인증번호입니다.");
    }
    if (challenge.getLong("expires_at") < Values.now()) {
      return Api.error(400, "인증번호가 만료되었습니다.");
    }
    if (!phone.equals(challenge.getString("phone_number"))) {
      return Api.error(400, "전화번호가 일치하지 않습니다.");
    }

    String expected = challenge.getString("code_hash");
    String actual = tokens.hash(phone + ":" + code);
    if (!Tokens.constantTimeEquals(expected, actual)) {
      // 6자리 번호를 무작위로 대입하지 못하게 5번 틀리면 이 인증 요청을 무효로 만든다.
      long failedAttempts = challenge.getLongOrZero("failed_attempts") + 1;
      db.update(
        """
        UPDATE verification_challenges
        SET failed_attempts = ?,
            consumed_at = CASE WHEN ? >= ? THEN ? ELSE consumed_at END
        WHERE id = ?
        """,
        failedAttempts, failedAttempts, MAX_CODE_ATTEMPTS, Values.now(), challengeId
      );
      if (failedAttempts >= MAX_CODE_ATTEMPTS) {
        return Api.error(400, "인증번호를 5번 틀렸습니다. 인증번호를 다시 받아 주세요.");
      }
      return Api.error(400, "인증번호가 올바르지 않습니다.");
    }

    db.update("UPDATE verification_challenges SET consumed_at = ? WHERE id = ?", Values.now(), challengeId);

    Row user = db.one("SELECT * FROM users WHERE phone_number = ?", phone);

    if (user != null) {
      String token = sessions.create(user.getLong("id"));
      return Api.ok("status", "logged_in", "token", token, "user", publicUser(user));
    }

    String signupToken = Tokens.urlSafe(28);
    long createdAt = Values.now();
    db.update(
      """
      INSERT INTO signup_tokens
        (token_hash, phone_number, expires_at, created_at)
      VALUES (?, ?, ?, ?)
      """,
      tokens.hash(signupToken), phone, createdAt + SIGNUP_SECONDS, createdAt
    );

    return Api.ok("status", "signup_required", "signupToken", signupToken);
  }

  public ResponseEntity<Map<String, Object>> signup(Body body) {
    String signupToken = body.str("signupToken");
    String nickname = body.stripped("nickname");
    String payoutBank = body.stripped("payoutBank");
    String payoutAccountNumber = Values.normalizeAccountNumber(body.str("payoutAccountNumber"));
    String payoutAccountHolder = body.stripped("payoutAccountHolder");

    if (signupToken.isEmpty()) {
      return Api.error(400, "회원가입 토큰이 없습니다.");
    }
    if (Values.pyLen(nickname) < 2 || Values.pyLen(nickname) > 12) {
      return Api.error(400, "닉네임은 2자 이상 12자 이하로 입력해 주세요.");
    }
    if (!Values.isValidAccount(payoutBank, payoutAccountNumber, payoutAccountHolder)) {
      return Api.error(400, "정산 계좌 정보를 다시 확인해 주세요.");
    }

    Row signupRow = db.one("SELECT * FROM signup_tokens WHERE token_hash = ?", tokens.hash(signupToken));

    if (signupRow == null) {
      return Api.error(404, "회원가입 요청을 찾을 수 없습니다.");
    }
    if (!signupRow.isNull("consumed_at")) {
      return Api.error(400, "이미 사용한 회원가입 요청입니다.");
    }
    if (signupRow.getLong("expires_at") < Values.now()) {
      return Api.error(400, "회원가입 요청이 만료되었습니다.");
    }

    String phone = signupRow.getString("phone_number");
    Row existingUser = db.one("SELECT * FROM users WHERE phone_number = ?", phone);

    if (existingUser != null) {
      String token = sessions.create(existingUser.getLong("id"));
      return Api.ok("status", "logged_in", "token", token, "user", publicUser(existingUser));
    }

    long createdAt = Values.now();
    long userId = db.insert(
      """
      INSERT INTO users
        (phone_number, nickname, payout_bank, payout_account_number, payout_account_holder, phone_verified_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      """,
      phone, nickname, payoutBank, payoutAccountNumber, payoutAccountHolder, createdAt, createdAt, createdAt
    );
    db.update(
      "UPDATE signup_tokens SET consumed_at = ? WHERE token_hash = ?",
      createdAt, tokens.hash(signupToken)
    );
    Row user = db.one("SELECT * FROM users WHERE id = ?", userId);
    String token = sessions.create(userId);

    return Api.ok("status", "signed_up", "token", token, "user", publicUser(user));
  }

  public ResponseEntity<Map<String, Object>> socialMock(Body body) {
    if (!devMode) {
      return Api.error(404, "API를 찾을 수 없습니다.");
    }

    String provider = body.str("provider");

    if (!SOCIAL_PROVIDERS.contains(provider)) {
      return Api.error(400, "지원하지 않는 로그인 방식입니다.");
    }

    String providerUserId = "dev-" + provider + "-user";
    String nickname = provider.equals("kakao") ? "카카오 사용자" : "Apple 사용자";
    String email = provider + "@hanbat-eats.dev";
    long createdAt = Values.now();

    Row account = db.one(
      """
      SELECT users.*
      FROM social_accounts
      JOIN users ON users.id = social_accounts.user_id
      WHERE social_accounts.provider = ?
        AND social_accounts.provider_user_id = ?
      """,
      provider, providerUserId
    );

    if (account == null) {
      long userId = db.insert(
        """
        INSERT INTO users
          (phone_number, nickname, phone_verified_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        null, nickname, null, createdAt, createdAt
      );
      db.update(
        """
        INSERT INTO social_accounts
          (user_id, provider, provider_user_id, email, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        userId, provider, providerUserId, email, createdAt, createdAt
      );
      account = db.one("SELECT * FROM users WHERE id = ?", userId);
    }

    String token = sessions.create(account.getLong("id"));

    return Api.ok(
      "status", "logged_in",
      "provider", provider,
      "token", token,
      "user", publicUser(account)
    );
  }

  public ResponseEntity<Map<String, Object>> session(Body body) {
    String token = body.token();
    if (token.isEmpty()) {
      return Api.ok("authenticated", false);
    }

    Row session = db.one(
      """
      SELECT
        users.id AS id,
        users.phone_number AS phone_number,
        users.nickname AS nickname,
        users.payout_bank AS payout_bank,
        users.payout_account_number AS payout_account_number,
        users.payout_account_holder AS payout_account_holder,
        users.strawberry_balance AS strawberry_balance,
        sessions.expires_at AS expires_at,
        sessions.revoked_at AS revoked_at
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = ?
      """,
      tokens.hash(token)
    );

    if (session == null || !session.isNull("revoked_at") || session.getLong("expires_at") < Values.now()) {
      return Api.ok("authenticated", false);
    }

    return Api.ok("authenticated", true, "user", publicUser(session));
  }

  public ResponseEntity<Map<String, Object>> logout(Body body) {
    String token = body.token();

    if (!token.isEmpty()) {
      db.update(
        "UPDATE sessions SET revoked_at = ? WHERE token_hash = ?",
        Values.now(), tokens.hash(token)
      );
    }

    return Api.ok("ok", true);
  }
}
