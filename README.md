# HanbatEats

한밭이츠는 한밭대학교 주변 학생들을 위한 모바일 중심 공동 배달 주문 프로토타입입니다.

## 현재 상태

- `docs/hanbateats-replan.md`: 새 기획 초안
- `index.html`: 모바일 앱형 화면 프로토타입
- `styles.css`: 브랜드 색상과 모바일 UI 스타일
- `src/app.ts`, `src/service-worker.ts`: 프론트엔드 TypeScript 소스
- `src/types/`: API 응답 타입, Kakao 지도 SDK 타입 선언
- `app.js`, `service-worker.js`: `npm run build`가 만드는 결과물 (직접 수정하지 않음)
- `backend/`: Spring Boot(Java 25, Gradle) 백엔드. 정적 파일과 API를 함께 제공
- `backend/src/main/resources/schema.sql`: DB 테이블 정의 (서버 시작 시 자동 생성)
- `data/hanbateats.sqlite3`: 로컬 SQLite DB. 처음 실행할 때 자동으로 생기며 커밋하지 않음
- `assets/hanbat-eats-logo-clean.png`: 로그인 화면 로고
- `config.example.js`: Kakao 지도 키 설정 예시. `config.js`로 복사해서 사용 (`config.js`는 커밋하지 않음)

## 준비물

- JDK 25: 백엔드 실행에 필요합니다. Gradle은 저장소에 포함된 `./gradlew`가 자동으로 내려받습니다.
- Node.js: `src/`의 TypeScript를 수정할 때만 필요합니다. 빌드된 `app.js`가 저장소에 포함되어 있어서 실행만 할 때는 없어도 됩니다.

## 실행 방법

1. (선택) Kakao 지도 키를 설정합니다. 하지 않으면 개발용 기본 지도가 표시됩니다.

```bash
cp config.example.js config.js
```

2. 백엔드를 실행합니다. 프로젝트 루트를 기준으로 `index.html`과 `data/`를 찾고, DB가 없으면 새로 만듭니다.

```bash
cd backend
./gradlew bootRun
```

3. 프론트엔드를 수정했다면 다시 빌드합니다. `src/`를 수정했을 때만 필요합니다.

```bash
npm install
npm run build
```

환경변수는 다음과 같습니다.

```text
HANBAT_PORT            기본 5173
HANBAT_HTTPS_CERT      PEM 인증서 경로 (KEY와 함께 있으면 HTTPS)
HANBAT_HTTPS_KEY       PEM 개인키 경로
HANBAT_SERVER_SECRET   토큰 해시용 비밀값. 없으면 개발용 기본값을 쓰고 경고를 남김
HANBAT_DEV_MODE        기본 true. 아래 설명 참고
```

`HANBAT_DEV_MODE`는 기본값이 `true`입니다. 실제 SMS 발송과 결제 연동이 아직 없어서, 개발 모드에서만 다음 기능이 동작합니다.

```text
인증번호를 화면에 표시 (누구나 아무 번호로 로그인 가능)
딸기(잔액) 충전, 개발용 소셜 로그인, 파일 변경 시 자동 새로고침
```

외부에 공개할 때는 SMS·결제를 연동한 뒤 `HANBAT_DEV_MODE=false`로 실행합니다.

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:5173
```

핸드폰에서 확인하려면 Mac과 핸드폰이 같은 Wi-Fi에 있어야 합니다. 그다음 Mac의 로컬 IP를 확인하고 아래 형식으로 접속합니다.

```text
http://MAC_LOCAL_IP:5173
```

예시는 아래와 같습니다.

```text
http://192.168.0.10:5173
```

## 현재 인증 API

로그인은 휴대폰 번호 인증 방식입니다. 실제 SMS 발송은 아직 없고, 개발 모드에서는 인증번호를 응답과 화면에 보여줍니다.

```text
POST /api/auth/start      인증번호 발급
POST /api/auth/verify     인증번호 확인 (5번 틀리면 무효)
POST /api/auth/signup     닉네임·정산 계좌 등록
POST /api/auth/session    저장된 토큰으로 자동 로그인
POST /api/auth/logout
```

`POST /api/auth/social/mock`은 카카오/Apple 로그인을 흉내 내는 개발 모드 전용 API입니다. 화면에는 연결되어 있지 않으며, 실제 연동 시 각 OAuth 콜백 처리 API로 교체합니다.

## Kakao 지도 설정

현재 웹 미리보기와 iOS 앱은 필요한 키가 다릅니다.

```text
웹 미리보기: JavaScript Key
iOS 앱: Native App Key
```

`config.example.js`를 `config.js`로 복사한 뒤 둘을 분리해서 넣습니다.

```js
window.HANBAT_EATS_CONFIG = {
  KAKAO_JAVASCRIPT_KEY: "발급받은 JavaScript Key",
  KAKAO_NATIVE_APP_KEY: "발급받은 Native App Key",
};
```

웹 미리보기에서 카카오 지도를 보려면 Kakao Developers의 JavaScript SDK 도메인에 테스트 주소를 등록해야 합니다.

```text
http://localhost:5173
http://127.0.0.1:5173
http://현재_Wi-Fi_IP:5173
```

키가 비어 있거나 도메인이 등록되지 않으면 실제 카카오 지도 대신 개발용 fallback 지도가 표시됩니다.

iOS 앱으로 옮길 때는 Native App Key와 iOS Bundle ID를 Kakao Developers의 iOS 플랫폼 설정에 맞춰 사용합니다.

## 라이선스

[MIT](LICENSE)
