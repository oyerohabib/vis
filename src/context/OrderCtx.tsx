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
}

export const OrderContext = createContext({} as OrderContextProps);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
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
  }, [orders]);

  const value = useMemo(
    () => ({
      orders,
      setOrders,
      isLoading,
    }),
    [orders, setOrders, isLoading]
  );
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

// Call this function whenever you want to use the context
export const useOrderCtx = () => {
  const ctx = useContext(OrderContext);

  if (!ctx) {
    throw new Error("useOrderCtx must be used within a OrderContextProvider");
  }
  return ctx;
};

export default OrderContextProvider;
