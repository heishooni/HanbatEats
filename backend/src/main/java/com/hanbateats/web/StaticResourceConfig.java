package com.hanbateats.web;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 프론트엔드 파일만 허용 목록으로 서빙한다.
 *
 * server.py는 프로젝트 루트 전체를 서빙해서 data/hanbateats.sqlite3, certs/*.key 같은 파일도
 * URL로 내려받을 수 있었다. 여기서는 아래에 적은 경로만 열고 나머지는 404가 된다.
 * Spring의 ResourceHttpRequestHandler는 "../" 같은 경로 탐색도 막는다.
 */
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

  private static final String[] ROOT_FILES = {
    "/index.html",
    "/styles.css",
    "/app.js",
    "/config.js",
    "/service-worker.js",
    "/manifest.webmanifest",
  };

  private final String rootLocation;

  public StaticResourceConfig(@Value("${hanbat.root-dir}") String rootDir) {
    // file:/Users/.../hanbateats/ 형태. 끝의 /가 있어야 폴더로 인식된다.
    this.rootLocation = Path.of(rootDir).toAbsolutePath().normalize().toUri().toString();
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler(ROOT_FILES).addResourceLocations(rootLocation);
    registry.addResourceHandler("/assets/**").addResourceLocations(rootLocation + "assets/");
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    // "/"와 "/?source=pwa"(manifest의 start_url)는 index.html을 보여준다.
    registry.addViewController("/").setViewName("forward:/index.html");
  }
}
