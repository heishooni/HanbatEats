package com.hanbateats.auth;

import com.hanbateats.support.Db;
import com.hanbateats.support.Row;
import com.hanbateats.support.Tokens;
import com.hanbateats.support.Values;
import org.springframework.stereotype.Component;

/** 세션 토큰 발급과 토큰으로 사용자 찾기. server.py의 create_session, get_user_by_token. */
@Component
public class Sessions {

  static final long SESSION_SECONDS = 60L * 60 * 24 * 30;

  private final Db db;
  private final Tokens tokens;

  public Sessions(Db db, Tokens tokens) {
    this.db = db;
    this.tokens = tokens;
  }

  public String create(long userId) {
    String token = Tokens.urlSafe(32);
    long createdAt = Values.now();
    db.update(
      """
      INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
      VALUES (?, ?, ?, ?)
      """,
      userId, tokens.hash(token), createdAt + SESSION_SECONDS, createdAt
    );
    return token;
  }

  /** 유효한 세션의 사용자 행. 토큰이 비었거나 만료·취소되었으면 null. */
  public Row findUser(String token) {
    if (token.isEmpty()) {
      return null;
    }

    return db.one(
      """
      SELECT users.*
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = ?
        AND sessions.revoked_at IS NULL
        AND sessions.expires_at >= ?
      """,
      tokens.hash(token), Values.now()
    );
  }
}
