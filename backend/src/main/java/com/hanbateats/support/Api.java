package com.hanbateats.support;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;

/**
 * JSON 응답 헬퍼. server.py의 json_response(handler, status, {...})에 해당한다.
 * LinkedHashMap을 써서 응답 필드 순서를 server.py와 같게 유지한다.
 */
public final class Api {

  private Api() {
  }

  /** obj("a", 1, "b", 2) -> {"a": 1, "b": 2}. Map.of와 달리 null 값과 순서를 유지한다. */
  public static Map<String, Object> obj(Object... keyValues) {
    Map<String, Object> map = new LinkedHashMap<>();
    for (int i = 0; i < keyValues.length; i += 2) {
      map.put((String) keyValues[i], keyValues[i + 1]);
    }
    return map;
  }

  public static ResponseEntity<Map<String, Object>> json(int status, Map<String, Object> payload) {
    return ResponseEntity.status(status).body(payload);
  }

  public static ResponseEntity<Map<String, Object>> ok(Object... keyValues) {
    return json(200, obj(keyValues));
  }

  public static ResponseEntity<Map<String, Object>> error(int status, String message) {
    return json(status, obj("message", message));
  }

  public static ResponseEntity<Map<String, Object>> unauthorized() {
    return error(401, "로그인이 필요합니다.");
  }
}
