type NavbarLinkProps = {
  id?: number;
  link: string;
  label: string;
};

type SidebarProps = {
  id?: number;
  label: string;
  icon: Icon;
  link: string;
};

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt: Date;
  referralCode?: string;
  referredById?: string;
  referredBy?: User;
  referrals: User[];
  referralsMade: Referral[];
  verified: boolean;
  accountType: string;
  sentMessages: Message[];
  receivedMessages: Message[];
  conversationsAsSender: Conversation[];
  conversationsAsReceiver: Conversation[];
  orders: Order[];
  bids: Bid[];
  deliveries: Order[];
}

interface Referral {
  id: number;
  code: string;
  userId: string;
  user: User;
}

interface Conversation {
  id: string;
  senderId: string;
  receiverId: string;
  messages: Message[];
  sender: User;
  receiver: User;
}

interface Message {
  id: number;
  content: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
  conversationId: string;
  conversation: Conversation;
  sender: User;
  receiver: User;
}

interface Order {
  id: string;
  pickupname: string;
  pickupaddress: string;
  pickupphone: string;
  pickupitem: string[] | string;
  weight?: string;
  deliverymode: string;
  note?: string;
  dropoffname: string;
  dropoffaddress: string;
  dropoffphone: string;
  deliverytype: string;
  insurance: boolean;
  owner: User;
  userId: string;
  deliveryAgent?: User;
  deliveryAgentId?: string;
  bids: Bid[];
  status: "pending" | "in-tranist" | "canceled" | "delivered";
  createdAt?: Date;
  updatedAt: Date;
}

interface Bid {
  id: number;
  bidder: User;
  userId: string;
  order: Order;
  orderId: string;
  accepted?: boolean;
  price: string;
  deliveryhour: string;
}

interface Notification {
  id: number;
  from: string;
  avatar: string;
  type: string;
  item: {
    type: string;
    body: string;
  };
  read?: boolean;
  userId: string;
  createdAt: string;
}

const responseStatus = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
} as const;

const reason = {
  REQUIRED: "The requested resource is required",
  NOT_AVAILABLE: "The requested resource is not available",
  EXPIRED: "The requested resource is expired",
} as const;

type ResponseStatus = typeof responseStatus;
type ResponseCode = keyof ResponseStatus;

type ErrorType = keyof typeof reason;

type ResponseError = {
  success: false;
  error: {
    code: ResponseCode;
    type?: ErrorType;
    message: string;
  };
};

export type ResponseWithMessage =
  | {
      success: true;
      code: ResponseCode;
      message: string;
    }
  | ResponseError;

export type ResponseSuccess<T> =
  | {
      success: true;
      code: ResponseCode;
      message?: string;
      data: T;
    }
  | ResponseError;

export type Response<T = boolean> = T extends object
  ? ResponseSuccess<T>
  : ResponseWithMessage;
export { NavbarLinkProps, User, SidebarProps, Order, Notification };
