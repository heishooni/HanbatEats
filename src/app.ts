const phoneForm = document.querySelector<HTMLFormElement>("#phoneForm")!;
const codeForm = document.querySelector<HTMLFormElement>("#codeForm")!;
const signupForm = document.querySelector<HTMLFormElement>("#signupForm")!;
const accountForm = document.querySelector<HTMLFormElement>("#accountForm")!;
const phoneInput = document.querySelector<HTMLInputElement>("#phoneInput")!;
const codeInput = document.querySelector<HTMLInputElement>("#codeInput")!;
const nicknameInput = document.querySelector<HTMLInputElement>("#nicknameInput")!;
const bankInput = document.querySelector<HTMLInputElement>("#bankInput")!;
const bankSelectButton = document.querySelector<HTMLButtonElement>("#bankSelectButton")!;
const bankSelectText = document.querySelector<HTMLSpanElement>("#bankSelectText")!;
const bankOptionList = document.querySelector<HTMLDivElement>("#bankOptionList")!;
const accountNumberInput = document.querySelector<HTMLInputElement>("#accountNumberInput")!;
const accountHolderInput = document.querySelector<HTMLInputElement>("#accountHolderInput")!;
const formHint = document.querySelector<HTMLParagraphElement>("#formHint")!;
const codeHint = document.querySelector<HTMLParagraphElement>("#codeHint")!;
const signupHint = document.querySelector<HTMLParagraphElement>("#signupHint")!;
const accountHint = document.querySelector<HTMLParagraphElement>("#accountHint")!;
const loginScreen = document.querySelector<HTMLElement>("#loginScreen")!;
const homeScreen = document.querySelector<HTMLElement>("#homeScreen")!;
const logoutButton = document.querySelector<HTMLButtonElement>("#logoutButton")!;
const backToPhoneButton = document.querySelector<HTMLButtonElement>("#backToPhoneButton")!;
const backToNicknameButton = document.querySelector<HTMLButtonElement>("#backToNicknameButton")!;
const mapRoomsLayer = document.querySelector<HTMLDivElement>("#mapRoomsLayer")!;
const mapRoomPopup = document.querySelector<HTMLDivElement>("#mapRoomPopup")!;
const locateButton = document.querySelector<HTMLButtonElement>("#locateButton")!;
const kakaoMapContainer = document.querySelector<HTMLDivElement>("#kakaoMap")!;
const radiusCircle = document.querySelector<HTMLDivElement>("#radiusCircle")!;
const radiusControl = document.querySelector<HTMLDivElement>("#radiusControl")!;
const roomList = document.querySelector<HTMLDivElement>("#roomList")!;
const myRoomList = document.querySelector<HTMLDivElement>("#myRoomList")!;
const chatRoomList = document.querySelector<HTMLDivElement>("#chatRoomList")!;
const roomSectionTabs = document.querySelectorAll<HTMLButtonElement>("button[data-room-section]");
const myRoomDetailScreen = document.querySelector<HTMLElement>("#myRoomDetailScreen")!;
const closeMyRoomDetailButton = document.querySelector<HTMLButtonElement>("#closeMyRoomDetailButton")!;
const myRoomChatTitle = document.querySelector<HTMLElement>("#myRoomChatTitle")!;
const myRoomDetailStatus = document.querySelector<HTMLSpanElement>("#myRoomDetailStatus")!;
const myRoomDetailStore = document.querySelector<HTMLHeadingElement>("#myRoomDetailStore")!;
const myRoomDetailMeta = document.querySelector<HTMLParagraphElement>("#myRoomDetailMeta")!;
const myRoomDetailProgress = document.querySelector<HTMLSpanElement>("#myRoomDetailProgress")!;
const myRoomDetailCurrent = document.querySelector<HTMLSpanElement>("#myRoomDetailCurrent")!;
const myRoomDetailMinimum = document.querySelector<HTMLSpanElement>("#myRoomDetailMinimum")!;
const myRoomDetailActions = document.querySelector<HTMLDivElement>("#myRoomDetailActions")!;
const myRoomOrderCount = document.querySelector<HTMLElement>("#myRoomOrderCount")!;
const myRoomOrderEditButton = document.querySelector<HTMLButtonElement>("#myRoomOrderEditButton")!;
const myRoomOrderList = document.querySelector<HTMLDivElement>("#myRoomOrderList")!;
const myRoomChatList = document.querySelector<HTMLDivElement>("#myRoomChatList")!;
const myRoomChatForm = document.querySelector<HTMLFormElement>("#myRoomChatForm")!;
const myRoomChatInput = document.querySelector<HTMLInputElement>("#myRoomChatInput")!;
const myRoomChatHint = document.querySelector<HTMLParagraphElement>("#myRoomChatHint")!;
const appToast = document.querySelector<HTMLDivElement>("#appToast")!;
const paymentConsentDialog = document.querySelector<HTMLElement>("#paymentConsentDialog")!;
const paymentConsentStoreName = document.querySelector<HTMLElement>("#paymentConsentStoreName")!;
const paymentConsentMessage = document.querySelector<HTMLParagraphElement>("#paymentConsentMessage")!;
const paymentConsentBreakdown = document.querySelector<HTMLDivElement>("#paymentConsentBreakdown")!;
const paymentConsentAcceptButton = document.querySelector<HTMLButtonElement>("#paymentConsentAcceptButton")!;
const paymentConsentDeclineButton = document.querySelector<HTMLButtonElement>("#paymentConsentDeclineButton")!;
const appConfirmDialog = document.querySelector<HTMLElement>("#appConfirmDialog")!;
const appConfirmEyebrow = document.querySelector<HTMLSpanElement>("#appConfirmEyebrow")!;
const appConfirmTitle = document.querySelector<HTMLElement>("#appConfirmTitle")!;
const appConfirmMessage = document.querySelector<HTMLParagraphElement>("#appConfirmMessage")!;
const appConfirmCancelButton = document.querySelector<HTMLButtonElement>("#appConfirmCancelButton")!;
const appConfirmOkButton = document.querySelector<HTMLButtonElement>("#appConfirmOkButton")!;
const orderEditDialog = document.querySelector<HTMLElement>("#orderEditDialog")!;
const orderEditForm = document.querySelector<HTMLFormElement>("#orderEditForm")!;
const editOrderTitleInput = document.querySelector<HTMLInputElement>("#editOrderTitleInput")!;
const editOrderAmountInput = document.querySelector<HTMLInputElement>("#editOrderAmountInput")!;
const orderEditHint = document.querySelector<HTMLParagraphElement>("#orderEditHint")!;
const orderEditCancelButton = document.querySelector<HTMLButtonElement>("#orderEditCancelButton")!;
const settingsProfileCard = document.querySelector<HTMLButtonElement>("#settingsProfileCard")!;
const settingsProfileInitial = document.querySelector<HTMLDivElement>("#settingsProfileInitial")!;
const settingsNickname = document.querySelector<HTMLElement>("#settingsNickname")!;
const settingsPhone = document.querySelector<HTMLSpanElement>("#settingsPhone")!;
const settingsStrawberryBalance = document.querySelector<HTMLElement>("#settingsStrawberryBalance")!;
const openWalletChargeButton = document.querySelector<HTMLButtonElement>("#openWalletChargeButton")!;
const walletChargeDialog = document.querySelector<HTMLElement>("#walletChargeDialog")!;
const walletChargeForm = document.querySelector<HTMLFormElement>("#walletChargeForm")!;
const walletChargeAmountInput = document.querySelector<HTMLInputElement>("#walletChargeAmountInput")!;
const walletChargeHint = document.querySelector<HTMLParagraphElement>("#walletChargeHint")!;
const walletChargeCancelButton = document.querySelector<HTMLButtonElement>("#walletChargeCancelButton")!;
const profileEditDialog = document.querySelector<HTMLElement>("#profileEditDialog")!;
const profileEditForm = document.querySelector<HTMLFormElement>("#profileEditForm")!;
const profileNicknameInput = document.querySelector<HTMLInputElement>("#profileNicknameInput")!;
const profileEditHint = document.querySelector<HTMLParagraphElement>("#profileEditHint")!;
const profileEditCancelButton = document.querySelector<HTMLButtonElement>("#profileEditCancelButton")!;
const settingsPayoutAccount = document.querySelector<HTMLElement>("#settingsPayoutAccount")!;
const notificationTestButton = document.querySelector<HTMLButtonElement>("#notificationTestButton")!;
const notificationStatus = document.querySelector<HTMLElement>("#notificationStatus")!;
const bottomTabs = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
const createRoomButtons = document.querySelectorAll<HTMLButtonElement>(".create-room-button");
const createRoomBackdrop = document.querySelector<HTMLDivElement>("#createRoomBackdrop")!;
const createRoomSheet = document.querySelector<HTMLElement>("#createRoomSheet")!;
const closeCreateRoomButton = document.querySelector<HTMLButtonElement>("#closeCreateRoomButton")!;
const createRoomForm = document.querySelector<HTMLFormElement>("#createRoomForm")!;
const platformInput = document.querySelector<HTMLSelectElement>("#platformInput")!;
const storeNameInput = document.querySelector<HTMLInputElement>("#storeNameInput")!;
const shareLocationInput = document.querySelector<HTMLInputElement>("#shareLocationInput")!;
const joinRoomBackdrop = document.querySelector<HTMLDivElement>("#joinRoomBackdrop")!;
const joinRoomSheet = document.querySelector<HTMLElement>("#joinRoomSheet")!;
const closeJoinRoomButton = document.querySelector<HTMLButtonElement>("#closeJoinRoomButton")!;
const joinRoomForm = document.querySelector<HTMLFormElement>("#joinRoomForm")!;
const joinRoomPlatform = document.querySelector<HTMLSpanElement>("#joinRoomPlatform")!;
const joinRoomStoreName = document.querySelector<HTMLElement>("#joinRoomStoreName")!;
const joinRoomRemaining = document.querySelector<HTMLParagraphElement>("#joinRoomRemaining")!;
const joinOrderTitleInput = document.querySelector<HTMLInputElement>("#joinOrderTitleInput")!;
const joinOrderAmountInput = document.querySelector<HTMLInputElement>("#joinOrderAmountInput")!;
const joinRoomHint = document.querySelector<HTMLParagraphElement>("#joinRoomHint")!;
const shareLocationScreen = document.querySelector<HTMLElement>("#shareLocationScreen")!;
const openShareLocationPickerButton = document.querySelector<HTMLButtonElement>("#openShareLocationPickerButton")!;
const closeShareLocationPickerButton = document.querySelector<HTMLButtonElement>("#closeShareLocationPickerButton")!;
const confirmShareLocationButton = document.querySelector<HTMLButtonElement>("#confirmShareLocationButton")!;
const shareLocationSummary = document.querySelector<HTMLElement>("#shareLocationSummary")!;
const shareLocationMapContainer = document.querySelector<HTMLDivElement>("#shareLocationMap")!;
const minimumOrderAmountInput = document.querySelector<HTMLInputElement>("#minimumOrderAmountInput")!;
const deliveryFeeInput = document.querySelector<HTMLInputElement>("#deliveryFeeInput")!;
const myOrderAmountInput = document.querySelector<HTMLInputElement>("#myOrderAmountInput")!;
const orderTitleInput = document.querySelector<HTMLInputElement>("#orderTitleInput")!;
const createRoomHint = document.querySelector<HTMLParagraphElement>("#createRoomHint")!;

const IS_DEMO_MODE = document.documentElement.classList.contains("demo-mode");
const TOKEN_KEY = "hanbateats.sessionToken";
const ROOM_REFRESH_INTERVAL_MS = 3_000;
const DEV_RELOAD_INTERVAL_MS = 1_000;
const DEFAULT_LOCATION = {
  lat: 36.3504,
  lng: 127.3004,
  label: "한밭대 주변",
};
const DEFAULT_RADIUS_METERS = 100;
const LOCATION_REFRESH_DISTANCE_METERS = 4;
const LOCATION_REFRESH_INTERVAL_MS = 5_000;
const LOCATION_STALE_MS = 3_000;
const TARGET_LOCATION_ACCURACY_METERS = 22;
const MAX_LOCATION_ACCURACY_METERS = 90;
const LOCATION_HARD_MAX_ACCURACY_METERS = 260;
const LOCATION_STALE_POSITION_MS = 30_000;
const LOCATION_SAMPLE_TIMEOUT_MS = IS_DEMO_MODE ? 10_000 : 13_000;
const FORCE_LOCATION_SAMPLE_TIMEOUT_MS = IS_DEMO_MODE ? 12_000 : 16_000;

const demoRooms: MapRoom[] = [];

const serverRoomPositions = [
  { distance: 35, x: 55, y: 44, latOffset: 0.00018, lngOffset: 0.00018 },
  { distance: 82, x: 46, y: 56, latOffset: -0.00032, lngOffset: -0.00014 },
  { distance: 118, x: 67, y: 47, latOffset: 0.00048, lngOffset: 0.00052 },
  { distance: 146, x: 34, y: 48, latOffset: 0.00072, lngOffset: -0.00058 },
  { distance: 210, x: 58, y: 68, latOffset: -0.00108, lngOffset: 0.00036 },
];

let serverRooms: MapRoom[] = [];
let nearbyRooms = [...demoRooms];
let myRooms: MapRoom[] = [];

let kakaoMap: kakao.maps.Map | undefined;
let kakaoCircle: kakao.maps.Circle | undefined;
let kakaoUserMarker: kakao.maps.CustomOverlay | undefined;
let kakaoRoomOverlays: kakao.maps.CustomOverlay[] = [];
let shareLocationMap: kakao.maps.Map | undefined;
let shareLocationMarker: kakao.maps.CustomOverlay | undefined;
let kakaoMapLoadPromise: Promise<void> | undefined;
let currentLocation: AppLocation = DEFAULT_LOCATION;
let currentRadiusMeters = DEFAULT_RADIUS_METERS;
let currentUser: User | null = null;
let selectedShareLocation: GeoPoint | null = null;
let selectedShareLocationLabel = "";
let selectedJoinRoom: MapRoom | null = null;
let activeRoomSection = "mine";
let activeDetailRoomId = 0;
let activeDetailRoom: ServerRoom | null = null;
let activeEditOrderRoomId = 0;
let activeMapRoomId = "";
let activePaymentConsentRoomId = 0;
let minimumReachedToastRoomIds: Set<number> = new Set();
let locationWatchId: number | null = null;
let isFollowingUserLocation = true;
let lastLocationRefreshAt = 0;
let didShowLocationWarning = false;

