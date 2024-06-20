"use client";

import { useStateCtx } from "@/context/StateCtx";
import React from "react";

const page = () => {
  const { verifyOperator, setVerifyOperator } = useStateCtx();
  return (
    <div>
      <button onClick={() => setVerifyOperator(true)}>open</button>
    </div>
  );
};

export default page;
