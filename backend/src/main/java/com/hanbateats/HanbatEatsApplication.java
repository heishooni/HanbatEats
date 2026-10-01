package com.hanbateats;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HanbatEatsApplication {

  public static void main(String[] args) throws IOException {
    // SQLite는 DB 파일이 들어갈 폴더가 없으면 연결에 실패하므로 먼저 만든다. (server.py의 DATA_DIR.mkdir)
    String rootDir = System.getenv().getOrDefault("HANBAT_ROOT", ".");
    // backend/ 같은 다른 폴더에서 실행하면 빈 DB가 새로 생기고 화면 파일이 전부 404가 된다. 그 전에 멈춘다.
    if (!Files.exists(Path.of(rootDir, "index.html"))) {
      System.err.println("프로젝트 루트를 찾지 못했습니다: " + Path.of(rootDir).toAbsolutePath().normalize()
        + "\nindex.html이 있는 폴더에서 실행하거나 HANBAT_ROOT 환경변수로 지정하세요. (cd backend && ./gradlew bootRun 은 자동으로 맞춰집니다)");
      System.exit(1);
    }
    Files.createDirectories(Path.of(rootDir, "data"));

    SpringApplication app = new SpringApplication(HanbatEatsApplication.class);
    app.setDefaultProperties(httpsProperties());
    app.run(args);
  }

  // server.py와 같이 HANBAT_HTTPS_CERT, HANBAT_HTTPS_KEY가 둘 다 있을 때만 HTTPS로 연다.
  private static Map<String, Object> httpsProperties() {
    String certPath = System.getenv("HANBAT_HTTPS_CERT");
    String keyPath = System.getenv("HANBAT_HTTPS_KEY");
    Map<String, Object> properties = new HashMap<>();

    if (certPath != null && !certPath.isEmpty() && keyPath != null && !keyPath.isEmpty()) {
      properties.put("server.ssl.certificate", "file:" + certPath);
      properties.put("server.ssl.certificate-private-key", "file:" + keyPath);
    }

    return properties;
  }
}
