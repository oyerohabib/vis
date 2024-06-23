"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { getallorders, getGeneralOrders, getBids } from "@/actions/order";
import { getNotification } from "@/actions/notification";
import { Order, Notification, Bid } from "@/types";
import { useUserCtx } from "./UserCtx";
import { useStateCtx } from "./StateCtx";

interface OrderContextProps {
  bids: Bid[];
  orders: Order[];
  Generalorders: Order[];
  orderSearchTerm: string;
  selectedOrder: string;
  updateOrders: () => void;
  Notifications: Notification[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  setOrderSearchTerm: Dispatch<SetStateAction<string>>;
  setSelectedOrder: Dispatch<SetStateAction<string>>;
}

export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [Generalorders, setGeneralOrders] = useState<Order[]>([]);
  const [Notifications, setNotifications] = useState<Notification[]>([]);
  const [orderSearchTerm, setOrderSearchTerm] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [bids, setBids] = useState<Bid[]>([]);
  const { user } = useUserCtx();
  const { setVerifyOperator } = useStateCtx();

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

  useLayoutEffect(() => {
    const fetchData = async () => {
      startTransition(() =>
        getNotification().then((res) => {
          setNotifications(res.notifications);
        })
      );
    };
    fetchData();
  }, [Notifications]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (user.accountType === "user") {
        return;
      }
      startTransition(() =>
        getBids().then((res) => {
          setBids(res.bids);
        })
      );
    };
    fetchData();
  }, [user, setBids]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (user.accountType === "user") {
        return;
      }
      startTransition(() =>
        getGeneralOrders().then((res) => {
          setGeneralOrders(res.orders);
        })
      );
    };
    fetchData();
  }, [user, setGeneralOrders]);

  useLayoutEffect(() => {
    if (user.accountType === "operator") {
      const isVerified = user.isOperatorverified;
      if (!isVerified) {
        setVerifyOperator(true);
      }
    }
  }, [user]);

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
      Generalorders,
      bids,
      setSelectedOrder,
      selectedOrder,
    }),
    [
      orders,
      orderSearchTerm,
      Notifications,
      getGeneralOrders,
      bids,
      selectedOrder,
    ]
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
