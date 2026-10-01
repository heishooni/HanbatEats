package com.hanbateats.notification;

import java.util.Map;

import com.hanbateats.support.Body;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

  private final NotificationService notifications;

  public NotificationController(NotificationService notifications) {
    this.notifications = notifications;
  }

  @PostMapping("/api/notifications/list")
  public ResponseEntity<Map<String, Object>> list(@RequestBody(required = false) Map<String, Object> body) {
    return notifications.list(Body.of(body));
  }
}
