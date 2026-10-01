package com.hanbateats.support;

import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

/**
 * 예전 버전 DB에 빠진 컬럼을 추가한다. server.py의 ensure_*_columns 함수들.
 * 테이블 생성은 schema.sql이 먼저 하고(spring.sql.init), 이 클래스는 그 뒤에 실행된다.
 * @PostConstruct는 웹 서버가 요청을 받기 전에 끝나므로 마이그레이션 도중 요청이 들어오지 않는다.
 */
@Component
public class SchemaMigrator {

  private final Db db;

  public SchemaMigrator(Db db) {
    this.db = db;
  }

  @PostConstruct
  void migrate() {
    ensureSocialColumns();
    ensureUserAccountColumns();
    ensureRoomColumns();
    ensureRoomOrderColumns();
    ensureMessageColumns();
    ensureChallengeColumns();
  }

  private void ensureChallengeColumns() {
    Map<String, Row> columns = columns("verification_challenges");
    addColumnIfMissing(columns, "verification_challenges", "failed_attempts", "INTEGER NOT NULL DEFAULT 0");
  }

  private Map<String, Row> columns(String table) {
    Map<String, Row> columns = new HashMap<>();
    for (Row row : db.list("PRAGMA table_info(" + table + ")")) {
      columns.put(row.getString("name"), row);
    }
    return columns;
  }

  private void addColumnIfMissing(Map<String, Row> columns, String table, String column, String definition) {
    if (!columns.containsKey(column)) {
      db.execute("ALTER TABLE " + table + " ADD COLUMN " + column + " " + definition);
    }
  }

  // 소셜 로그인 도입 전 DB는 phone_number가 NOT NULL이라 테이블을 다시 만든다.
  private void ensureSocialColumns() {
    Map<String, Row> columns = columns("users");
    Row phoneColumn = columns.get("phone_number");
    Row verifiedColumn = columns.get("phone_verified_at");

    boolean needsRebuild = (phoneColumn != null && phoneColumn.getLong("notnull") == 1)
      || (verifiedColumn != null && verifiedColumn.getLong("notnull") == 1);

    if (!needsRebuild) {
      return;
    }

    db.execute("PRAGMA foreign_keys=off");
    db.execute("""
      CREATE TABLE IF NOT EXISTS users_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone_number TEXT UNIQUE,
        nickname TEXT NOT NULL,
        payout_bank TEXT,
        payout_account_number TEXT,
        payout_account_holder TEXT,
        strawberry_balance INTEGER NOT NULL DEFAULT 0,
        phone_verified_at INTEGER,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
      """);
    // 예전 테이블에 있던 컬럼은 전부 옮긴다. (잔액·정산 계좌가 있었다면 잃지 않도록)
    Map<String, Row> newColumns = columns("users_new");
    String shared = String.join(", ", columns.keySet().stream().filter(newColumns::containsKey).sorted().toList());
    db.execute("INSERT OR IGNORE INTO users_new (" + shared + ") SELECT " + shared + " FROM users");
    db.execute("DROP TABLE users");
    db.execute("ALTER TABLE users_new RENAME TO users");
    db.execute("PRAGMA foreign_keys=on");
  }

  private void ensureUserAccountColumns() {
    Map<String, Row> columns = columns("users");
    addColumnIfMissing(columns, "users", "payout_bank", "TEXT");
    addColumnIfMissing(columns, "users", "payout_account_number", "TEXT");
    addColumnIfMissing(columns, "users", "payout_account_holder", "TEXT");
    addColumnIfMissing(columns, "users", "strawberry_balance", "INTEGER NOT NULL DEFAULT 0");
  }

  private void ensureRoomColumns() {
    Map<String, Row> columns = columns("rooms");
    addColumnIfMissing(columns, "rooms", "share_location", "TEXT NOT NULL DEFAULT ''");
    addColumnIfMissing(columns, "rooms", "completed_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "minimum_reached_notified_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "ordered_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "payment_requested_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "payment_consent_requested_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "payment_consent_rejected_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "settled_at", "INTEGER");
    addColumnIfMissing(columns, "rooms", "canceled_at", "INTEGER");
  }

  private void ensureRoomOrderColumns() {
    Map<String, Row> columns = columns("room_orders");
    addColumnIfMissing(columns, "room_orders", "paid_at", "INTEGER");
    addColumnIfMissing(columns, "room_orders", "received_at", "INTEGER");
    addColumnIfMissing(columns, "room_orders", "payment_consent_status", "TEXT");
    addColumnIfMissing(columns, "room_orders", "payment_consent_responded_at", "INTEGER");
  }

  private void ensureMessageColumns() {
    Map<String, Row> columns = columns("room_messages");
    addColumnIfMissing(columns, "room_messages", "message_type", "TEXT NOT NULL DEFAULT 'chat'");
  }
}
