package com.hanbateats.web;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.hanbateats.support.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** 상태 확인과, 프론트가 파일 변경을 감지해 새로고침하는 데 쓰는 버전 값. */
@RestController
public class DevController {

  private static final List<String> DEV_WATCH_FILES = List.of("index.html", "styles.css", "app.js", "config.js");

  private final Path rootDir;
  private final boolean devMode;

  public DevController(@Value("${hanbat.root-dir}") String rootDir, @Value("${hanbat.dev-mode}") boolean devMode) {
    this.rootDir = Path.of(rootDir);
    this.devMode = devMode;
  }

  @GetMapping("/api/health")
  public Map<String, Object> health() {
    return Api.obj("ok", true);
  }

  /**
   * 감시 파일 중 가장 최근 수정 시각(나노초). 값이 바뀌면 프론트가 새로고침한다.
   * 개발 모드가 아니면 404를 돌려주고, 프론트는 404를 받으면 폴링을 멈춘다.
   */
  @GetMapping("/api/dev/version")
  public ResponseEntity<Map<String, Object>> version() throws IOException {
    if (!devMode) {
      return Api.error(404, "API를 찾을 수 없습니다.");
    }

    long latest = 0;
    for (String filename : DEV_WATCH_FILES) {
      Path path = rootDir.resolve(filename);
      if (Files.exists(path)) {
        latest = Math.max(latest, Files.getLastModifiedTime(path).to(TimeUnit.NANOSECONDS));
      }
    }
    // 감시 파일이 하나도 없을 때 현재 시각을 돌려주면 매초 값이 바뀌어 무한 새로고침이 된다. 0으로 고정한다.
    return Api.ok("version", String.valueOf(latest));
  }
}
