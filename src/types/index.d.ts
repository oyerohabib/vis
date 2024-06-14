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
  otp?: string;
  otpExpires?: Date;
  createdAt?: Date;
  updatedAt: Date;
  password?: string;
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
  createdAt?: Date;
}
export { NavbarLinkProps, User, SidebarProps, Order, Notification };
