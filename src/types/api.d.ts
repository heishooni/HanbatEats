// Shapes of the JSON returned by the backend (server.py: public_user, public_room,
// public_order, public_message, public_notification and the handlers' json_response calls).
// Ambient declarations: no runtime code is emitted.

interface PayoutAccount {
  bankName: string;
  accountHolder: string;
  maskedAccountNumber: string;
}

interface User {
  id: number;
  phoneNumber: string;
  nickname: string;
  strawberryBalance: number;
  hasPayoutAccount: boolean;
  payoutAccount: PayoutAccount | null;
}

interface Order {
  id: number;
  roomId: number;
  userId: number;
  nickname: string;
  orderTitle: string;
  orderAmount: number;
  paymentConsentStatus: string | null;
  paymentConsentRespondedAt: number | null;
  isPaymentConsentAccepted: boolean;
  isPaymentConsentDeclined: boolean;
  paidAt: number | null;
  isPaid: boolean;
  receivedAt: number | null;
  isReceived: boolean;
  createdAt: number;
}

interface RoomMessage {
  id: number;
  userId: number;
  nickname: string;
  message: string;
  type: string;
  createdAt: number;
}

interface AppNotification {
  id: number;
  roomId: number | null;
  message: string;
  createdAt: number;
}

// Fields shared by a server room and the client-side MapRoom built by mapServerRoom().
interface RoomBase {
  serverId?: number;
  ownerUserId: number;
  storeName: string;
  shareLocation: string;
  platform: string;
  minimumOrderAmount: number;
  currentOrderAmount: number;
  deliveryFee: number;
  orderCount: number;
  orders?: Order[];
  myRole?: string;
  status: string;
  isPaymentConsentPending: boolean;
  paymentConsentRequestedAt: number | null;
  paymentConsentRejectedAt: number | null;
  paymentConsentRetryAfter: number | null;
  isPaymentRequested: boolean;
  paymentRequestedAt: number | null;
  isOrdered: boolean;
  orderedAt: number | null;
  isSettled: boolean;
  settledAt: number | null;
}

// public_room(). /api/rooms/mine adds `orders`; renderRoomDetail() sets `serverId` and `orders`.
interface ServerRoom extends RoomBase {
  id: number;
  remainingAmount: number;
  lat: number | null;
  lng: number | null;
  isClosed: boolean;
  createdAt: number;
  closedAt: number | null;
  completedAt: number | null;
}

// Return type of mapServerRoom().
interface MapRoom extends RoomBase {
  id: string;
  serverId: number;
  orders: Order[];
  myRole: string;
  lat: number | null;
  lng: number | null;
  distance: number;
  x: number;
  y: number;
  latOffset: number;
  lngOffset: number;
}

interface GeoPoint {
  lat: number;
  lng: number;
}

interface AppLocation extends GeoPoint {
  label: string;
  accuracy?: number;
  timestamp?: number;
  ageMs?: number;
}

// GeolocationPositionError, or whatever watchPosition() threw; only `code` is read.
interface LocationErrorLike {
  code?: number;
}

// Room ids arrive as numbers or as data-* attribute strings; callers coerce with Number().
type RoomIdInput = string | number | undefined;

interface RoomsResponse {
  rooms: ServerRoom[];
}

interface NotificationsResponse {
  notifications: AppNotification[];
}

interface RoomDetailResponse {
  room: ServerRoom;
  orders: Order[];
  messages: RoomMessage[];
}

interface CancelRoomResponse {
  ok: boolean;
  notifiedCount: number;
}

interface PaymentRequestResponse {
  ok: boolean;
  pendingConsent?: boolean;
  locked?: boolean;
}

interface PaymentConsentResponse {
  ok: boolean;
  accepted?: boolean;
  locked?: boolean;
  autoDeclined?: boolean;
  retryAfter?: number;
  shortage?: number;
  message?: string;
  user?: User;
}

interface PayResponse {
  ok: boolean;
  user?: User;
}

interface UserResponse {
  ok?: boolean;
  user: User;
}

interface AuthStartResponse {
  challengeId: string;
  expiresInSeconds: number;
  devCode?: string | null;
}

type AuthVerifyResponse =
  | { status: "logged_in"; token: string; user: User }
  | { status: "signup_required"; signupToken: string };

interface AuthSignupResponse {
  status: string;
  token: string;
  user: User;
}

interface AuthSessionResponse {
  authenticated: boolean;
  user?: User;
}
