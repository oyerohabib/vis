"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useTransition,
  useEffect,
  useState,
} from "react";
import { getallorders } from "@/actions/order";
import { getNotification } from "@/actions/notification";
import { Order, Notification } from "@/types";

interface OrderContextProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  isLoading: boolean;
  orderSearchTerm: string;
  setOrderSearchTerm: Dispatch<SetStateAction<string>>;
  updateOrders: () => void;
  Notifications: Notification[];
  isPending: boolean; 
}

export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [Notifications, setNotifications] = useState<Notification[]>([]);
  const [orderSearchTerm, setOrderSearchTerm] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const [isPending, startGetting] = useTransition();

  useLayoutEffect(() => {
    const fetchData = async () => {
      startTransition(() =>
        getallorders().then((res) => {
          setOrders(res.orders);
        })
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      startGetting(() =>
        getNotification().then((res) => {
          setNotifications(res.notifications);
        })
      );
    };
    fetchData();
  }, []);

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
      isLoading,
      orderSearchTerm,
      setOrderSearchTerm,
      updateOrders,
      Notifications,
      isPending,
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
