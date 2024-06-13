"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useTransition,
  useState,
} from "react";
import { getallorders } from "@/actions/order";
import { Order } from "@/types";

interface OrderContextProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  isLoading: boolean;
  orderSearchTerm: string;
  setOrderSearchTerm: Dispatch<SetStateAction<string>>;
  updateOrders: () => void;
}

export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSearchTerm, setOrderSearchTerm] = useState<string>("");
  const [isLoading, startTransition] = useTransition();

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
    }),
    [orders, isLoading, orderSearchTerm]
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
