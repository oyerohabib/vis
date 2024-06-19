"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useEffect,
  useState,
  startTransition,
} from "react";
import { getallorders } from "@/actions/order";
import { getNotification } from "@/actions/notification";
import { Order, Notification } from "@/types";

interface OrderContextProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;

  orderSearchTerm: string;
  setOrderSearchTerm: Dispatch<SetStateAction<string>>;
  updateOrders: () => void;
  Notifications: Notification[];
}

export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [Notifications, setNotifications] = useState<Notification[]>([]);
  const [orderSearchTerm, setOrderSearchTerm] = useState<string>("");

  useLayoutEffect(() => {
    const fetchData = async () => {
      startTransition(() =>
        getallorders().then((res) => {
          setOrders(res.orders);
        })
      );
    };
    fetchData();
  }, [orders]);

  useEffect(() => {
    const fetchData = async () => {
      startTransition(() =>
        getNotification().then((res) => {
          setNotifications(res.notifications);
        })
      );
    };
    fetchData();
  }, [Notifications]);

  const updateOrders = async () => {
    startTransition(() =>
      getallorders().then((res) => {
        setOrders(res.orders);
      })
    );
  };

  const value = useMemo(
    () => ({
      orders,
      setOrders,
      orderSearchTerm,
      setOrderSearchTerm,
      updateOrders,
      Notifications,
    }),
    [orders, orderSearchTerm, Notifications]
  );
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderCtx = () => {
  const ctx = useContext(OrderContext);

  if (!ctx) {
    throw new Error("useOrderCtx must be used within a OrderContextProvider");
  }
  return ctx;
};

export default OrderContextProvider;
