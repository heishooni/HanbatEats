package com.hanbateats.support;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/** 토큰 생성과 해시. server.py의 secrets.token_urlsafe, hash_value에 해당한다. */
@Component
public class Tokens {

  private static final Logger log = LoggerFactory.getLogger(Tokens.class);
  private static final String DEV_SECRET = "hanbateats-dev-secret-change-me";
  private static final SecureRandom RANDOM = new SecureRandom();

  private final String serverSecret;

  public Tokens(@Value("${hanbat.server-secret}") String serverSecret) {
    this.serverSecret = serverSecret;
    if (DEV_SECRET.equals(serverSecret)) {
      log.warn("HANBAT_SERVER_SECRET이 설정되지 않아 개발용 기본 secret을 사용합니다. 외부 공개 전에 반드시 설정하세요.");
    }
  }

  /** sha256("값:secret")의 16진수 문자열. 기존 DB와 호환되도록 server.py와 같은 방식을 유지한다. */
  public String hash(String value) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] bytes = digest.digest((value + ":" + serverSecret).getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(bytes);
    } catch (NoSuchAlgorithmException error) {
      throw new IllegalStateException(error);
    }
  }

  /** hmac.compare_digest: 비교 시간이 내용에 따라 달라지지 않게 비교한다. */
  public static boolean constantTimeEquals(String expected, String actual) {
    return MessageDigest.isEqual(
      expected.getBytes(StandardCharsets.UTF_8),
      actual.getBytes(StandardCharsets.UTF_8)
    );
  }

  /** secrets.token_urlsafe(n): 난수 n바이트를 패딩 없는 base64url로. */
  public static String urlSafe(int byteCount) {
    byte[] bytes = new byte[byteCount];
    RANDOM.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  /** f"{secrets.randbelow(1_000_000):06d}" */
  public static String sixDigitCode() {
    return String.format("%06d", RANDOM.nextInt(1_000_000));
  }
}
