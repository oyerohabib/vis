import { NavbarLinkProps, SidebarProps } from "@/types";
import {
  type Icon,
  Category,
  Call,
  Notification1,
  Profile2User,
  ArchiveBook,
  TrendUp,
  Hierarchy,
  MessageText,
  Wallet2,
  Notification,
  Box,
  UserAdd,
} from "iconsax-react";

export const NAV_LINKS: NavbarLinkProps[] = [
  { id: 1, link: "home", label: "home" },
  { id: 2, link: "about-us", label: "about us" },
  { id: 3, link: "contacts", label: "contact us" },
  { id: 5, link: "review", label: "review" },
  { id: 6, link: "order", label: "order" },
  { id: 7, link: "price", label: "price checker" },
];

export const SIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "dashboard",
  },
  {
    id: 2,
    label: "Orders",
    icon: Box,
    link: "orders",
  },
  {
    id: 3,
    label: "Chat",
    icon: MessageText,
    link: "chat",
  },
  {
    id: 4,
    label: "price",
    icon: TrendUp,
    link: "price-checker",
  },
  {
    id: 5,
    label: "Notifications",
    icon: Notification,
    link: "notification",
  },
  {
    id: 6,
    label: "Referals",
    icon: UserAdd,
    link: "referals",
  },
  {
    id: 7,
    label: "Wallet",
    icon: Wallet2,
    link: "wallet",
  },
];

export const OPERATOR_SIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "dashboard",
  },
  {
    id: 2,
    label: "Orders",
    icon: Box,
    link: "orders",
  },
  {
    id: 10,
    label: "Bids",
    icon: Hierarchy,
    link: "orders",
  },
  {
    id: 3,
    label: "Chat",
    icon: MessageText,
    link: "chat",
  },

  {
    id: 5,
    label: "Notifications",
    icon: Notification,
    link: "notification",
  },
  {
    id: 6,
    label: "Referals",
    icon: UserAdd,
    link: "referals",
  },
  {
    id: 7,
    label: "Wallet",
    icon: Wallet2,
    link: "wallet",
  },
];