let currentPhone = "";
let currentChallengeId = "";
let currentSignupToken = "";
let pendingSignupNickname = "";
let pendingAccountToken = "";
let roomRefreshTimer = 0;
let roomListRequestSeq = 0;
let myRoomsRequestSeq = 0;
let isNotificationRefreshInFlight = false;
let isPaymentConsentSubmitting = false;
let isLocationRefreshInFlight = false;
let activeAppConfirmResolver: ((result: boolean) => void) | null = null;
let toastTimer = 0;
let toastHideTimer = 0;
let paymentRetryCountdownTimer = 0;
let isPaymentRetryReloadQueued = false;
let devReloadTimer = 0;
let devReloadVersion = "";

function updateChatKeyboardOffset() {
  let keyboardOffset = 0;

  if (window.visualViewport) {
    keyboardOffset = Math.max(
      0,
      window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop,
    );
  }

  document.documentElement.style.setProperty("--chat-keyboard-offset", `${Math.round(keyboardOffset)}px`);
}

function scrollChatToBottom() {
  if (!myRoomChatList) {
    return;
  }

  myRoomChatList.scrollTop = myRoomChatList.scrollHeight;
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

function formatPhone(value: string) {
  const phone = normalizePhone(value);

  if (phone.length <= 3) {
    return phone;
  }

  if (phone.length <= 7) {
    return `${phone.slice(0, 3)} ${phone.slice(3)}`;
  }

  return `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7)}`;
}

function isValidKoreanMobilePhone(value: string) {
  return /^010\d{8}$/.test(value);
}

async function api<T = unknown>(path: string, payload: object): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  // 프록시가 HTML 오류 페이지를 돌려주는 경우에도 JSON 파싱 오류가 화면에 나오지 않게 한다.
  const data = await response.json().catch(() => ({}));

  if (response.status === 401 && getSessionToken()) {
    // 세션이 만료되거나 취소되면 오래된 화면에 머무르지 않고 로그인으로 돌아간다.
    clearSessionState();
    showLogin();
    showToast("로그인이 만료되었습니다. 다시 로그인해 주세요.");
  }

  if (!response.ok) {
    throw new Error(data.message || "요청을 처리하지 못했습니다.");
  }

  return data;
}

function showToast(message: string, { duration = 4000 }: { duration?: number } = {}) {
  if (!appToast || !message) {
    return;
  }

  window.clearTimeout(toastTimer);
  window.clearTimeout(toastHideTimer);
  appToast.hidden = false;
  appToast.textContent = message;
  appToast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    appToast.classList.remove("is-visible");
    toastHideTimer = window.setTimeout(() => {
      appToast.hidden = true;
      appToast.textContent = "";
    }, 180);
  }, duration);
}

function closeAppConfirmDialog(result = false) {
  if (!appConfirmDialog) {
    return;
  }

  appConfirmDialog.classList.remove("is-visible", "is-alert");
  appConfirmDialog.setAttribute("aria-hidden", "true");
  appConfirmOkButton?.classList.remove("is-danger");

  if (activeAppConfirmResolver) {
    const resolve = activeAppConfirmResolver;
    activeAppConfirmResolver = null;
    resolve(result);
  }
}

function showAppConfirm({
  eyebrow = "확인",
  title = "진행할까요?",
  message = "",
  confirmText = "확인",
  cancelText = "취소",
  danger = false,
  alertOnly = false,
}: {
  eyebrow?: string;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  alertOnly?: boolean;
} = {}): Promise<boolean> {
  if (!appConfirmDialog) {
    return Promise.resolve(alertOnly);
  }

  if (activeAppConfirmResolver) {
    closeAppConfirmDialog(false);
  }

  if (appConfirmEyebrow) {
    appConfirmEyebrow.textContent = eyebrow;
  }
  if (appConfirmTitle) {
    appConfirmTitle.textContent = title;
  }
  if (appConfirmMessage) {
    appConfirmMessage.textContent = message;
  }
  if (appConfirmCancelButton) {
    appConfirmCancelButton.textContent = cancelText;
  }
  if (appConfirmOkButton) {
    appConfirmOkButton.textContent = confirmText;
    appConfirmOkButton.classList.toggle("is-danger", danger);
  }

  appConfirmDialog.classList.toggle("is-alert", alertOnly);
  appConfirmDialog.classList.add("is-visible");
  appConfirmDialog.setAttribute("aria-hidden", "false");

  return new Promise((resolve) => {
    activeAppConfirmResolver = resolve;
  });
}

function showAppAlert(message: string, { title = "알림", eyebrow = "알림" }: { title?: string; eyebrow?: string } = {}) {
  return showAppConfirm({
    eyebrow,
    title,
    message,
    confirmText: "확인",
    alertOnly: true,
  });
}

function isNotificationSupported() {
  return "Notification" in window;
}

function updateNotificationStatus() {
  if (!notificationStatus) {
    return;
  }

  if (!isNotificationSupported()) {
    notificationStatus.textContent = "미지원";
    return;
  }

  const labels = {
    granted: "켜짐",
    denied: "차단",
    default: "확인",
  };
  notificationStatus.textContent = labels[Notification.permission] || "확인";
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) {
    return null;
  }

  try {
    return await navigator.serviceWorker.register("./service-worker.js");
  } catch (error) {
    console.warn("Service worker registration failed.", error);
    return null;
  }
}

async function showDeviceNotification(title: string, body: string, { tag = "hanbat-eats" }: { tag?: string } = {}) {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }

  const options = {
    body,
    icon: "./assets/icon-192.png",
    badge: "./assets/icon-192.png",
    tag,
  };

  try {
    const registration = await navigator.serviceWorker?.getRegistration();

    if (registration?.showNotification) {
      await registration.showNotification(title, options);
      return true;
    }
  } catch {
    // Safari 일반 탭에서는 Service Worker 알림이 준비되지 않을 수 있다.
  }

  try {
    new Notification(title, options);
    return true;
  } catch (error) {
    console.warn("Notification display failed.", error);
    return false;
  }
}

async function requestNotificationPermission({ showSample = false }: { showSample?: boolean } = {}) {
  if (!isNotificationSupported()) {
    showToast("이 브라우저에서는 알림을 지원하지 않습니다.");
    updateNotificationStatus();
    return false;
  }

  if (!window.isSecureContext) {
    showToast("알림은 HTTPS 또는 홈 화면 앱에서만 사용할 수 있습니다.");
    updateNotificationStatus();
    return false;
  }

  await registerServiceWorker();

  let permission = Notification.permission;

  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  updateNotificationStatus();

  if (permission !== "granted") {
    showToast("알림 권한이 허용되지 않았습니다.");
    return false;
  }

  if (showSample) {
    await showDeviceNotification("Hanbat-eats", "알림 테스트가 도착했습니다.", {
      tag: "hanbat-eats-test",
    });
    showToast("알림 테스트를 보냈습니다.");
  }

  return true;
}

function setLoading(form: HTMLFormElement, isLoading: boolean) {
  const button = form.querySelector<HTMLButtonElement>("button[type='submit']");
  if (button) {
    button.disabled = isLoading;
  }
}

function showStep(step: HTMLFormElement) {
  [phoneForm, codeForm, signupForm, accountForm].forEach((form) => {
    form.classList.remove("is-active");
  });
  closeBankOptions();
  step.classList.add("is-active");
}

function closeBankOptions() {
  bankSelectButton?.setAttribute("aria-expanded", "false");
  bankOptionList?.parentElement?.classList.remove("is-open");
}

function openBankOptions() {
  bankSelectButton?.setAttribute("aria-expanded", "true");
  bankOptionList?.parentElement?.classList.add("is-open");
}

function updateBankSelection(bankName: string) {
  const value = bankName || "";

  if (bankInput) {
    bankInput.value = value;
  }
  if (bankSelectText) {
    bankSelectText.textContent = value || "은행 선택";
  }
  if (bankSelectButton) {
    bankSelectButton.classList.toggle("is-placeholder", !value);
  }

  bankOptionList?.querySelectorAll<HTMLElement>("[data-bank]").forEach((option) => {
    option.setAttribute("aria-selected", option.dataset.bank === value ? "true" : "false");
  });
}

function resetAccountForm() {
  accountForm?.reset();
  updateBankSelection("");
  closeBankOptions();
  if (accountHint) {
    accountHint.textContent = "";
  }
}

function normalizeAccountNumber(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 20);
}

function validateAccountForm() {
  const bankName = bankInput.value.trim();
  const accountNumber = normalizeAccountNumber(accountNumberInput.value);
  const accountHolder = accountHolderInput.value.trim();

  if (!bankName) {
    return "은행을 선택해 주세요.";
  }
  if (accountNumber.length < 6 || accountNumber.length > 20) {
    return "계좌번호는 숫자 6자 이상 20자 이하로 입력해 주세요.";
  }
  if (accountHolder.length < 2 || accountHolder.length > 20) {
    return "예금주는 2자 이상 20자 이하로 입력해 주세요.";
  }

  return "";
}

function getAccountPayload() {
  return {
    payoutBank: bankInput.value.trim(),
    payoutAccountNumber: normalizeAccountNumber(accountNumberInput.value),
    payoutAccountHolder: accountHolderInput.value.trim(),
  };
}

function showHome() {
  loginScreen.classList.remove("is-active");
  homeScreen.classList.add("is-active");
  pendingAccountToken = "";
  switchHomeTab("map");
  initHomeMap();
  startRoomRealtimeSync();
}

function showAccountRegistration(token: string, user: User) {
  stopRoomRealtimeSync();
  homeScreen.classList.remove("is-active");
  loginScreen.classList.add("is-active");
  pendingAccountToken = token || "";
  setCurrentUser(user || currentUser);
  resetAccountForm();
  if (backToNicknameButton) {
    backToNicknameButton.hidden = !currentSignupToken;
  }
  if (accountHint) {
    accountHint.textContent = "";
  }
  showStep(accountForm);
}

function showLogin() {
  homeScreen.classList.remove("is-active");
  loginScreen.classList.add("is-active");
  stopRoomRealtimeSync();
  stopLiveLocationTracking();
  closeCreateRoomSheet();
  closeJoinRoomSheet();
  closeRoomDetail();
  closePaymentConsentDialog();
  closeWalletChargeDialog();
  closeProfileEditDialog();
  currentSignupToken = "";
  pendingSignupNickname = "";
  pendingAccountToken = "";
  showStep(phoneForm);
  phoneInput.focus();
}

