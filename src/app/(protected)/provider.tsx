"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import OrderContextProvider from "@/context/OrderCtx";
import {
  CreateOrderModal,
  VerifyOperatorModal,
  ViewOrderDetails,
} from "@/components/modals";
import UserContextProvider from "@/context/UserCtx";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <UserContextProvider>
          <OrderContextProvider>
            {children}
            <CreateOrderModal />
            <VerifyOperatorModal />
            <ViewOrderDetails />
          </OrderContextProvider>
        </UserContextProvider>
      </SessionProvider>
    </>
  );
};

export { Providers };
