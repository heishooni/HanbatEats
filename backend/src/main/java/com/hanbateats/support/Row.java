package com.hanbateats.support;

import java.util.Map;

/**
 * SELECT 결과 한 줄. server.py의 sqlite3.Row와 같은 역할이다.
 * SQLite INTEGER는 드라이버가 Integer 또는 Long으로 주므로 숫자는 항상 Long으로 꺼낸다.
 */
public record Row(Map<String, Object> values) {

  public boolean has(String key) {
    return values.containsKey(key);
  }

  public Object get(String key) {
    return values.get(key);
  }

  public Long getLong(String key) {
    Object value = values.get(key);
    return value == null ? null : ((Number) value).longValue();
  }

  /** server.py의 `row[key] or 0`. */
  public long getLongOrZero(String key) {
    Long value = has(key) ? getLong(key) : null;
    return value == null ? 0 : value;
  }

  public String getString(String key) {
    Object value = values.get(key);
    return value == null ? null : value.toString();
  }

  /** server.py의 row_value(row, key): 컬럼이 없으면 null. */
  public Object getOptional(String key) {
    return has(key) ? values.get(key) : null;
  }

  public boolean isNull(String key) {
    return values.get(key) == null;
  }
}
