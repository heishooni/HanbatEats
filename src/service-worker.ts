// In the WebWorker lib `self` is typed as WorkerGlobalScope. This file only ever runs as a
// service worker, so merge the ServiceWorkerGlobalScope members it uses into that interface.
// Type-only: nothing here is emitted.
interface WorkerGlobalScope {
  readonly clients: Clients;
  readonly registration: ServiceWorkerRegistration;
  skipWaiting(): Promise<void>;
  addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
    type: K,
    listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

// 캐시 내용이 바뀌는 배포마다 올린다. activate 단계에서 이전 이름의 캐시를 지운다.
const CACHE_NAME = "hanbat-eats-v2";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  // config.js는 저장소에 없을 수 있다(.gitignore). addAll은 하나만 실패해도 전부 실패하므로 미리 받지 않는다.
  "/manifest.webmanifest",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/apple-touch-icon.png",
  "/assets/hanbat-eats-logo-clean.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // API와 다른 출처(Kakao SDK·지도 타일)는 캐시하지 않고 브라우저 기본 동작에 맡긴다.
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // 404·500 같은 실패 응답은 캐시하지 않는다.
        if (response.ok) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy)).catch(() => null);
        }
        return response;
      })
      .catch(async () => {
        // 오프라인: index.html이 붙이는 ?v= 값과 상관없이 같은 파일을 찾는다.
        const cached = await caches.match(request, { ignoreSearch: true });
        if (cached) {
          return cached;
        }
        // 화면 이동 요청만 index.html로 대체하고, 그 외(이미지·스크립트)는 실패로 돌려준다.
        const fallback = request.mode === "navigate" ? await caches.match("/index.html") : undefined;
        return fallback || Response.error();
      })
  );
});

self.addEventListener("push", (event) => {
  let payload: { title: string; body: string; tag?: string } = {
    title: "Hanbat-eats",
    body: "새 알림이 있습니다."
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "Hanbat-eats", {
      body: payload.body || "",
      icon: "/assets/icon-192.png",
      badge: "/assets/icon-192.png",
      tag: payload.tag || "hanbat-eats"
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existingClient = clients.find((client) => "focus" in client);

      if (existingClient) {
        return existingClient.focus();
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }

      return null;
    })
  );
});
