package com.hanbateats.auth;

import java.util.Map;

import com.hanbateats.support.Body;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService auth;

  public AuthController(AuthService auth) {
    this.auth = auth;
  }

  @PostMapping("/start")
  public ResponseEntity<Map<String, Object>> start(@RequestBody(required = false) Map<String, Object> body) {
    return auth.start(Body.of(body));
  }

  @PostMapping("/verify")
  public ResponseEntity<Map<String, Object>> verify(@RequestBody(required = false) Map<String, Object> body) {
    return auth.verify(Body.of(body));
  }

  @PostMapping("/signup")
  public ResponseEntity<Map<String, Object>> signup(@RequestBody(required = false) Map<String, Object> body) {
    return auth.signup(Body.of(body));
  }

  @PostMapping("/social/mock")
  public ResponseEntity<Map<String, Object>> socialMock(@RequestBody(required = false) Map<String, Object> body) {
    return auth.socialMock(Body.of(body));
  }

  @PostMapping("/session")
  public ResponseEntity<Map<String, Object>> session(@RequestBody(required = false) Map<String, Object> body) {
    return auth.session(Body.of(body));
  }

  @PostMapping("/logout")
  public ResponseEntity<Map<String, Object>> logout(@RequestBody(required = false) Map<String, Object> body) {
    return auth.logout(Body.of(body));
  }
}
