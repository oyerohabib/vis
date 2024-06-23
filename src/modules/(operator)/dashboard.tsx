"use client";

import React from "react";
import { CounterCard } from "@/components/cards";
import { useOrderCtx } from "@/context/OrderCtx";

const OperatorDashNavBar = () => {
  const { bids } = useOrderCtx();

  const rejectedBids = bids.filter((b) => b.accepted === false);

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4  py-6">
      <CounterCard count={bids.length ? bids.length : 0} label="Total Bids" />
      <CounterCard
        count={bids.length ? bids.length : 0}
        label="Completed Bids"
      />
      <CounterCard count={bids.length ? bids.length : 0} label="In-Progress" />
      <CounterCard
        count={rejectedBids.length ? rejectedBids.length : 0}
        label="Rejected Bids"
      />
    </div>
  );
};

export { OperatorDashNavBar };
