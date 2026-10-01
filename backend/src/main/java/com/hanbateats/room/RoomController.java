package com.hanbateats.room;

import java.util.Map;

import com.hanbateats.support.Body;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

  private final RoomService rooms;
  private final PaymentService payments;

  public RoomController(RoomService rooms, PaymentService payments) {
    this.rooms = rooms;
    this.payments = payments;
  }

  @PostMapping("/list")
  public ResponseEntity<Map<String, Object>> list(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.list(Body.of(body));
  }

  @PostMapping("/create")
  public ResponseEntity<Map<String, Object>> create(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.create(Body.of(body));
  }

  @PostMapping("/cancel")
  public ResponseEntity<Map<String, Object>> cancel(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.cancel(Body.of(body));
  }

  @PostMapping("/join")
  public ResponseEntity<Map<String, Object>> join(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.join(Body.of(body));
  }

  @PostMapping("/order-update")
  public ResponseEntity<Map<String, Object>> orderUpdate(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.updateOrder(Body.of(body));
  }

  @PostMapping("/mine")
  public ResponseEntity<Map<String, Object>> mine(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.mine(Body.of(body));
  }

  @PostMapping("/detail")
  public ResponseEntity<Map<String, Object>> detail(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.detail(Body.of(body));
  }

  @PostMapping("/message")
  public ResponseEntity<Map<String, Object>> message(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.sendMessage(Body.of(body));
  }

  @PostMapping("/leave")
  public ResponseEntity<Map<String, Object>> leave(@RequestBody(required = false) Map<String, Object> body) {
    return rooms.leave(Body.of(body));
  }

  @PostMapping("/payment-request")
  public ResponseEntity<Map<String, Object>> paymentRequest(@RequestBody(required = false) Map<String, Object> body) {
    return payments.requestPayment(Body.of(body));
  }

  @PostMapping("/payment-consent")
  public ResponseEntity<Map<String, Object>> paymentConsent(@RequestBody(required = false) Map<String, Object> body) {
    return payments.respondConsent(Body.of(body));
  }

  @PostMapping("/pay")
  public ResponseEntity<Map<String, Object>> pay(@RequestBody(required = false) Map<String, Object> body) {
    return payments.payShare(Body.of(body));
  }

  @PostMapping("/order-complete")
  public ResponseEntity<Map<String, Object>> orderComplete(@RequestBody(required = false) Map<String, Object> body) {
    return payments.markOrdered(Body.of(body));
  }

  @PostMapping("/receive")
  public ResponseEntity<Map<String, Object>> receive(@RequestBody(required = false) Map<String, Object> body) {
    return payments.receive(Body.of(body));
  }

  @PostMapping("/complete")
  public ResponseEntity<Map<String, Object>> complete(@RequestBody(required = false) Map<String, Object> body) {
    return payments.complete(Body.of(body));
  }
}
