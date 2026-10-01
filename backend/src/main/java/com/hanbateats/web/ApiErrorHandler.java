package com.hanbateats.web;

import java.util.Map;

import com.hanbateats.support.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * server.py do_POST의 try/except와 마지막 404 응답.
 * annotations = RestController.class 로 API 컨트롤러에서 난 예외만 잡는다(정적 파일 404는 건드리지 않음).
 */
@RestControllerAdvice(annotations = RestController.class)
@RestController
public class ApiErrorHandler {

  private static final Logger log = LoggerFactory.getLogger(ApiErrorHandler.class);

  /** 위에서 매핑되지 않은 POST /api/... 요청. 구체적인 매핑이 항상 먼저 선택된다. */
  @PostMapping("/api/**")
  public ResponseEntity<Map<String, Object>> notFound() {
    return Api.error(404, "API를 찾을 수 없습니다.");
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Map<String, Object>> badJson() {
    return Api.error(400, "JSON 형식이 올바르지 않습니다.");
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> serverError(Exception error) {
    // 415(Content-Type 오류), 405 같은 요청 쪽 오류는 Spring이 상태코드를 알고 있다.
    if (error instanceof ErrorResponse clientError && clientError.getStatusCode().is4xxClientError()) {
      return Api.error(clientError.getStatusCode().value(), "요청 형식이 올바르지 않습니다.");
    }
    log.error("[server-error] {}", error.getMessage(), error);
    return Api.error(500, "서버 오류가 발생했습니다.");
  }
}
