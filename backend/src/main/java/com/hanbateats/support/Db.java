package com.hanbateats.support;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/** JdbcTemplate을 server.py의 db.execute(...).fetchone()/fetchall() 모양으로 감싼 얇은 래퍼. */
@Component
public class Db {

  private final JdbcTemplate jdbc;

  public Db(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public Row one(String sql, Object... args) {
    List<Row> rows = list(sql, args);
    return rows.isEmpty() ? null : rows.get(0);
  }

  public List<Row> list(String sql, Object... args) {
    return jdbc.queryForList(sql, args).stream().map(Row::new).toList();
  }

  /** UPDATE/DELETE. 바뀐 행 수(server.py의 cursor.rowcount)를 돌려준다. */
  public int update(String sql, Object... args) {
    return jdbc.update(sql, args);
  }

  /** INSERT 후 새 행의 id(server.py의 cursor.lastrowid). 연결이 1개라 같은 연결에서 조회된다. */
  public long insert(String sql, Object... args) {
    jdbc.update(sql, args);
    return jdbc.queryForObject("SELECT last_insert_rowid()", Long.class);
  }

  public long count(String sql, Object... args) {
    Long value = jdbc.queryForObject(sql, Long.class, args);
    return value == null ? 0 : value;
  }

  public void execute(String sql) {
    jdbc.execute(sql);
  }
}
