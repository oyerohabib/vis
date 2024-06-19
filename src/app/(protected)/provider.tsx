"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import OrderContextProvider from "@/context/OrderCtx";
import { CreateOrderModal } from "@/components/modals";
import UserContextProvider from "@/context/UserCtx";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <OrderContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
          <CreateOrderModal />
        </OrderContextProvider>
      </SessionProvider>
    </>
  );
};

export { Providers };
