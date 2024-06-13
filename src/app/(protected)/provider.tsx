"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import OrderContextProvider from "@/context/OrderCtx";
import { CreateOrderModal } from "@/components/modals";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <OrderContextProvider>
          {children}
          <CreateOrderModal />
        </OrderContextProvider>
      </SessionProvider>
    </>
  );
};

export { Providers };