function saveSession(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function getSessionToken() {
  return window.localStorage.getItem(TOKEN_KEY) || "";
}

function parseAmount(value: string) {
  return Number(String(value || "").replace(/\D/g, "")) || 0;
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPlatformLabel(platform: string) {
  const labels: Record<string, string> = {
    baemin: "배달의민족",
    yogiyo: "요기요",
    coupang: "쿠팡이츠",
    other: "기타",
  };

  return labels[platform] || "배달앱";
}

function getDeliveryFeeLabel(amount: number) {
  return amount > 0 ? formatCompactWon(amount) : "무료";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isValidCoordinate(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng);
}

function getDistanceMeters(from: GeoPoint, to: GeoPoint) {
  const earthRadiusMeters = 6_371_000;
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const deltaLat = toRadians(to.lat - from.lat);
  const deltaLng = toRadians(to.lng - from.lng);
  const halfChord =
    Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

  return Math.round(
    earthRadiusMeters * 2 * Math.atan2(Math.sqrt(halfChord), Math.sqrt(1 - halfChord)),
  );
}

function getFallbackMapPoint(lat: number, lng: number) {
  const latOffset = lat - currentLocation.lat;
  const lngOffset = lng - currentLocation.lng;

  return {
    x: clamp(50 + lngOffset * 28_000, 12, 88),
    y: clamp(50 - latOffset * 28_000, 12, 88),
  };
}

function mapServerRoom(room: ServerRoom, index: number): MapRoom {
  const position = serverRoomPositions[index % serverRoomPositions.length];
  const lat = Number(room.lat);
  const lng = Number(room.lng);
  const hasCoordinates = isValidCoordinate(lat, lng);
  const fallbackPoint = hasCoordinates ? getFallbackMapPoint(lat, lng) : position;

  return {
    id: `server-${room.id}`,
    serverId: room.id,
    ownerUserId: room.ownerUserId,
    storeName: room.storeName,
    shareLocation: room.shareLocation,
    platform: room.platform,
    minimumOrderAmount: room.minimumOrderAmount,
    currentOrderAmount: room.currentOrderAmount,
    deliveryFee: room.deliveryFee,
    orderCount: Number(room.orderCount) || 0,
    orders: Array.isArray(room.orders) ? room.orders : [],
    myRole: room.myRole || "",
    isPaymentConsentPending: Boolean(room.isPaymentConsentPending),
    paymentConsentRequestedAt: room.paymentConsentRequestedAt || null,
    paymentConsentRejectedAt: room.paymentConsentRejectedAt || null,
    paymentConsentRetryAfter: room.paymentConsentRetryAfter || null,
    isPaymentRequested: Boolean(room.isPaymentRequested),
    paymentRequestedAt: room.paymentRequestedAt || null,
    isOrdered: Boolean(room.isOrdered),
    orderedAt: room.orderedAt || null,
    isSettled: Boolean(room.isSettled),
    settledAt: room.settledAt || null,
    lat: hasCoordinates ? lat : null,
    lng: hasCoordinates ? lng : null,
    distance: hasCoordinates ? getDistanceMeters(currentLocation, { lat, lng }) : position.distance,
    x: fallbackPoint.x,
    y: fallbackPoint.y,
    latOffset: hasCoordinates ? lat - currentLocation.lat : position.latOffset,
    lngOffset: hasCoordinates ? lng - currentLocation.lng : position.lngOffset,
    status: room.status,
  };
}

async function loadRooms({ resetMap = false }: { resetMap?: boolean } = {}) {
  const token = getSessionToken();
  const requestSeq = ++roomListRequestSeq;

  if (!token) {
    serverRooms = [];
    nearbyRooms = [...demoRooms];
    refreshRadiusView({ resetMap });
    return;
  }

  try {
    const data = await api<RoomsResponse>("/api/rooms/list", { token });
    // 더 나중에 보낸 요청이 있거나 그사이 로그아웃했으면 이 응답은 버린다.
    if (requestSeq !== roomListRequestSeq || getSessionToken() !== token) {
      return;
    }
    serverRooms = (data.rooms || []).map(mapServerRoom);
    nearbyRooms = [...serverRooms, ...demoRooms];
    refreshRadiusView({ resetMap });
  } catch (error) {
    console.warn("Room list load failed.", error);
  }
}

async function loadMyRooms() {
  const token = getSessionToken();
  const requestSeq = ++myRoomsRequestSeq;

  if (!token) {
    myRooms = [];
    renderMyRoomList();
    renderChatRoomList();
    maybeShowPaymentConsentDialog();
    return;
  }

  try {
    const data = await api<RoomsResponse>("/api/rooms/mine", { token });
    if (requestSeq !== myRoomsRequestSeq || getSessionToken() !== token) {
      return;
    }
    const previousMyRooms = myRooms;
    myRooms = (data.rooms || []).map(mapServerRoom);
    renderMyRoomList();
    renderChatRoomList();
    showMinimumReachedRoomToast(previousMyRooms, myRooms);
    maybeShowPaymentConsentDialog();

    if (activeDetailRoomId) {
      const hasActiveRoom = myRooms.some((room) => Number(room.serverId) === Number(activeDetailRoomId));

      if (hasActiveRoom) {
        await loadRoomDetail(activeDetailRoomId);
      } else {
        closeRoomDetail();
      }
    }
  } catch (error) {
    console.warn("My room list load failed.", error);
  }
}

async function loadNotifications() {
  const token = getSessionToken();

  if (!token || isNotificationRefreshInFlight) {
    return;
  }

  isNotificationRefreshInFlight = true;

  try {
    const data = await api<NotificationsResponse>("/api/notifications/list", { token });
    if (getSessionToken() !== token) {
      return;
    }
    const notifications = data.notifications || [];

    if (notifications.length > 0) {
      const message = notifications.map((notification) => notification.message).join("\n");
      showToast(message, { duration: 4000 });
      showDeviceNotification("Hanbat-eats", notifications[0].message, {
        tag: `hanbat-eats-notification-${notifications[0].id}`,
      });
    }
  } catch (error) {
    console.warn("Notification load failed.", error);
  } finally {
    isNotificationRefreshInFlight = false;
  }
}

function startRoomRealtimeSync() {
  stopRoomRealtimeSync();
  syncRoomsWithCurrentLocation({
    forceLocation: true,
    resetMap: false,
    showLocationError: false,
  });

  roomRefreshTimer = window.setInterval(() => {
    if (document.hidden || !homeScreen.classList.contains("is-active")) {
      return;
    }

    syncRoomsWithCurrentLocation({
      resetMap: false,
      showLocationError: false,
    });
  }, ROOM_REFRESH_INTERVAL_MS);
}

function stopRoomRealtimeSync() {
  if (!roomRefreshTimer) {
    return;
  }

  window.clearInterval(roomRefreshTimer);
  roomRefreshTimer = 0;
}

function renderSettingsProfile() {
  const nickname = currentUser?.nickname || "Hanbat-eats";
  const phoneNumber = currentUser?.phoneNumber
    ? formatPhone(currentUser.phoneNumber)
    : "휴대폰 번호 없음";
  const payoutAccount = currentUser?.payoutAccount;

  if (settingsProfileInitial) {
    settingsProfileInitial.textContent = "";
  }

  if (settingsNickname) {
    settingsNickname.textContent = nickname;
  }

  if (settingsPhone) {
    settingsPhone.textContent = phoneNumber;
  }

  if (settingsStrawberryBalance) {
    const balance = Number(currentUser?.strawberryBalance) || 0;
    settingsStrawberryBalance.textContent = `${balance.toLocaleString("ko-KR")}원`;
  }

  if (settingsPayoutAccount) {
    settingsPayoutAccount.textContent = payoutAccount
      ? `${payoutAccount.bankName} ${payoutAccount.maskedAccountNumber}`
      : "등록 필요";
  }
}

function setCurrentUser(user: User | null) {
  currentUser = user || null;
  renderSettingsProfile();
}

function getVisibleRooms() {
  return nearbyRooms.filter((room) => room.distance <= currentRadiusMeters);
}

function getRoomMeta(room: MapRoom) {
  const remainingAmount = getRemainingAmount(room);
  const amountLabel = remainingAmount === 0 ? "충족" : `+${formatCompactWon(remainingAmount)}`;

  return `${amountLabel} · ${room.distance}m`;
}

function getRemainingAmount(room: RoomBase) {
  return Math.max(room.minimumOrderAmount - room.currentOrderAmount, 0);
}

function formatCompactWon(amount: number) {
  if (amount >= 10000) {
    const value = amount / 10000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}만원`;
  }

  return `${amount.toLocaleString("ko-KR")}원`;
}

function formatWon(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

function getOrderProgress(room: RoomBase) {
  return Math.min(Math.round((room.currentOrderAmount / room.minimumOrderAmount) * 100), 100);
}

function getRoomStatusClass(room: RoomBase) {
  if (room.isOrdered) {
    return "is-ordered";
  }

  if (room.isPaymentRequested) {
    return areParticipantsPaid(room) ? "is-paid" : "is-payment";
  }

  if (room.isPaymentConsentPending) {
    return "is-payment";
  }

  if (room.status === "closed") {
    return "is-closed";
  }

  return room.status === "closing" ? "is-closing" : "is-open";
}

function getRoomStatusLabel(room: RoomBase) {
  if (room.isOrdered) {
    return "주문 완료";
  }

  if (room.isPaymentRequested) {
    return areParticipantsPaid(room) ? "결제 완료" : "결제 중";
  }

  if (room.isPaymentConsentPending) {
    return "확인 중";
  }

  if (getRemainingAmount(room) === 0 && getPaymentConsentRetryRemaining(room) > 0) {
    return "재요청 대기";
  }

  if (room.status === "closed") {
    return "마감";
  }

  return room.status === "closing" ? "마감 임박" : "모집 중";
}

function isRoomOwner(room: RoomBase) {
  return Number(room.ownerUserId) === Number(currentUser?.id) || room.myRole === "owner";
}

function getParticipantOrders(room: RoomBase) {
  return (room.orders || []).filter((order) => Number(order.userId) !== Number(room.ownerUserId));
}

function getMyRoomOrder(room: RoomBase) {
  return (room.orders || []).find((order) => Number(order.userId) === Number(currentUser?.id));
}

function canEditMyOrder(room: RoomBase | null) {
  return Boolean(
    room
    && getMyRoomOrder(room)
    && !room.isPaymentRequested
    && !room.isPaymentConsentPending
    && !room.isOrdered
    && !room.isSettled
  );
}

function getEditOrderButtonMarkup(room: MapRoom) {
  return canEditMyOrder(room)
    ? `<button class="edit-order-chip" type="button" data-edit-order-room-id="${room.serverId}">메뉴변경</button>`
    : "";
}

function getDeliveryShare(room: RoomBase) {
  const count = Math.max(room.orderCount || 0, (room.orders || []).length, 1);
  return Math.ceil((room.deliveryFee || 0) / count);
}

function getOrderPaymentAmount(room: RoomBase, order: Order | undefined) {
  return (order?.orderAmount || 0) + getDeliveryShare(room);
}

function areParticipantsPaid(room: RoomBase) {
  const participantOrders = getParticipantOrders(room);
  return participantOrders.length === 0 || participantOrders.every((order) => order.isPaid);
}

function getNowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function getPaymentConsentRetryRemaining(room: RoomBase) {
  const retryAfter = Number(room.paymentConsentRetryAfter) || 0;
  return Math.max(retryAfter - getNowSeconds(), 0);
}

function updatePaymentRetryCountdowns() {
  const buttons = [...document.querySelectorAll<HTMLElement>("[data-payment-retry-after]")];

  if (!buttons.length) {
    return;
  }

  const now = getNowSeconds();
  let shouldReload = false;

  buttons.forEach((button) => {
    const retryAfter = Number(button.dataset.paymentRetryAfter) || 0;
    const remaining = Math.max(retryAfter - now, 0);

    if (remaining > 0) {
      button.textContent = `${remaining}초 대기`;
      return;
    }

    button.textContent = "확인 중";
    shouldReload = true;
  });

  if (!shouldReload || isPaymentRetryReloadQueued) {
    return;
  }

  isPaymentRetryReloadQueued = true;
  Promise.all([
    loadMyRooms(),
    activeDetailRoomId ? loadRoomDetail(activeDetailRoomId) : Promise.resolve(),
  ]).catch(() => {
    // 다음 방 목록 주기 갱신에서 다시 맞춰진다.
  }).finally(() => {
    isPaymentRetryReloadQueued = false;
  });
}

function startPaymentRetryCountdownTimer() {
  if (paymentRetryCountdownTimer) {
    return;
  }

  updatePaymentRetryCountdowns();
  paymentRetryCountdownTimer = window.setInterval(updatePaymentRetryCountdowns, 1_000);
}

function hasMyPaymentConsentResponse(room: RoomBase) {
  const myOrder = getMyRoomOrder(room);
  return Boolean(myOrder?.paymentConsentStatus);
}

function getPendingPaymentConsentRoom() {
  return myRooms.find((room) => (
    room.myRole === "participant"
    && room.isPaymentConsentPending
    && !room.isPaymentRequested
    && !hasMyPaymentConsentResponse(room)
  ));
}

function showMinimumReachedRoomToast(previousRooms: MapRoom[], nextRooms: MapRoom[]) {
  const previousById = new Map<number, MapRoom>(
    (previousRooms || []).map((room) => [Number(room.serverId), room]),
  );

  const reachedRoom = (nextRooms || []).find((room) => {
    const roomId = Number(room.serverId) || 0;
    const previousRoom = previousById.get(roomId);
    const wasNotReached = previousRoom ? getRemainingAmount(previousRoom) > 0 : true;

    return (
      roomId > 0
      && isRoomOwner(room)
      && !minimumReachedToastRoomIds.has(roomId)
      && !room.isPaymentRequested
      && !room.isPaymentConsentPending
      && !room.isOrdered
      && getRemainingAmount(room) === 0
      && wasNotReached
    );
  });

  if (!reachedRoom) {
    return;
  }

  const roomId = Number(reachedRoom.serverId);
  minimumReachedToastRoomIds.add(roomId);
  showToast(`${reachedRoom.storeName} 최소주문금액 달성\n결제 요청을 보내 주세요.`, {
    duration: 4000,
  });
}

function getPublicRoomCardMarkup(room: MapRoom, { isMapPopup = false }: { isMapPopup?: boolean } = {}) {
  return `
    <article class="room-card compact-room-card ${isMapPopup ? "map-room-card" : ""}">
      ${isMapPopup ? '<button class="map-room-close-button" type="button" aria-label="닫기">×</button>' : ""}
      <div class="room-topline">
        <span class="platform ${getRoomStatusClass(room)}">${getRoomStatusLabel(room)}</span>
        <span class="status status-open">${room.distance}m</span>
      </div>
      <h3>${escapeHtml(room.storeName)}</h3>
      <p>${getPlatformLabel(room.platform)} · 배달료 ${getDeliveryFeeLabel(room.deliveryFee)}</p>
      <div class="room-location-line">
        <span>나눌 위치</span>
        <strong>${escapeHtml(room.shareLocation || "위치 설명 없음")}</strong>
      </div>
      <div class="order-summary">
        <div>
          <span>최소 주문까지</span>
          <strong>${formatCompactWon(getRemainingAmount(room))}</strong>
        </div>
      </div>
      <div class="order-progress" aria-label="최소 주문 금액 진행률">
        <span style="width: ${getOrderProgress(room)}%"></span>
      </div>
      <div class="order-progress-label">
        <span>${formatWon(room.currentOrderAmount)}</span>
        <span>${formatWon(room.minimumOrderAmount)}</span>
      </div>
      <div class="room-footer">
        <button class="join-room-button" type="button" data-join-room-id="${escapeHtml(room.id)}">입장</button>
      </div>
    </article>
  `;
}

function getRoomRoleLabel(room: RoomBase) {
  return room.myRole === "owner" ? "방장" : "참여";
}

function getOrderDisplayName(order: Order) {
  return order.nickname || "이름 없음";
}

function renderRoomOrderRows(room: RoomBase, orders: Order[]) {
  if (!orders.length) {
    return '<p class="empty-state compact-empty">아직 주문 메뉴가 없습니다.</p>';
  }

  return orders.map((order) => `
    <div class="my-room-card-order">
      <div>
        <strong>${escapeHtml(getOrderDisplayName(order))}</strong>
        <span>${escapeHtml(order.orderTitle || "메뉴 없음")}</span>
      </div>
      <div class="order-price-stack">
        <b>${formatWon(order.orderAmount || 0)}</b>
      </div>
    </div>
  `).join("");
}

function renderMyRoomOrderSummary(room: RoomBase) {
  const remainingAmount = getRemainingAmount(room);
  const orderRows = `
    <div class="my-room-card-orders">
      ${renderRoomOrderRows(room, room.orders || [])}
    </div>
  `;

  if (remainingAmount === 0) {
    const myOrder = getMyRoomOrder(room);
    const paymentNote = room.isPaymentRequested && !isRoomOwner(room) && myOrder
      ? `<div class="payment-due-summary">내 결제금액 ${formatWon(getOrderPaymentAmount(room, myOrder))}</div>`
      : "";
    const summaryText = room.isOrdered
      ? "방장이 배달주문을 완료했어요"
      : room.isPaymentRequested
        ? (areParticipantsPaid(room) ? "참여자 결제가 모두 완료되었습니다" : "참여자 결제 진행 중")
        : "최소주문금액 달성";

    return `
      <div class="minimum-met-summary">${summaryText}</div>
      ${paymentNote}
      ${orderRows}
    `;
  }

  return `
    <div class="order-summary">
      <div>
        <span>최소 주문까지</span>
        <strong>${formatCompactWon(remainingAmount)}</strong>
      </div>
    </div>
    <div class="order-progress" aria-label="최소 주문 금액 진행률">
      <span style="width: ${getOrderProgress(room)}%"></span>
    </div>
    <div class="order-progress-label">
      <span>${formatWon(room.currentOrderAmount)}</span>
      <span>${formatWon(room.minimumOrderAmount)}</span>
    </div>
    ${orderRows}
  `;
}

function renderMyRoomActions(room: RoomBase, { showChat = true }: { showChat?: boolean } = {}) {
  const remainingAmount = getRemainingAmount(room);
  const chatButton = showChat
    ? `<button class="open-my-room-button" type="button" data-my-room-id="${room.serverId}">채팅</button>`
    : "";

  if (isRoomOwner(room)) {
    let actionMarkup = "";
    const retryRemaining = getPaymentConsentRetryRemaining(room);
    const canCancel = !room.isPaymentRequested && !room.isOrdered;
    const cancelButton = canCancel
      ? `<button class="cancel-room-button" type="button" data-cancel-room-id="${room.serverId}">방 삭제</button>`
      : "";

    if (room.isOrdered) {
      actionMarkup = '<button class="order-complete-button" type="button" disabled>주문 완료됨</button>';
    } else if (room.isPaymentRequested && areParticipantsPaid(room)) {
      actionMarkup = `<button class="order-complete-button" type="button" data-order-complete-room-id="${room.serverId}">주문완료 표시</button>`;
    } else if (room.isPaymentRequested) {
      actionMarkup = '<button class="payment-wait-button" type="button" disabled>결제 대기</button>';
    } else if (room.isPaymentConsentPending) {
      actionMarkup = '<button class="payment-wait-button" type="button" disabled>응답 대기</button>';
    } else if (remainingAmount === 0 && retryRemaining > 0) {
      actionMarkup = `<button class="payment-wait-button" type="button" disabled data-payment-retry-after="${Number(room.paymentConsentRetryAfter) || 0}">${retryRemaining}초 대기</button>`;
    } else if (remainingAmount === 0) {
      actionMarkup = `<button class="payment-request-button" type="button" data-payment-request-room-id="${room.serverId}">결제 요청</button>`;
    }

    const visibleActionCount = [chatButton, actionMarkup, cancelButton].filter(Boolean).length;
    const actionClass = visibleActionCount >= 3
      ? "has-three"
      : visibleActionCount === 2
        ? "has-complete"
        : "single-action";

    return `
      <div class="my-room-actions ${actionClass}">
        ${chatButton}
        ${actionMarkup}
        ${cancelButton}
      </div>
    `;
  }

  const actionClass = showChat ? "has-complete" : "single-action";
  const myOrder = getMyRoomOrder(room);
  let actionMarkup = `<button class="leave-room-button" type="button" data-leave-room-id="${room.serverId}">방나가기</button>`;

  if (room.isPaymentConsentPending && !hasMyPaymentConsentResponse(room)) {
    actionMarkup = `<button class="payment-request-button" type="button" data-open-payment-consent-room-id="${room.serverId}">결제 확인</button>`;
  } else if (room.isOrdered && myOrder?.isReceived) {
    actionMarkup = '<button class="receive-room-button" type="button" disabled>받기 완료됨</button>';
  } else if (room.isOrdered) {
    actionMarkup = `<button class="receive-room-button" type="button" data-receive-room-id="${room.serverId}">받기 완료</button>`;
  } else if (room.isPaymentRequested && myOrder?.isPaid) {
    actionMarkup = '<button class="pay-room-button" type="button" disabled>결제 완료</button>';
  } else if (room.isPaymentRequested) {
    actionMarkup = `<button class="pay-room-button" type="button" data-pay-room-id="${room.serverId}">결제하기</button>`;
  }

  return `
    <div class="my-room-actions ${actionClass}">
      ${chatButton}
      ${actionMarkup}
    </div>
  `;
}

function isMyChatMessage(message: RoomMessage) {
  return Number(message.userId) === Number(currentUser?.id);
}

function renderChatMessage(message: RoomMessage) {
  if (message.type === "system") {
    return `
      <div class="chat-system-message">
        ${escapeHtml(message.message)}
      </div>
    `;
  }

  const isMine = isMyChatMessage(message);
  const senderLabel = isMine ? "나" : message.nickname;

  return `
    <div class="chat-message ${isMine ? "is-mine" : "is-other"}">
      <strong>${escapeHtml(senderLabel)}</strong>
      <p>${escapeHtml(message.message)}</p>
    </div>
  `;
}

function getKakaoLevelForRadius() {
  if (currentRadiusMeters >= 300) {
    return 4;
  }

  if (currentRadiusMeters >= 200) {
    return 3;
  }

  return 2;
}

function renderRoomPins() {
  if (!mapRoomsLayer) {
    return;
  }

  const visibleRooms = getVisibleRooms();
  mapRoomsLayer.innerHTML = "";

  visibleRooms.forEach((room) => {
    const pin = document.createElement("button");
    pin.className = `room-pin ${getRoomStatusClass(room)}`;
    pin.type = "button";
    pin.dataset.mapRoomId = room.id;
    pin.style.left = `${room.x}%`;
    pin.style.top = `${room.y}%`;
    pin.innerHTML = `<strong>${escapeHtml(room.storeName)}</strong><span>${getRoomMeta(room)}</span>`;
    mapRoomsLayer.appendChild(pin);
  });
}

function closeMapRoomPopup() {
  activeMapRoomId = "";
  if (mapRoomPopup) {
    mapRoomPopup.innerHTML = "";
    mapRoomPopup.classList.remove("is-visible");
  }
}

function renderMapRoomPopup() {
  if (!mapRoomPopup || !activeMapRoomId) {
    return;
  }

  const room = getVisibleRooms().find((item) => item.id === activeMapRoomId);

  if (!room) {
    closeMapRoomPopup();
    return;
  }

  mapRoomPopup.innerHTML = getPublicRoomCardMarkup(room, { isMapPopup: true });
  mapRoomPopup.classList.add("is-visible");
}

function openMapRoomPopup(roomId: string) {
  activeMapRoomId = roomId;
  renderMapRoomPopup();
}

function renderRoomList() {
  if (!roomList) {
    return;
  }

  const visibleRooms = getVisibleRooms();
  roomList.innerHTML = "";

  if (visibleRooms.length === 0) {
    roomList.innerHTML = '<p class="empty-state">선택한 반경 안에 열린 방이 없습니다.</p>';
    return;
  }

  visibleRooms.forEach((room) => {
    roomList.insertAdjacentHTML("beforeend", getPublicRoomCardMarkup(room));
  });
}

function renderMyRoomList() {
  if (!myRoomList) {
    return;
  }

  myRoomList.innerHTML = "";

  if (myRooms.length === 0) {
    myRoomList.innerHTML = '<p class="empty-state">아직 참여한 방이 없어요.</p>';
    return;
  }

  myRooms.forEach((room) => {
    const card = document.createElement("article");
    card.className = "room-card compact-room-card my-room-card";
    card.innerHTML = `
      <div class="room-topline">
        <span class="platform ${getRoomStatusClass(room)}">${getRoomStatusLabel(room)}</span>
        <div class="room-topline-actions">
          ${getEditOrderButtonMarkup(room)}
          <span class="status status-open">${Math.max(room.orderCount || 0, 1)}명</span>
        </div>
      </div>
      <h3>${escapeHtml(room.storeName)}</h3>
      <p>${getPlatformLabel(room.platform)} · ${getRoomRoleLabel(room)} · 배달료 ${getDeliveryFeeLabel(room.deliveryFee)}</p>
      <div class="room-location-line">
        <span>나눌 위치</span>
        <strong>${escapeHtml(room.shareLocation || "위치 설명 없음")}</strong>
      </div>
      ${renderMyRoomOrderSummary(room)}
      <div class="room-footer">
        ${renderMyRoomActions(room)}
      </div>
    `;
    myRoomList.appendChild(card);
  });
}

function renderChatRoomList() {
  if (!chatRoomList) {
    return;
  }

  chatRoomList.innerHTML = "";

  if (myRooms.length === 0) {
    chatRoomList.innerHTML = '<p class="empty-state">아직 참여 중인 채팅방이 없어요.</p>';
    return;
  }

  myRooms.forEach((room) => {
    const item = document.createElement("button");
    item.className = "chat-room-card";
    item.type = "button";
    item.dataset.chatRoomId = room.serverId as unknown as string; // DOMStringMap stringifies the number
    item.innerHTML = `
      <span>${escapeHtml(room.storeName)}</span>
      <strong aria-hidden="true">›</strong>
    `;
    chatRoomList.appendChild(item);
  });
}

function getKakaoKey() {
  return window.HANBAT_EATS_CONFIG?.KAKAO_JAVASCRIPT_KEY?.trim() || "";
}

function loadKakaoMapsSdk(): Promise<void> {
  const appKey = getKakaoKey();

  if (!appKey) {
    return Promise.reject(new Error("Kakao JavaScript key is empty."));
  }

  if (kakaoMapLoadPromise) {
    return kakaoMapLoadPromise;
  }

  if (window.kakao?.maps?.LatLng) {
    return Promise.resolve();
  }

  kakaoMapLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const fail = (message: string) => {
      kakaoMapLoadPromise = undefined;
      script.remove();
      reject(new Error(message));
    };
    const timeoutId = window.setTimeout(() => {
      fail("Kakao Maps SDK 로딩 시간이 초과되었습니다.");
    }, 7_000);
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        window.clearTimeout(timeoutId);
        resolve();
      });
    };
    script.onerror = () => {
      window.clearTimeout(timeoutId);
      fail("Kakao Maps SDK를 불러오지 못했습니다.");
    };
    document.head.appendChild(script);
  });

  return kakaoMapLoadPromise;
}

function buildLocationFromPosition(position: GeolocationPosition): AppLocation {
  const timestamp = position.timestamp || Date.now();

  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: Math.round(position.coords.accuracy || 0),
    timestamp,
    ageMs: Math.max(0, Date.now() - timestamp),
    label: "내 위치",
  };
}

function getLocationAccuracy(location: AppLocation) {
  const accuracy = Number(location?.accuracy);
  return Number.isFinite(accuracy) && accuracy > 0 ? accuracy : Number.POSITIVE_INFINITY;
}

function pickMoreAccurateLocation(currentBest: AppLocation | null, candidate: AppLocation | null) {
  if (!candidate) {
    return currentBest;
  }

  if (!currentBest) {
    return candidate;
  }

  const currentAccuracy = getLocationAccuracy(currentBest);
  const candidateAccuracy = getLocationAccuracy(candidate);
  const isNewerCandidate = Number(candidate.timestamp) > Number(currentBest.timestamp) + 1_500;
  const movedMeters = getDistanceMeters(currentBest, candidate);
  const acceptableNewerAccuracy = IS_DEMO_MODE
    ? Math.max(currentAccuracy * 4, MAX_LOCATION_ACCURACY_METERS * 3)
    : Math.max(currentAccuracy * 2, MAX_LOCATION_ACCURACY_METERS);

  if (isNewerCandidate && movedMeters >= LOCATION_REFRESH_DISTANCE_METERS && candidateAccuracy <= acceptableNewerAccuracy) {
    return candidate;
  }

  return candidateAccuracy < currentAccuracy ? candidate : currentBest;
}

function getLocationErrorMessage(error?: LocationErrorLike | null) {
  const isLocalHttp = location.protocol === "http:" && !["localhost", "127.0.0.1"].includes(location.hostname);

  if (isLocalHttp && !window.isSecureContext) {
    return "휴대폰 브라우저에서 위치 권한이 막혀 있으면 기본 위치로 표시됩니다.";
  }

  if (error?.code === 1) {
    return "위치 권한이 꺼져 있어 기본 위치로 표시됩니다.";
  }

  if (error?.code === 2) {
    return "현재 위치를 잡지 못해 기본 위치로 표시됩니다.";
  }

  return "위치 확인이 늦어져 기본 위치로 표시됩니다.";
}

function handleLocationError(error?: LocationErrorLike | null) {
  if (didShowLocationWarning) {
    return;
  }

  didShowLocationWarning = true;
  showToast(getLocationErrorMessage(error));
}

function getCurrentLocation({
  showError = false,
  fallbackToDefault = true,
  targetAccuracy = TARGET_LOCATION_ACCURACY_METERS,
  sampleTimeoutMs = LOCATION_SAMPLE_TIMEOUT_MS,
}: {
  showError?: boolean;
  fallbackToDefault?: boolean;
  targetAccuracy?: number;
  sampleTimeoutMs?: number;
} = {}): Promise<AppLocation | null> {
  if (!navigator.geolocation) {
    if (showError) {
      handleLocationError();
    }
    return Promise.resolve(fallbackToDefault ? DEFAULT_LOCATION : null);
  }

  return new Promise((resolve) => {
    let bestLocation: AppLocation | null = null;
    let watchId: number | null = null;
    let didResolve = false;
    let timeoutId = 0;

    const finish = (location: AppLocation | null, error: LocationErrorLike | null) => {
      if (didResolve) {
        return;
      }

      didResolve = true;
      window.clearTimeout(timeoutId);

      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }

      if (location) {
        didShowLocationWarning = false;
        resolve(location);
        return;
      }

      if (showError) {
        handleLocationError(error);
      }
      resolve(fallbackToDefault ? DEFAULT_LOCATION : null);
    };

    timeoutId = window.setTimeout(() => {
      finish(bestLocation, null);
    }, sampleTimeoutMs);

    try {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = buildLocationFromPosition(position);
          bestLocation = pickMoreAccurateLocation(bestLocation, location);

          if (getLocationAccuracy(location) <= targetAccuracy) {
            finish(location, null);
          }
        },
        (error) => {
          finish(bestLocation, error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Math.max(sampleTimeoutMs, 8_000),
        },
      );
    } catch (error) {
      finish(bestLocation, error as LocationErrorLike);
    }
  });
}

function refreshServerRoomDistances() {
  serverRooms = serverRooms.map((room, index) => {
    const position = serverRoomPositions[index % serverRoomPositions.length];
    const lat = Number(room.lat);
    const lng = Number(room.lng);
    const hasCoordinates = isValidCoordinate(lat, lng);
    const fallbackPoint = hasCoordinates ? getFallbackMapPoint(lat, lng) : position;

    return {
      ...room,
      distance: hasCoordinates ? getDistanceMeters(currentLocation, { lat, lng }) : position.distance,
      x: fallbackPoint.x,
      y: fallbackPoint.y,
      latOffset: hasCoordinates ? lat - currentLocation.lat : position.latOffset,
      lngOffset: hasCoordinates ? lng - currentLocation.lng : position.lngOffset,
    };
  });
  nearbyRooms = [...serverRooms, ...demoRooms];
}

function applyCurrentLocation(location: AppLocation | null, { recenterMap = false, reloadRooms = false }: { recenterMap?: boolean; reloadRooms?: boolean } = {}) {
  if (!location || !isValidCoordinate(Number(location.lat), Number(location.lng))) {
    return;
  }

  currentLocation = {
    ...location,
    label: location.label || "내 위치",
  };

  refreshServerRoomDistances();
  refreshRadiusView({ resetMap: false });

  if (window.kakao?.maps && kakaoMap) {
    renderKakaoMap(currentLocation, { recenter: recenterMap, updateLevel: false });
  }

  if (reloadRooms) {
    loadRooms({ resetMap: false });
  }
}

async function refreshCurrentLocation({
  force = false,
  recenterMap = false,
  showError = false,
}: { force?: boolean; recenterMap?: boolean; showError?: boolean } = {}) {
  if (isLocationRefreshInFlight) {
    return;
  }

  if (!force && Date.now() - lastLocationRefreshAt < LOCATION_STALE_MS) {
    return;
  }

  isLocationRefreshInFlight = true;

  try {
    const location = await getCurrentLocation({
      showError,
      fallbackToDefault: false,
    });

    if (!location) {
      return;
    }

    lastLocationRefreshAt = Date.now();
    applyCurrentLocation(location, {
      recenterMap: recenterMap && isFollowingUserLocation,
      reloadRooms: false,
    });
  } finally {
    isLocationRefreshInFlight = false;
  }
}

async function syncRoomsWithCurrentLocation({
  forceLocation = false,
  resetMap = false,
  showLocationError = false,
}: { forceLocation?: boolean; resetMap?: boolean; showLocationError?: boolean } = {}) {
  await refreshCurrentLocation({
    force: forceLocation,
    recenterMap: isFollowingUserLocation,
    showError: showLocationError,
  });
  await loadRooms({ resetMap });
  await loadMyRooms();
  loadNotifications();
}

function shouldApplyLocationUpdate(location: AppLocation) {
  if (!location || !isValidCoordinate(Number(location.lat), Number(location.lng))) {
    return false;
  }

  if (!IS_DEMO_MODE && Number(location.ageMs || 0) > LOCATION_STALE_POSITION_MS) {
    return false;
  }

  const movedMeters = getDistanceMeters(currentLocation, location);
  const elapsedMs = Date.now() - lastLocationRefreshAt;
  const currentAccuracy = getLocationAccuracy(currentLocation);
  const nextAccuracy = getLocationAccuracy(location);

  if (!Number.isFinite(currentAccuracy)) {
    return true;
  }

  if (!IS_DEMO_MODE && nextAccuracy > LOCATION_HARD_MAX_ACCURACY_METERS) {
    return false;
  }

  if (
    !IS_DEMO_MODE &&
    nextAccuracy > MAX_LOCATION_ACCURACY_METERS &&
    currentAccuracy <= MAX_LOCATION_ACCURACY_METERS &&
    elapsedMs < LOCATION_REFRESH_INTERVAL_MS * 3
  ) {
    return false;
  }

  if (nextAccuracy + 5 < currentAccuracy) {
    return true;
  }

  if (nextAccuracy <= TARGET_LOCATION_ACCURACY_METERS && (movedMeters >= 2 || elapsedMs >= 1_500)) {
    return true;
  }

  return movedMeters >= LOCATION_REFRESH_DISTANCE_METERS || elapsedMs >= LOCATION_REFRESH_INTERVAL_MS;
}

function startLiveLocationTracking() {
  if (locationWatchId !== null || !navigator.geolocation) {
    return;
  }

  try {
    locationWatchId = navigator.geolocation.watchPosition(
      (position) => {
        didShowLocationWarning = false;
        const location = buildLocationFromPosition(position);

        if (!shouldApplyLocationUpdate(location)) {
          return;
        }

        lastLocationRefreshAt = Date.now();
        applyCurrentLocation(location, {
          recenterMap: isFollowingUserLocation,
          reloadRooms: true,
        });
      },
      (error) => {
        handleLocationError(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 20_000,
      },
    );
  } catch (error) {
    handleLocationError(error as LocationErrorLike);
  }
}

function stopLiveLocationTracking() {
  if (locationWatchId === null || !navigator.geolocation) {
    locationWatchId = null;
    return;
  }

  navigator.geolocation.clearWatch(locationWatchId);
  locationWatchId = null;
}

function clearKakaoRooms() {
  kakaoRoomOverlays.forEach((overlay) => overlay.setMap(null));
  kakaoRoomOverlays = [];
}

function renderKakaoRoomOverlays(center: GeoPoint) {
  clearKakaoRooms();

  getVisibleRooms().forEach((room) => {
    const lat = Number(room.lat);
    const lng = Number(room.lng);
    const hasCoordinates = isValidCoordinate(lat, lng);
    const position = hasCoordinates
      ? new window.kakao.maps.LatLng(lat, lng)
      : new window.kakao.maps.LatLng(center.lat + room.latOffset, center.lng + room.lngOffset);
    const content = `
      <button class="room-pin ${getRoomStatusClass(room)}" type="button" data-map-room-id="${escapeHtml(room.id)}">
        <strong>${escapeHtml(room.storeName)}</strong>
        <span>${getRoomMeta(room)}</span>
      </button>
    `;
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      yAnchor: 1,
      zIndex: 5,
    });
    overlay.setMap(kakaoMap!);
    kakaoRoomOverlays.push(overlay);
  });
}

function renderKakaoMap(center: GeoPoint, { recenter = true, updateLevel = true }: { recenter?: boolean; updateLevel?: boolean } = {}) {
  const kakaoCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
  homeScreen.classList.add("has-kakao-map");

  if (!kakaoMap) {
    kakaoMap = new window.kakao.maps.Map(kakaoMapContainer, {
      center: kakaoCenter,
      level: getKakaoLevelForRadius(),
    });
    kakaoMap.setZoomable(true);
    kakaoMap.setDraggable(true);
    window.kakao.maps.event.addListener(kakaoMap, "dragstart", () => {
      isFollowingUserLocation = false;
    });
  } else {
    if (updateLevel) {
      kakaoMap.setLevel(getKakaoLevelForRadius());
    }
    if (recenter) {
      kakaoMap.setCenter(kakaoCenter);
    }
  }

  kakaoMap.relayout();
  if (recenter) {
    kakaoMap.setCenter(kakaoCenter);
  }

  if (kakaoCircle) {
    kakaoCircle.setMap(null);
  }

  kakaoCircle = new window.kakao.maps.Circle({
    center: kakaoCenter,
    radius: currentRadiusMeters,
    strokeWeight: 1,
    strokeColor: "#0ea5e9",
    strokeOpacity: 0.52,
    fillColor: "#38bdf8",
    fillOpacity: 0.12,
  });
  kakaoCircle.setMap(kakaoMap);

  if (!kakaoUserMarker) {
    kakaoUserMarker = new window.kakao.maps.CustomOverlay({
      position: kakaoCenter,
      content: '<div class="kakao-user-dot" aria-label="내 위치"></div>',
      xAnchor: 0.5,
      yAnchor: 0.5,
      zIndex: 12,
    });
    kakaoUserMarker.setMap(kakaoMap);
  } else {
    kakaoUserMarker.setPosition(kakaoCenter);
  }

  renderKakaoRoomOverlays(center);
}

function clearShareLocationMarker() {
  if (shareLocationMarker) {
    shareLocationMarker.setMap(null);
  }
}

function updateShareLocationSummary() {
  if (!shareLocationSummary) {
    return;
  }

  shareLocationSummary.textContent = selectedShareLocationLabel || "지도에서 찍기";
  openShareLocationPickerButton?.classList.toggle("has-location", Boolean(selectedShareLocation));
  openShareLocationPickerButton?.classList.remove("is-invalid");
  if (confirmShareLocationButton) {
    confirmShareLocationButton.disabled = !selectedShareLocation;
  }
}

function renderShareLocationMarker() {
  if (!shareLocationMap || !window.kakao?.maps || !selectedShareLocation) {
    return;
  }

  const position = new window.kakao.maps.LatLng(
    selectedShareLocation.lat,
    selectedShareLocation.lng,
  );

  if (!shareLocationMarker) {
    shareLocationMarker = new window.kakao.maps.CustomOverlay({
      position,
      content: '<div class="share-location-pin" aria-label="선택한 나눌 위치"><span></span></div>',
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3,
    });
  } else {
    shareLocationMarker.setPosition(position);
  }

  shareLocationMarker.setMap(shareLocationMap);
}

function setSelectedShareLocation(location: GeoPoint, fallbackLabel = "선택 완료") {
  selectedShareLocation = {
    lat: location.lat,
    lng: location.lng,
  };
  selectedShareLocationLabel = fallbackLabel;

  createRoomHint.textContent = "";
  updateShareLocationSummary();
  renderShareLocationMarker();
}

function openShareLocationPicker() {
  homeScreen.classList.add("is-picking-share-location");
  shareLocationScreen?.setAttribute("aria-hidden", "false");
  window.setTimeout(initShareLocationMap, 0);
}

function closeShareLocationPicker() {
  homeScreen.classList.remove("is-picking-share-location");
  shareLocationScreen?.setAttribute("aria-hidden", "true");
}

async function initShareLocationMap() {
  if (!shareLocationMapContainer) {
    return;
  }

  const center = selectedShareLocation || currentLocation;

  try {
    await loadKakaoMapsSdk();
    const kakaoCenter = new window.kakao.maps.LatLng(center.lat, center.lng);

    if (!shareLocationMap) {
      shareLocationMap = new window.kakao.maps.Map(shareLocationMapContainer, {
        center: kakaoCenter,
        level: 3,
      });
      shareLocationMap.setZoomable(true);
      shareLocationMap.setDraggable(true);
      window.kakao.maps.event.addListener(shareLocationMap, "click", (mouseEvent) => {
        const latLng = mouseEvent.latLng;
        setSelectedShareLocation(
          {
            lat: latLng.getLat(),
            lng: latLng.getLng(),
          },
          "선택 완료",
        );
      });
    } else {
      shareLocationMap.setCenter(kakaoCenter);
    }

    shareLocationMapContainer.classList.remove("is-unavailable");
    window.setTimeout(() => {
      shareLocationMap!.relayout();
      shareLocationMap!.setCenter(kakaoCenter);
      renderShareLocationMarker();
    }, 0);
  } catch (error) {
    console.warn("Share location map load failed.", error);
    shareLocationMapContainer.classList.add("is-unavailable");
  }
}

function updateRadiusUi() {
  const radiusText = `${currentRadiusMeters}m`;

  if (radiusCircle) {
    radiusCircle.setAttribute("aria-label", `내 위치 반경 ${radiusText}`);
  }

  homeScreen.classList.remove("radius-100", "radius-200", "radius-300");
  homeScreen.classList.add(`radius-${currentRadiusMeters}`);

  radiusControl?.querySelectorAll<HTMLButtonElement>("[data-radius]").forEach((button) => {
    const isSelected = Number(button.dataset.radius) === currentRadiusMeters;
    button.classList.toggle("is-selected", isSelected);
  });
}

function refreshRadiusView({ resetMap = true }: { resetMap?: boolean } = {}) {
  updateRadiusUi();
  renderRoomPins();
  renderRoomList();
  renderMapRoomPopup();

  if (kakaoMap && window.kakao?.maps) {
    if (resetMap) {
      renderKakaoMap(currentLocation);
      return;
    }

    renderKakaoRoomOverlays(currentLocation);
  }
}

async function initKakaoMapOrFallback() {
  homeScreen.classList.remove("has-kakao-map");
  renderRoomPins();
  const location = await getCurrentLocation({
    showError: true,
    targetAccuracy: TARGET_LOCATION_ACCURACY_METERS,
    sampleTimeoutMs: LOCATION_SAMPLE_TIMEOUT_MS,
  });
  if (!homeScreen.classList.contains("is-active")) {
    return;
  }
  isFollowingUserLocation = true;
  lastLocationRefreshAt = Date.now();
  applyCurrentLocation(location, { reloadRooms: true });
  startLiveLocationTracking();

  try {
    await loadKakaoMapsSdk();
    renderKakaoMap(currentLocation);
  } catch (error) {
    console.warn("Kakao Maps SDK load failed. Falling back to local map.", error);
    homeScreen.classList.remove("has-kakao-map");
    renderRoomPins();
  }
}

function initHomeMap() {
  updateRadiusUi();
  renderRoomList();
  initKakaoMapOrFallback();
}

function switchHomeTab(tab: string | undefined) {
  homeScreen.dataset.activeTab = tab;

  bottomTabs.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.tab === tab);
  });

  if (tab !== "map") {
    closeMapRoomPopup();
  }

  if (tab === "map" && kakaoMap) {
    window.setTimeout(() => {
      kakaoMap!.relayout();
      renderKakaoMap(currentLocation);
    }, 0);
  }
}

function switchRoomSection(section: string | undefined) {
  activeRoomSection = section === "mine" ? "mine" : "public";
  homeScreen.dataset.roomSection = activeRoomSection;

  roomSectionTabs.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.roomSection === activeRoomSection);
  });
}

function closeRoomDetail() {
  myRoomDetailScreen?.setAttribute("aria-hidden", "true");
  homeScreen.classList.remove("is-viewing-room-detail");
  activeDetailRoomId = 0;
  activeDetailRoom = null;
  if (myRoomChatTitle) {
    myRoomChatTitle.textContent = "채팅";
  }
}

function renderRoomDetail(data: RoomDetailResponse, { scrollToBottom = false }: { scrollToBottom?: boolean } = {}) {
  const room = data.room;
  const orders = data.orders || [];
  const messages = data.messages || [];
  room.serverId = room.id;
  room.orders = orders;
  activeDetailRoom = room;

  if (myRoomChatTitle) {
    myRoomChatTitle.textContent = room.storeName || "채팅";
  }
  if (myRoomDetailStatus) {
    myRoomDetailStatus.textContent = getRoomStatusLabel(room);
    myRoomDetailStatus.className = `platform ${getRoomStatusClass(room)}`;
  }
  if (myRoomDetailStore) {
    myRoomDetailStore.textContent = room.storeName;
  }
  if (myRoomDetailMeta) {
    myRoomDetailMeta.textContent =
      `${getPlatformLabel(room.platform)} · ${room.shareLocation || "위치 설명 없음"} · 배달료 ${getDeliveryFeeLabel(room.deliveryFee)}`;
  }
  if (myRoomDetailProgress) {
    myRoomDetailProgress.style.width = `${getOrderProgress(room)}%`;
  }
  if (myRoomDetailCurrent) {
    myRoomDetailCurrent.textContent = formatWon(room.currentOrderAmount);
  }
  if (myRoomDetailMinimum) {
    myRoomDetailMinimum.textContent = formatWon(room.minimumOrderAmount);
  }
  if (myRoomOrderCount) {
    myRoomOrderCount.textContent = `${orders.length}명`;
  }
  if (myRoomOrderEditButton) {
    myRoomOrderEditButton.hidden = !canEditMyOrder(room);
    myRoomOrderEditButton.dataset.editOrderRoomId = room.serverId as unknown as string; // DOMStringMap stringifies the number
  }

  if (myRoomOrderList) {
    myRoomOrderList.innerHTML = orders.length
      ? orders.map((order) => `
        <div class="my-room-order-item">
          <div>
            <strong>${escapeHtml(getOrderDisplayName(order))}</strong>
            <span>${escapeHtml(order.orderTitle)}</span>
          </div>
          <div class="order-price-stack">
            <b>${formatWon(order.orderAmount)}</b>
          </div>
        </div>
      `).join("")
      : '<p class="empty-state compact-empty">아직 주문이 없습니다.</p>';
  }

  if (myRoomDetailActions) {
    myRoomDetailActions.innerHTML = renderMyRoomActions(room, { showChat: false });
  }

  if (myRoomChatList) {
    // 위로 올려 이전 채팅을 읽는 중이면 3초 폴링 때 맨 아래로 끌어내리지 않는다.
    const wasNearBottom =
      myRoomChatList.scrollHeight - myRoomChatList.scrollTop - myRoomChatList.clientHeight < 40;
    myRoomChatList.innerHTML = messages.length
      ? messages.map(renderChatMessage).join("")
      : '<p class="empty-state compact-empty">아직 채팅이 없습니다.</p>';
    if (scrollToBottom || wasNearBottom) {
      scrollChatToBottom();
    }
  }
}

async function loadRoomDetail(roomId: number, { scrollToBottom = false }: { scrollToBottom?: boolean } = {}) {
  const token = getSessionToken();

  if (!token || !roomId) {
    return;
  }

  try {
    const data = await api<RoomDetailResponse>("/api/rooms/detail", { token, roomId });
    // 응답이 오기 전에 방을 닫았거나 다른 방을 열었으면 이 응답은 버린다.
    if (roomId !== activeDetailRoomId || getSessionToken() !== token) {
      return;
    }
    renderRoomDetail(data, { scrollToBottom });
  } catch (error) {
    if (roomId === activeDetailRoomId) {
      myRoomChatHint.textContent = (error as Error).message;
    }
  }
}

async function openRoomDetail(roomId: RoomIdInput) {
  activeDetailRoomId = Number(roomId) || 0;

  if (!activeDetailRoomId || !myRoomDetailScreen) {
    return;
  }

  myRoomChatHint.textContent = "";
  updateChatKeyboardOffset();
  myRoomDetailScreen.setAttribute("aria-hidden", "false");
  homeScreen.classList.add("is-viewing-room-detail");
  await loadRoomDetail(activeDetailRoomId, { scrollToBottom: true });
}

async function cancelRoom(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldCancel = await showAppConfirm({
    eyebrow: "방 삭제",
    title: "방을 삭제할까요?",
    message: "참여자에게 방이 사라졌다는 알림이 전송됩니다.",
    confirmText: "삭제",
    danger: true,
  });

  if (!shouldCancel) {
    return;
  }

  try {
    const data = await api<CancelRoomResponse>("/api/rooms/cancel", {
      token,
      roomId: numericRoomId,
    });

    if (activeDetailRoomId === numericRoomId) {
      closeRoomDetail();
    }

    showToast(data.notifiedCount > 0 ? "방을 삭제했고 참여자에게 알렸습니다." : "방을 삭제했습니다.");
    await loadRooms({ resetMap: false });
    await loadMyRooms();
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

function findMyRoom(roomId: RoomIdInput) {
  const numericRoomId = Number(roomId) || 0;
  return myRooms.find((room) => Number(room.serverId) === numericRoomId);
}

function findEditableOrderRoom(roomId: RoomIdInput) {
  const numericRoomId = Number(roomId) || 0;
  const listRoom = findMyRoom(numericRoomId);

  if (listRoom) {
    return listRoom;
  }

  if (activeDetailRoom && Number(activeDetailRoom.serverId) === numericRoomId) {
    return activeDetailRoom;
  }

  return null;
}

function closeOrderEditDialog() {
  activeEditOrderRoomId = 0;
  orderEditDialog?.classList.remove("is-visible");
  orderEditDialog?.setAttribute("aria-hidden", "true");
  orderEditForm?.reset();
  if (orderEditHint) {
    orderEditHint.textContent = "";
  }
}

function openOrderEditDialog(roomId: RoomIdInput) {
  const room = findEditableOrderRoom(roomId);
  const myOrder = room ? getMyRoomOrder(room) : null;

  if (!room || !myOrder || !canEditMyOrder(room)) {
    showToast("결제 요청 전까지만 메뉴를 변경할 수 있습니다.");
    return;
  }

  activeEditOrderRoomId = Number(room.serverId) || 0;
  if (editOrderTitleInput) {
    editOrderTitleInput.value = myOrder.orderTitle || "";
  }
  if (editOrderAmountInput) {
    editOrderAmountInput.value = String(myOrder.orderAmount || "");
  }
  if (orderEditHint) {
    orderEditHint.textContent = "";
  }

  orderEditDialog?.classList.add("is-visible");
  orderEditDialog?.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    editOrderTitleInput?.focus();
  }, 120);
}

function validateOrderEditForm() {
  const orderTitle = editOrderTitleInput.value.trim();
  const orderAmount = parseAmount(editOrderAmountInput.value);

  if (!activeEditOrderRoomId) {
    return "수정할 방을 다시 선택해 주세요.";
  }
  if (orderTitle.length < 1 || orderTitle.length > 40) {
    return "주문 메뉴를 1자 이상 40자 이하로 입력해 주세요.";
  }
  if (orderAmount < 1000) {
    return "주문 금액은 1,000원 이상으로 입력해 주세요.";
  }

  const balance = Number(currentUser?.strawberryBalance) || 0;

  if (orderAmount > balance) {
    return `잔액이 부족해서 변경할 수 없습니다. ${formatWon(orderAmount - balance)}을 더 충전해 주세요.`;
  }

  return "";
}

function closeWalletChargeDialog() {
  walletChargeDialog?.classList.remove("is-visible");
  walletChargeDialog?.setAttribute("aria-hidden", "true");
  walletChargeForm?.reset();
  if (walletChargeHint) {
    walletChargeHint.textContent = "";
  }
}

function openWalletChargeDialog() {
  if (!walletChargeDialog) {
    return;
  }

  if (walletChargeHint) {
    walletChargeHint.textContent = "";
  }
  walletChargeAmountInput.value = "";
  walletChargeDialog.classList.add("is-visible");
  walletChargeDialog.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    walletChargeAmountInput?.focus();
  }, 120);
}

function validateWalletChargeForm() {
  const amount = parseAmount(walletChargeAmountInput.value);

  if (amount <= 0) {
    return "충전 금액을 입력해 주세요.";
  }
  if (amount > 1_000_000) {
    return "한 번에 100만원까지만 충전할 수 있습니다.";
  }

  return "";
}

function closeProfileEditDialog() {
  profileEditDialog?.classList.remove("is-visible");
  profileEditDialog?.setAttribute("aria-hidden", "true");
  profileEditForm?.reset();
  if (profileEditHint) {
    profileEditHint.textContent = "";
  }
}

function openProfileManagement() {
  if (!profileEditDialog || !profileNicknameInput) {
    return;
  }

  profileNicknameInput.value = currentUser?.nickname || "";
  if (profileEditHint) {
    profileEditHint.textContent = "";
  }
  profileEditDialog.classList.add("is-visible");
  profileEditDialog.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    profileNicknameInput.focus();
    profileNicknameInput.select();
  }, 120);
}

function validateProfileEditForm() {
  const nickname = profileNicknameInput.value.trim();

  if (nickname.length < 2) {
    return "닉네임은 2자 이상 입력해 주세요.";
  }
  if (nickname.length > 12) {
    return "닉네임은 12자 이하로 입력해 주세요.";
  }

  return "";
}

async function requestRoomPayment(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldRequest = await showAppConfirm({
    eyebrow: "결제 요청",
    title: "입장자들에게 확인을 보낼까요?",
    message: "모든 입장자가 예를 누르면 결제 단계로 넘어가고, 그때부터 방을 나갈 수 없습니다.",
    confirmText: "보내기",
  });

  if (!shouldRequest) {
    return;
  }

  try {
    const data = await api<PaymentRequestResponse>("/api/rooms/payment-request", {
      token,
      roomId: numericRoomId,
    });
    if (data.pendingConsent) {
      showToast("입장자들에게 결제 요청 확인을 보냈습니다.");
    } else if (data.locked) {
      showToast("결제 단계로 전환되었습니다.");
    }
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === numericRoomId) {
      await loadRoomDetail(activeDetailRoomId);
    }
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

function closePaymentConsentDialog() {
  activePaymentConsentRoomId = 0;
  paymentConsentDialog?.classList.remove("is-visible");
  paymentConsentDialog?.setAttribute("aria-hidden", "true");
}

function showPaymentConsentDialog(room: MapRoom) {
  if (!paymentConsentDialog || !room) {
    return;
  }

  const myOrder = getMyRoomOrder(room);
  const deliveryShare = getDeliveryShare(room);
  const paymentAmount = myOrder ? getOrderPaymentAmount(room, myOrder) : 0;

  activePaymentConsentRoomId = Number(room.serverId) || 0;

  if (paymentConsentStoreName) {
    paymentConsentStoreName.textContent = `${room.storeName} 결제 요청`;
  }
  if (paymentConsentMessage) {
    paymentConsentMessage.textContent = myOrder
      ? "내 주문 금액과 배달비 몫을 확인해 주세요."
      : "메뉴와 금액을 확인했다면 동의해 주세요.";
  }
  if (paymentConsentBreakdown) {
    if (myOrder) {
      paymentConsentBreakdown.hidden = false;
      paymentConsentBreakdown.innerHTML = `
        <div class="payment-breakdown-row">
          <span>내 메뉴</span>
          <strong>${formatWon(myOrder.orderAmount || 0)}</strong>
        </div>
        <div class="payment-breakdown-row">
          <span>배달비 ${room.orderCount || (room.orders || []).length || 1}명 분할</span>
          <strong>${formatWon(deliveryShare)}</strong>
        </div>
        <div class="payment-breakdown-row payment-breakdown-total">
          <span>총 결제</span>
          <strong>${formatWon(paymentAmount)}</strong>
        </div>
      `;
    } else {
      paymentConsentBreakdown.hidden = true;
      paymentConsentBreakdown.innerHTML = "";
    }
  }

  paymentConsentDialog.classList.add("is-visible");
  paymentConsentDialog.setAttribute("aria-hidden", "false");
}

function maybeShowPaymentConsentDialog() {
  if (!paymentConsentDialog || isPaymentConsentSubmitting) {
    return;
  }

  if (activePaymentConsentRoomId) {
    const activeRoom = myRooms.find((room) => Number(room.serverId) === Number(activePaymentConsentRoomId));

    if (
      activeRoom
      && activeRoom.isPaymentConsentPending
      && !activeRoom.isPaymentRequested
      && !hasMyPaymentConsentResponse(activeRoom)
    ) {
      return;
    }

    closePaymentConsentDialog();
  }

  const room = getPendingPaymentConsentRoom();

  if (room) {
    showPaymentConsentDialog(room);
  }
}

function openPaymentConsentDialogForRoom(roomId: RoomIdInput) {
  const room = findMyRoom(roomId);

  if (!room?.isPaymentConsentPending || hasMyPaymentConsentResponse(room)) {
    showToast("현재 확인할 결제 요청이 없습니다.");
    return;
  }

  showPaymentConsentDialog(room);
}

async function respondPaymentConsent(accepted: boolean) {
  const token = getSessionToken();
  const numericRoomId = Number(activePaymentConsentRoomId) || 0;

  if (!token || !numericRoomId || isPaymentConsentSubmitting) {
    return;
  }

  isPaymentConsentSubmitting = true;
  if (paymentConsentAcceptButton) {
    paymentConsentAcceptButton.disabled = true;
  }
  if (paymentConsentDeclineButton) {
    paymentConsentDeclineButton.disabled = true;
  }

  try {
    const data = await api<PaymentConsentResponse>("/api/rooms/payment-consent", {
      token,
      roomId: numericRoomId,
      accepted,
    });

    closePaymentConsentDialog();
    if (data.user) {
      setCurrentUser(data.user);
    }

    if (data.autoDeclined) {
      showAppAlert(data.message || "잔액이 부족해서 결제 요청이 거절되었습니다.", {
        eyebrow: "잔액 부족",
        title: "주문 실패",
      });
    } else if (!accepted || data.accepted === false) {
      showToast("결제 요청을 거절했습니다. 방장이 20초 뒤 다시 요청할 수 있습니다.");
    } else if (data.locked) {
      showToast("전원이 동의해 결제 단계로 넘어갔습니다.");
    } else {
      showToast("동의했습니다. 다른 입장자 응답을 기다립니다.");
    }

    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === numericRoomId) {
      await loadRoomDetail(activeDetailRoomId);
    }
  } catch (error) {
    showAppAlert((error as Error).message);
  } finally {
    isPaymentConsentSubmitting = false;
    if (paymentConsentAcceptButton) {
      paymentConsentAcceptButton.disabled = false;
    }
    if (paymentConsentDeclineButton) {
      paymentConsentDeclineButton.disabled = false;
    }
    maybeShowPaymentConsentDialog();
  }
}

async function payRoomShare(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;
  const room = findMyRoom(numericRoomId);
  const myOrder = room ? getMyRoomOrder(room) : null;
  const amount = room && myOrder ? getOrderPaymentAmount(room, myOrder) : 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldPay = await showAppConfirm({
    eyebrow: "결제",
    title: "결제 완료 처리할까요?",
    message: amount > 0
      ? `${formatWon(amount)}을 결제 완료 처리합니다.\n실제 PG 연결 전이라 지금은 목업 결제입니다.`
      : "결제 완료 처리할까요?",
    confirmText: "결제",
  });

  if (!shouldPay) {
    return;
  }

  try {
    const data = await api<PayResponse>("/api/rooms/pay", {
      token,
      roomId: numericRoomId,
    });
    if (data.user) {
      setCurrentUser(data.user);
    }
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === numericRoomId) {
      await loadRoomDetail(activeDetailRoomId);
    }
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

async function receiveRoomOrder(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldReceive = await showAppConfirm({
    eyebrow: "받기 완료",
    title: "음식을 받았나요?",
    message: "받기 완료를 누르면 정산 단계에 반영됩니다.",
    confirmText: "받기 완료",
  });

  if (!shouldReceive) {
    return;
  }

  try {
    await api("/api/rooms/receive", {
      token,
      roomId: numericRoomId,
    });
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === numericRoomId) {
      await loadRoomDetail(activeDetailRoomId);
    }
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

async function markOrderComplete(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldMark = await showAppConfirm({
    eyebrow: "주문 완료",
    title: "배달앱 주문을 완료했나요?",
    message: "참여자들에게 방장이 배달 주문을 완료했다는 알림이 표시됩니다.",
    confirmText: "주문 완료",
  });

  if (!shouldMark) {
    return;
  }

  try {
    await api("/api/rooms/order-complete", {
      token,
      roomId: numericRoomId,
    });
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === numericRoomId) {
      await loadRoomDetail(activeDetailRoomId);
    }
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

async function leaveRoom(roomId: RoomIdInput) {
  const token = getSessionToken();
  const numericRoomId = Number(roomId) || 0;

  if (!token || !numericRoomId) {
    return;
  }

  const shouldLeave = await showAppConfirm({
    eyebrow: "방 나가기",
    title: "이 방에서 나갈까요?",
    message: "결제 요청 전이라면 나간 뒤 다시 주변 방 목록에 표시됩니다.",
    confirmText: "나가기",
    danger: true,
  });

  if (!shouldLeave) {
    return;
  }

  try {
    await api("/api/rooms/leave", {
      token,
      roomId: numericRoomId,
    });
    if (activeDetailRoomId === numericRoomId) {
      closeRoomDetail();
    }
    await loadRooms({ resetMap: false });
    await loadMyRooms();
  } catch (error) {
    showAppAlert((error as Error).message);
  }
}

function openCreateRoomSheet() {
  if (!createRoomSheet) {
    return;
  }

  closeJoinRoomSheet();
  closeRoomDetail();
  createRoomHint.textContent = "";
  homeScreen.classList.add("is-creating-room");
  createRoomSheet.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    storeNameInput?.focus();
  }, 180);
}

function closeCreateRoomSheet() {
  homeScreen.classList.remove("is-creating-room");
  closeShareLocationPicker();
  createRoomSheet?.setAttribute("aria-hidden", "true");
}

function openJoinRoomSheet(roomId: string | undefined) {
  const room = nearbyRooms.find((item) => item.id === roomId);

  if (!room?.serverId || !joinRoomSheet) {
    return;
  }

  closeCreateRoomSheet();
  closeRoomDetail();
  selectedJoinRoom = room;
  joinRoomHint.textContent = "";
  joinRoomForm.reset();

  if (joinRoomPlatform) {
    joinRoomPlatform.textContent = getPlatformLabel(room.platform);
  }
  if (joinRoomStoreName) {
    joinRoomStoreName.textContent = room.storeName;
  }
  if (joinRoomRemaining) {
    joinRoomRemaining.textContent =
      `최소 주문까지 ${formatWon(getRemainingAmount(room))} 남았습니다.`;
  }

  homeScreen.classList.add("is-joining-room");
  joinRoomSheet.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    joinOrderTitleInput?.focus();
  }, 180);
}

function closeJoinRoomSheet() {
  homeScreen.classList.remove("is-joining-room");
  joinRoomSheet?.setAttribute("aria-hidden", "true");
  selectedJoinRoom = null;
}

function validateJoinRoomForm() {
  const orderTitle = joinOrderTitleInput.value.trim();
  const orderAmount = parseAmount(joinOrderAmountInput.value);

  if (!selectedJoinRoom?.serverId) {
    return "입장할 방을 다시 선택해 주세요.";
  }
  if (orderTitle.length < 1 || orderTitle.length > 40) {
    return "주문 메뉴를 1자 이상 40자 이하로 입력해 주세요.";
  }
  if (orderAmount < 1000) {
    return "주문 금액은 1,000원 이상으로 입력해 주세요.";
  }

  return "";
}

function validateCreateRoomForm(): { message: string; target: HTMLElement | null } {
  const platform = platformInput.value;
  const storeName = storeNameInput.value.trim();
  const minimumOrderAmountRaw = minimumOrderAmountInput.value.trim();
  const deliveryFeeRaw = deliveryFeeInput.value.trim();
  const myOrderAmountRaw = myOrderAmountInput.value.trim();
  const orderTitle = orderTitleInput.value.trim();
  const shareLocation = shareLocationInput.value.trim();
  const minimumOrderAmount = parseAmount(minimumOrderAmountInput.value);
  const deliveryFee = parseAmount(deliveryFeeInput.value);
  const myOrderAmount = parseAmount(myOrderAmountInput.value);

  if (!platform) {
    return { message: "배달 플랫폼을 선택해 주세요.", target: platformInput };
  }
  if (storeName.length < 2) {
    return { message: "상호명을 2자 이상 입력해 주세요.", target: storeNameInput };
  }
  if (!minimumOrderAmountRaw) {
    return { message: "최소 주문 금액을 입력해 주세요.", target: minimumOrderAmountInput };
  }
  if (minimumOrderAmount < 5000) {
    return { message: "최소 주문 금액은 5,000원 이상으로 입력해 주세요.", target: minimumOrderAmountInput };
  }
  if (!deliveryFeeRaw) {
    return { message: "배달료를 입력해 주세요. 무료 배달이면 0을 입력해 주세요.", target: deliveryFeeInput };
  }
  if (deliveryFee > 20000) {
    return { message: "배달료는 20,000원 이하로 입력해 주세요.", target: deliveryFeeInput };
  }
  if (!myOrderAmountRaw) {
    return { message: "내 주문 금액을 입력해 주세요.", target: myOrderAmountInput };
  }
  if (myOrderAmount < 1000) {
    return { message: "내 주문 금액은 1,000원 이상으로 입력해 주세요.", target: myOrderAmountInput };
  }
  if (orderTitle.length < 1 || orderTitle.length > 40) {
    return { message: "내 주문 메뉴를 1자 이상 40자 이하로 입력해 주세요.", target: orderTitleInput };
  }
  if (shareLocation.length < 2 || shareLocation.length > 40) {
    return { message: "나눌 위치 설명을 2자 이상 40자 이하로 입력해 주세요.", target: shareLocationInput };
  }
  if (!selectedShareLocation) {
    return { message: "지도에서 나눌 위치를 찍어 주세요.", target: openShareLocationPickerButton };
  }

  return { message: "", target: null };
}

function focusCreateRoomValidationTarget(target: HTMLElement | null) {
  if (!target) {
    return;
  }

  target.classList?.add("is-invalid");
  target.scrollIntoView({ block: "center", behavior: "smooth" });
  window.setTimeout(() => {
    target.focus?.({ preventScroll: true });
  }, 180);
}

async function restoreSession() {
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (!token) {
    showLogin();
    return;
  }

  try {
    const data = await api<AuthSessionResponse>("/api/auth/session", { token });
    if (data.authenticated) {
      if (!data.user?.hasPayoutAccount) {
        window.localStorage.removeItem(TOKEN_KEY);
        setCurrentUser(null);
        showLogin();
        return;
      }
      setCurrentUser(data.user);
      showHome();
      return;
    }
  } catch {
    // 네트워크 오류나 서버 재시작 중이면 토큰은 남겨 두고 로그인 화면만 보여준다.
    showLogin();
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  setCurrentUser(null);
  showLogin();
}

phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
  formHint.textContent = "";
});

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 6);
  codeHint.textContent = "";
});

nicknameInput.addEventListener("input", () => {
  signupHint.textContent = "";
});

bankSelectButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  accountHint.textContent = "";

  if (bankOptionList?.parentElement?.classList.contains("is-open")) {
    closeBankOptions();
    return;
  }

  openBankOptions();
});

bankOptionList?.addEventListener("click", (event) => {
  const option = (event.target as Element).closest<HTMLButtonElement>("[data-bank]");

  if (!option) {
    return;
  }

  updateBankSelection(option.dataset.bank || "");
  closeBankOptions();
  accountHint.textContent = "";
});

document.addEventListener("click", (event) => {
  if (!bankOptionList?.parentElement?.contains(event.target as Node)) {
    closeBankOptions();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBankOptions();
  }
});

accountNumberInput?.addEventListener("input", () => {
  accountNumberInput.value = normalizeAccountNumber(accountNumberInput.value);
  accountHint.textContent = "";
});

accountHolderInput?.addEventListener("input", () => {
  accountHint.textContent = "";
});

myRoomChatInput?.addEventListener("input", () => {
  myRoomChatHint.textContent = "";
});

myRoomChatInput?.addEventListener("focus", () => {
  homeScreen.classList.add("is-chat-input-focused");
  updateChatKeyboardOffset();
  window.setTimeout(() => {
    updateChatKeyboardOffset();
    scrollChatToBottom();
  }, 260);
});

myRoomChatInput?.addEventListener("blur", () => {
  homeScreen.classList.remove("is-chat-input-focused");
  window.setTimeout(updateChatKeyboardOffset, 120);
});

notificationTestButton?.addEventListener("click", () => {
  requestNotificationPermission({ showSample: true });
});

settingsProfileCard?.addEventListener("click", openProfileManagement);
openWalletChargeButton?.addEventListener("click", openWalletChargeDialog);
walletChargeCancelButton?.addEventListener("click", closeWalletChargeDialog);
walletChargeDialog?.addEventListener("click", (event) => {
  if (event.target === walletChargeDialog) {
    closeWalletChargeDialog();
  }
});
profileEditCancelButton?.addEventListener("click", closeProfileEditDialog);
profileEditDialog?.addEventListener("click", (event) => {
  if (event.target === profileEditDialog) {
    closeProfileEditDialog();
  }
});
profileNicknameInput?.addEventListener("input", () => {
  if (profileEditHint) {
    profileEditHint.textContent = "";
  }
});

[
  storeNameInput,
  shareLocationInput,
  orderTitleInput,
  joinOrderTitleInput,
].forEach((input) => {
  input?.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    createRoomHint.textContent = "";
    joinRoomHint.textContent = "";
  });
});

phoneForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const phone = normalizePhone(phoneInput.value);

  if (!isValidKoreanMobilePhone(phone)) {
    formHint.textContent = "010으로 시작하는 11자리 번호를 입력해 주세요.";
    phoneInput.focus();
    return;
  }

  setLoading(phoneForm, true);
  formHint.textContent = "";

  try {
    const data = await api<AuthStartResponse>("/api/auth/start", { phoneNumber: phone });
    currentPhone = phone;
    currentChallengeId = data.challengeId;
    codeInput.value = "";
    codeHint.textContent = data.devCode
      ? `개발용 인증번호: ${data.devCode}`
      : "인증번호를 입력해 주세요.";
    showStep(codeForm);
    codeInput.focus();
  } catch (error) {
    formHint.textContent = (error as Error).message;
  } finally {
    setLoading(phoneForm, false);
  }
});

codeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const code = codeInput.value.replace(/\D/g, "").slice(0, 6);

  if (code.length !== 6) {
    codeHint.textContent = "6자리 인증번호를 입력해 주세요.";
    codeInput.focus();
    return;
  }

  setLoading(codeForm, true);

  try {
    const data = await api<AuthVerifyResponse>("/api/auth/verify", {
      challengeId: currentChallengeId,
      phoneNumber: currentPhone,
      code,
    });

    if (data.status === "logged_in") {
      saveSession(data.token);
      setCurrentUser(data.user);
      if (!data.user?.hasPayoutAccount) {
        showAccountRegistration(data.token, data.user);
        return;
      }
      showHome();
      return;
    }

    currentSignupToken = data.signupToken;
    nicknameInput.value = "";
    signupHint.textContent = "";
    showStep(signupForm);
    nicknameInput.focus();
  } catch (error) {
    codeHint.textContent = (error as Error).message;
  } finally {
    setLoading(codeForm, false);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nickname = nicknameInput.value.trim();

  if (nickname.length < 2 || nickname.length > 12) {
    signupHint.textContent = "닉네임은 2자 이상 12자 이하로 입력해 주세요.";
    nicknameInput.focus();
    return;
  }

  pendingSignupNickname = nickname;
  pendingAccountToken = "";
  resetAccountForm();
  if (backToNicknameButton) {
    backToNicknameButton.hidden = false;
  }
  showStep(accountForm);
});

accountForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const validationMessage = validateAccountForm();

  if (validationMessage) {
    accountHint.textContent = validationMessage;
    return;
  }

  setLoading(accountForm, true);
  accountHint.textContent = "";

  try {
    if (pendingAccountToken) {
      const data = await api<UserResponse>("/api/account/register", {
        token: pendingAccountToken,
        ...getAccountPayload(),
      });
      saveSession(pendingAccountToken);
      setCurrentUser(data.user);
      showHome();
      return;
    }

    const data = await api<AuthSignupResponse>("/api/auth/signup", {
      signupToken: currentSignupToken,
      nickname: pendingSignupNickname,
      ...getAccountPayload(),
    });
    saveSession(data.token);
    setCurrentUser(data.user);
    currentSignupToken = "";
    pendingSignupNickname = "";
    showHome();
  } catch (error) {
    accountHint.textContent = (error as Error).message;
  } finally {
    setLoading(accountForm, false);
  }
});

backToNicknameButton?.addEventListener("click", () => {
  if (!currentSignupToken) {
    return;
  }

  accountHint.textContent = "";
  showStep(signupForm);
  nicknameInput.focus();
});

backToPhoneButton.addEventListener("click", () => {
  currentChallengeId = "";
  currentSignupToken = "";
  pendingSignupNickname = "";
  pendingAccountToken = "";
  codeInput.value = "";
  codeHint.textContent = "";
  showStep(phoneForm);
  phoneInput.focus();
});

locateButton?.addEventListener("click", async () => {
  const location = await getCurrentLocation({
    showError: true,
    fallbackToDefault: false,
    targetAccuracy: TARGET_LOCATION_ACCURACY_METERS,
    sampleTimeoutMs: FORCE_LOCATION_SAMPLE_TIMEOUT_MS,
  });

  if (!location) {
    showToast("현재 위치를 다시 잡지 못했습니다.");
    return;
  }

  isFollowingUserLocation = true;
  lastLocationRefreshAt = Date.now();
  applyCurrentLocation(location, { recenterMap: true, reloadRooms: true });
  homeScreen.classList.remove("has-kakao-map");
  renderRoomPins();

  if (window.kakao?.maps && kakaoMap) {
    renderKakaoMap(currentLocation);
    return;
  }

  initKakaoMapOrFallback();
});

openShareLocationPickerButton?.addEventListener("click", openShareLocationPicker);
closeShareLocationPickerButton?.addEventListener("click", closeShareLocationPicker);
confirmShareLocationButton?.addEventListener("click", () => {
  if (!selectedShareLocation) {
    createRoomHint.textContent = "지도에서 나눌 위치를 먼저 선택해 주세요.";
    return;
  }

  closeShareLocationPicker();
});

radiusControl?.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>("[data-radius]");

  if (!button) {
    return;
  }

  currentRadiusMeters = Number(button.dataset.radius) || DEFAULT_RADIUS_METERS;
  refreshRadiusView();
});

[
  minimumOrderAmountInput,
  deliveryFeeInput,
  myOrderAmountInput,
  joinOrderAmountInput,
].forEach((input) => {
  input?.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 6);
    input.classList.remove("is-invalid");
    createRoomHint.textContent = "";
    joinRoomHint.textContent = "";
  });
});

walletChargeAmountInput?.addEventListener("input", () => {
  walletChargeAmountInput.value = walletChargeAmountInput.value.replace(/\D/g, "").slice(0, 7);
  if (walletChargeHint) {
    walletChargeHint.textContent = "";
  }
});

createRoomButtons.forEach((button) => {
  button.addEventListener("click", openCreateRoomSheet);
});

createRoomBackdrop?.addEventListener("click", closeCreateRoomSheet);
closeCreateRoomButton?.addEventListener("click", closeCreateRoomSheet);
joinRoomBackdrop?.addEventListener("click", closeJoinRoomSheet);
closeJoinRoomButton?.addEventListener("click", closeJoinRoomSheet);
paymentConsentAcceptButton?.addEventListener("click", () => {
  respondPaymentConsent(true);
});
paymentConsentDeclineButton?.addEventListener("click", () => {
  respondPaymentConsent(false);
});

homeScreen.addEventListener("click", (event) => {
  const pin = (event.target as Element).closest<HTMLButtonElement>("[data-map-room-id]");

  if (!pin) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openMapRoomPopup(pin.dataset.mapRoomId!);
});

mapRoomPopup?.addEventListener("click", (event) => {
  const closeButton = (event.target as Element).closest<HTMLButtonElement>(".map-room-close-button");

  if (closeButton) {
    event.preventDefault();
    event.stopPropagation();
    closeMapRoomPopup();
    return;
  }

  const joinButton = (event.target as Element).closest<HTMLButtonElement>("[data-join-room-id]");

  if (!joinButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  closeMapRoomPopup();
  openJoinRoomSheet(joinButton.dataset.joinRoomId);
});

roomList?.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>("[data-join-room-id]");

  if (!button || !roomList.contains(button)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  openJoinRoomSheet(button.dataset.joinRoomId);
});

myRoomList?.addEventListener("click", (event) => {
  const editOrderButton = (event.target as Element).closest<HTMLButtonElement>("[data-edit-order-room-id]");

  if (editOrderButton && !editOrderButton.disabled) {
    event.preventDefault();
    event.stopPropagation();
    openOrderEditDialog(editOrderButton.dataset.editOrderRoomId);
    return;
  }

  const cancelButton = (event.target as Element).closest<HTMLButtonElement>("[data-cancel-room-id]");

  if (cancelButton && !cancelButton.disabled) {
    cancelRoom(cancelButton.dataset.cancelRoomId);
    return;
  }

  const paymentRequestButton = (event.target as Element).closest<HTMLButtonElement>("[data-payment-request-room-id]");

  if (paymentRequestButton && !paymentRequestButton.disabled) {
    requestRoomPayment(paymentRequestButton.dataset.paymentRequestRoomId);
    return;
  }

  const paymentConsentButton = (event.target as Element).closest<HTMLButtonElement>("[data-open-payment-consent-room-id]");

  if (paymentConsentButton && !paymentConsentButton.disabled) {
    openPaymentConsentDialogForRoom(paymentConsentButton.dataset.openPaymentConsentRoomId);
    return;
  }

  const payButton = (event.target as Element).closest<HTMLButtonElement>("[data-pay-room-id]");

  if (payButton && !payButton.disabled) {
    payRoomShare(payButton.dataset.payRoomId);
    return;
  }

  const receiveButton = (event.target as Element).closest<HTMLButtonElement>("[data-receive-room-id]");

  if (receiveButton && !receiveButton.disabled) {
    receiveRoomOrder(receiveButton.dataset.receiveRoomId);
    return;
  }

  const orderCompleteButton = (event.target as Element).closest<HTMLButtonElement>("[data-order-complete-room-id]");

  if (orderCompleteButton && !orderCompleteButton.disabled) {
    markOrderComplete(orderCompleteButton.dataset.orderCompleteRoomId);
    return;
  }

  const leaveButton = (event.target as Element).closest<HTMLButtonElement>("[data-leave-room-id]");

  if (leaveButton && !leaveButton.disabled) {
    leaveRoom(leaveButton.dataset.leaveRoomId);
    return;
  }

  const button = (event.target as Element).closest<HTMLButtonElement>("[data-my-room-id]");

  if (!button) {
    return;
  }

  openRoomDetail(button.dataset.myRoomId);
});

myRoomDetailScreen?.addEventListener("click", (event) => {
  const editOrderButton = (event.target as Element).closest<HTMLButtonElement>("[data-edit-order-room-id]");

  if (editOrderButton && !editOrderButton.disabled) {
    openOrderEditDialog(editOrderButton.dataset.editOrderRoomId);
    return;
  }

  const cancelButton = (event.target as Element).closest<HTMLButtonElement>("[data-cancel-room-id]");

  if (cancelButton && !cancelButton.disabled) {
    cancelRoom(cancelButton.dataset.cancelRoomId);
    return;
  }

  const paymentRequestButton = (event.target as Element).closest<HTMLButtonElement>("[data-payment-request-room-id]");

  if (paymentRequestButton && !paymentRequestButton.disabled) {
    requestRoomPayment(paymentRequestButton.dataset.paymentRequestRoomId);
    return;
  }

  const paymentConsentButton = (event.target as Element).closest<HTMLButtonElement>("[data-open-payment-consent-room-id]");

  if (paymentConsentButton && !paymentConsentButton.disabled) {
    openPaymentConsentDialogForRoom(paymentConsentButton.dataset.openPaymentConsentRoomId);
    return;
  }

  const payButton = (event.target as Element).closest<HTMLButtonElement>("[data-pay-room-id]");

  if (payButton && !payButton.disabled) {
    payRoomShare(payButton.dataset.payRoomId);
    return;
  }

  const receiveButton = (event.target as Element).closest<HTMLButtonElement>("[data-receive-room-id]");

  if (receiveButton && !receiveButton.disabled) {
    receiveRoomOrder(receiveButton.dataset.receiveRoomId);
    return;
  }

  const orderCompleteButton = (event.target as Element).closest<HTMLButtonElement>("[data-order-complete-room-id]");

  if (orderCompleteButton && !orderCompleteButton.disabled) {
    markOrderComplete(orderCompleteButton.dataset.orderCompleteRoomId);
    return;
  }

});

chatRoomList?.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>("[data-chat-room-id]");

  if (!button) {
    return;
  }

  openRoomDetail(button.dataset.chatRoomId);
});

roomSectionTabs.forEach((button) => {
  button.addEventListener("click", () => {
    switchRoomSection(button.dataset.roomSection);
  });
});

closeMyRoomDetailButton?.addEventListener("click", closeRoomDetail);

appConfirmCancelButton?.addEventListener("click", () => {
  closeAppConfirmDialog(false);
});

appConfirmOkButton?.addEventListener("click", () => {
  closeAppConfirmDialog(true);
});

appConfirmDialog?.addEventListener("click", (event) => {
  if (event.target === appConfirmDialog && !appConfirmDialog.classList.contains("is-alert")) {
    closeAppConfirmDialog(false);
  }
});

orderEditCancelButton?.addEventListener("click", closeOrderEditDialog);

orderEditDialog?.addEventListener("click", (event) => {
  if (event.target === orderEditDialog) {
    closeOrderEditDialog();
  }
});

createRoomForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const validation = validateCreateRoomForm();

  if (!token) {
    createRoomHint.textContent = "로그인이 필요합니다.";
    return;
  }

  if (validation.message) {
    createRoomHint.textContent = validation.message;
    focusCreateRoomValidationTarget(validation.target);
    return;
  }

  setLoading(createRoomForm, true);
  createRoomHint.textContent = "";

  try {
    await api("/api/rooms/create", {
      token,
      platform: platformInput.value,
      storeName: storeNameInput.value.trim(),
      shareLocation: shareLocationInput.value.trim(),
      minimumOrderAmount: parseAmount(minimumOrderAmountInput.value),
      deliveryFee: parseAmount(deliveryFeeInput.value),
      myOrderAmount: parseAmount(myOrderAmountInput.value),
      orderTitle: orderTitleInput.value.trim(),
      lat: selectedShareLocation!.lat,
      lng: selectedShareLocation!.lng,
    });
    createRoomForm.reset();
    selectedShareLocation = null;
    selectedShareLocationLabel = "";
    updateShareLocationSummary();
    clearShareLocationMarker();
    closeCreateRoomSheet();
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    switchHomeTab("rooms");
    switchRoomSection("mine");
  } catch (error) {
    createRoomHint.textContent = (error as Error).message;
  } finally {
    setLoading(createRoomForm, false);
  }
});

joinRoomForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const validationMessage = validateJoinRoomForm();

  if (!token) {
    joinRoomHint.textContent = "로그인이 필요합니다.";
    return;
  }

  if (validationMessage) {
    joinRoomHint.textContent = validationMessage;
    return;
  }

  setLoading(joinRoomForm, true);
  joinRoomHint.textContent = "";

  try {
    const joinedStoreName = selectedJoinRoom!.storeName;
    await api("/api/rooms/join", {
      token,
      roomId: selectedJoinRoom!.serverId,
      orderTitle: joinOrderTitleInput.value.trim(),
      orderAmount: parseAmount(joinOrderAmountInput.value),
    });
    closeJoinRoomSheet();
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    switchHomeTab("rooms");
    switchRoomSection("mine");
    showToast(`${joinedStoreName} 방에 입장했습니다.`, { duration: 4000 });
  } catch (error) {
    joinRoomHint.textContent = (error as Error).message;
  } finally {
    setLoading(joinRoomForm, false);
  }
});

orderEditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const validationMessage = validateOrderEditForm();

  if (!token) {
    orderEditHint.textContent = "로그인이 필요합니다.";
    return;
  }

  if (validationMessage) {
    orderEditHint.textContent = validationMessage;
    return;
  }

  setLoading(orderEditForm, true);
  orderEditHint.textContent = "";

  try {
    const roomId = activeEditOrderRoomId;
    await api("/api/rooms/order-update", {
      token,
      roomId,
      orderTitle: editOrderTitleInput.value.trim(),
      orderAmount: parseAmount(editOrderAmountInput.value),
    });
    closeOrderEditDialog();
    await loadRooms({ resetMap: false });
    await loadMyRooms();
    if (activeDetailRoomId === roomId) {
      await loadRoomDetail(roomId);
    }
    showToast("메뉴를 변경했습니다.");
  } catch (error) {
    orderEditHint.textContent = (error as Error).message;
  } finally {
    setLoading(orderEditForm, false);
  }
});

walletChargeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const validationMessage = validateWalletChargeForm();

  if (!token) {
    walletChargeHint.textContent = "로그인이 필요합니다.";
    return;
  }
  if (validationMessage) {
    walletChargeHint.textContent = validationMessage;
    return;
  }

  setLoading(walletChargeForm, true);
  walletChargeHint.textContent = "";

  try {
    const amount = parseAmount(walletChargeAmountInput.value);
    const data = await api<UserResponse>("/api/wallet/charge", {
      token,
      amount,
    });
    setCurrentUser(data.user);
    closeWalletChargeDialog();
    showAppAlert(`${amount.toLocaleString("ko-KR")}원을 충전했습니다.`, {
      eyebrow: "충전 완료",
      title: "잔액이 충전되었습니다.",
    });
  } catch (error) {
    walletChargeHint.textContent = (error as Error).message;
  } finally {
    setLoading(walletChargeForm, false);
  }
});

profileEditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const validationMessage = validateProfileEditForm();

  if (!token) {
    profileEditHint.textContent = "로그인이 필요합니다.";
    return;
  }

  if (validationMessage) {
    profileEditHint.textContent = validationMessage;
    profileNicknameInput?.focus();
    return;
  }

  setLoading(profileEditForm, true);
  profileEditHint.textContent = "";

  try {
    const data = await api<UserResponse>("/api/account/nickname", {
      token,
      nickname: profileNicknameInput.value.trim(),
    });

    setCurrentUser(data.user);
    closeProfileEditDialog();
    showAppAlert("닉네임을 변경했습니다.", {
      eyebrow: "프로필",
      title: "저장 완료",
    });
  } catch (error) {
    profileEditHint.textContent = (error as Error).message;
  } finally {
    setLoading(profileEditForm, false);
  }
});

myRoomChatForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = getSessionToken();
  const message = myRoomChatInput.value.trim();

  if (!token || !activeDetailRoomId) {
    myRoomChatHint.textContent = "방 정보를 다시 열어 주세요.";
    return;
  }
  if (!message) {
    myRoomChatHint.textContent = "메시지를 입력해 주세요.";
    return;
  }

  setLoading(myRoomChatForm, true);
  myRoomChatHint.textContent = "";

  try {
    await api("/api/rooms/message", {
      token,
      roomId: activeDetailRoomId,
      message,
    });
    myRoomChatInput.value = "";
    await loadRoomDetail(activeDetailRoomId, { scrollToBottom: true });
  } catch (error) {
    myRoomChatHint.textContent = (error as Error).message;
  } finally {
    setLoading(myRoomChatForm, false);
  }
});

bottomTabs.forEach((button) => {
  button.addEventListener("click", () => {
    switchHomeTab(button.dataset.tab);
  });
});

function clearSessionState() {
  window.localStorage.removeItem(TOKEN_KEY);
  stopRoomRealtimeSync();
  setCurrentUser(null);
  serverRooms = [];
  nearbyRooms = [...demoRooms];
  myRooms = [];
  minimumReachedToastRoomIds = new Set();
  renderChatRoomList();
  closeCreateRoomSheet();
  closeJoinRoomSheet();
  closeRoomDetail();
  phoneInput.value = "";
  codeInput.value = "";
  nicknameInput.value = "";
}

logoutButton.addEventListener("click", async () => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  clearSessionState();

  if (token) {
    try {
      await api("/api/auth/logout", { token });
    } catch {
      // 클라이언트 토큰 제거만으로도 다음 진입을 막을 수 있다.
    }
  }

  showLogin();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && homeScreen.classList.contains("is-active")) {
    updateChatKeyboardOffset();
    syncRoomsWithCurrentLocation({
      forceLocation: true,
      resetMap: false,
      showLocationError: true,
    });
  }
});

window.addEventListener("resize", updateChatKeyboardOffset);
window.visualViewport?.addEventListener("resize", () => {
  updateChatKeyboardOffset();
  if (activeDetailRoomId) {
    window.setTimeout(scrollChatToBottom, 80);
  }
});
window.visualViewport?.addEventListener("scroll", updateChatKeyboardOffset);

async function checkDevVersion() {
  try {
    const response = await fetch("/api/dev/version", { cache: "no-store" });
    if (response.status === 404) {
      // 운영 모드 서버에는 이 API가 없다. 폰에서 1초마다 요청하지 않도록 멈춘다.
      window.clearInterval(devReloadTimer);
      return;
    }
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    if (!data.version) {
      return;
    }

    if (!devReloadVersion) {
      devReloadVersion = data.version;
      return;
    }

    if (devReloadVersion !== data.version) {
      window.location.reload();
    }
  } catch {
    // 개발 서버가 재시작되는 순간에는 잠깐 실패할 수 있다.
  }
}

function startDevLiveReload() {
  if (devReloadTimer) {
    return;
  }

  checkDevVersion();
  devReloadTimer = window.setInterval(checkDevVersion, DEV_RELOAD_INTERVAL_MS);
}

startDevLiveReload();
startPaymentRetryCountdownTimer();
registerServiceWorker();
updateNotificationStatus();
updateChatKeyboardOffset();
restoreSession();
