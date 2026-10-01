package com.hanbateats.support;

import java.util.Map;

/** 요청 JSON 본문. server.py의 body.get(key, "") 패턴을 메서드로 묶었다. */
public record Body(Map<String, Object> raw) {

  public static Body of(Map<String, Object> raw) {
    return new Body(raw == null ? Map.of() : raw);
  }

  public Object get(String key) {
    return raw.get(key);
  }

  /** body.get(key, ""). 문자열이 아닌 값은 문자열로 바꾼다. */
  public String str(String key) {
    Object value = raw.get(key);
    return value == null ? "" : value.toString();
  }

  /** body.get(key, "").strip() */
  public String stripped(String key) {
    return Values.pyStrip(str(key));
  }

  public String token() {
    return str("token");
  }

  public long toInt(String key) {
    return Values.toInt(raw.get(key), 0);
  }
}
