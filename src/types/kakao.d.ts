// Minimal Kakao Maps JS SDK declarations: only what src/app.ts uses.
// The SDK is injected at runtime by loadKakaoMapsSdk(), which sets window.kakao.
declare namespace kakao.maps {
  function load(callback: () => void): void;

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  interface MapOptions {
    center: LatLng;
    level?: number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setZoomable(zoomable: boolean): void;
    setDraggable(draggable: boolean): void;
    setLevel(level: number): void;
    setCenter(latlng: LatLng): void;
    relayout(): void;
  }

  interface CustomOverlayOptions {
    position: LatLng;
    content: string | HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  interface CircleOptions {
    center: LatLng;
    radius: number;
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    fillColor?: string;
    fillOpacity?: number;
  }

  class Circle {
    constructor(options: CircleOptions);
    setMap(map: Map | null): void;
  }

  namespace event {
    interface MouseEvent {
      latLng: LatLng;
    }

    function addListener(target: Map, type: string, handler: (mouseEvent: MouseEvent) => void): void;
  }
}

interface HanbatEatsConfig {
  KAKAO_JAVASCRIPT_KEY?: string;
  KAKAO_NATIVE_APP_KEY?: string;
}

interface Window {
  // config.js (plain JS, edited by hand) assigns this before app.js runs.
  HANBAT_EATS_CONFIG?: HanbatEatsConfig;
  // Declared non-optional to match how app.ts uses it after loadKakaoMapsSdk() resolves;
  // the existing `window.kakao?.maps` guards still compile and still run as before.
  kakao: { maps: typeof kakao.maps };
}
