package com.hanbateats.notification;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.hanbateats.auth.Sessions;
import com.hanbateats.support.Api;
import com.hanbateats.support.Body;
import com.hanbateats.support.Db;
import com.hanbateats.support.Payloads;
import com.hanbateats.support.Row;
import com.hanbateats.support.Values;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** 안 읽은 알림을 최대 20개 돌려주고, 돌려준 알림은 읽음 처리한다. */
@Service
@Transactional
public class NotificationService {

  private final Db db;
  private final Sessions sessions;

  public NotificationService(Db db, Sessions sessions) {
    this.db = db;
    this.sessions = sessions;
  }

  public ResponseEntity<Map<String, Object>> list(Body body) {
    Row user = sessions.findUser(body.token());
    if (user == null) {
      return Api.unauthorized();
    }

    List<Row> rows = db.list(
      """
      SELECT *
      FROM notifications
      WHERE user_id = ?
        AND read_at IS NULL
      ORDER BY created_at ASC, id ASC
      LIMIT 20
      """,
      user.getLong("id")
    );

    List<Map<String, Object>> notifications = rows.stream().map(Payloads::publicNotification).toList();

    if (!rows.isEmpty()) {
      String placeholders = String.join(",", Collections.nCopies(rows.size(), "?"));
      List<Object> args = new ArrayList<>();
      args.add(Values.now());
      rows.forEach(row -> args.add(row.getLong("id")));
      db.update(
        """
        UPDATE notifications
        SET read_at = ?
        WHERE id IN (%s)
        """.formatted(placeholders),
        args.toArray()
      );
    }

    return Api.ok("notifications", notifications);
  }
}
