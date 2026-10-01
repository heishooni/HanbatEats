package com.hanbateats.account;

import java.util.Map;

import com.hanbateats.support.Body;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

  private final AccountService account;

  public AccountController(AccountService account) {
    this.account = account;
  }

  @PostMapping("/api/account/nickname")
  public ResponseEntity<Map<String, Object>> nickname(@RequestBody(required = false) Map<String, Object> body) {
    return account.updateNickname(Body.of(body));
  }

  @PostMapping("/api/account/register")
  public ResponseEntity<Map<String, Object>> register(@RequestBody(required = false) Map<String, Object> body) {
    return account.registerPayoutAccount(Body.of(body));
  }

  @PostMapping("/api/wallet/charge")
  public ResponseEntity<Map<String, Object>> charge(@RequestBody(required = false) Map<String, Object> body) {
    return account.chargeWallet(Body.of(body));
  }
}
