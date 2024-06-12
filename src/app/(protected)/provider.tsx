"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import OrderContextProvider from "@/context/OrderCtx";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <OrderContextProvider>{children}</OrderContextProvider>
      </SessionProvider>
    </>
  );
};

export { Providers };
