"use client";

import React from "react";
import { CounterCard } from "@/components/cards";
import { useOrderCtx } from "@/context/OrderCtx";
import { Button } from "@/components/ui/button";
import { Box, ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import { EmptyState1 } from "../(user)/emptystate";
import { useStateCtx } from "@/context/StateCtx";

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

const OperatorDashBoardOrder = () => {
  const { Generalorders, setSelectedOrder } = useOrderCtx();
  const { setOperatoropenOrder } = useStateCtx();
  return (
    <section className="flex flex-col   lg:border-r lg:border-l pb-6 lg:pb-0 border-primary h-full relative items-center lg:h-[816px] font-worksans">
      <div className="flex w-full sm:px-5 items-center justify-between  border-b border-t border-primary h-[56px] relative sm:text-xl  text-black">
        <div className="flex gap-2 items-center justify-center text-black font-worksans">
          <Box size="32" />
          <span>All Orders</span>
        </div>
        <Button asChild variant="ghost" className="flex">
          <Link href="/operator/orders">
            <span>view all</span>
            <ArrowRight2 size={18} />
          </Link>
        </Button>
      </div>
      {Generalorders.length < 1 ? (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyState1
            title="There's no Orders yet"
            text="Try creating an order"
            Item={
              <button className="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4">
                keep working
              </button>
            }
          />
        </div>
      ) : (
        <>
          <table className="min-w-full w-full rounded-xl hidden md:block">
            <thead>
              <tr className="bg-gray-50 divide-x divide-gray-300">
                <th className="px-4 py-3 text-left text-sm text-black">
                  Pick Up Address
                </th>
                <th className="px-4 py-3 text-left text-sm text-black">
                  Dropoff Address
                </th>
                <th className="px-4 py-3 text-left text-sm text-black">
                  Delivery Type
                </th>
                <th className="px-4 py-3 text-left text-sm text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 overflow-x-hidden overflow-y-auto">
              {Generalorders.map((ord) => (
                <tr key={ord.id} className="divide-x divide-gray-300">
                  <td className="px-4 py-3 text-left text-sm text-black">
                    {ord.pickupaddress}
                  </td>
                  <td className="px-4 py-3 text-left text-sm text-black">
                    {ord.dropoffaddress}
                  </td>
                  <td className="px-4 py-3 text-left text-sm text-black">
                    {ord.deliverytype}
                  </td>
                  <td className="px-4 py-3 text-left text-sm text-black">
                    <Button
                      className="py-4 px-2"
                      disabled={ord.dispatched}
                      onClick={() => {
                        setOperatoropenOrder(true);
                        setSelectedOrder(ord.id);
                      }}
                    >
                      {ord.dispatched ? "Taken" : "View More"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full flex-col max-w-[687px] hide-scroll overflow-y-auto md:hidden">
            {Generalorders.map((ord) => (
              <div
                key={ord.id}
                className="w-full flex justify-between border-t border-b border-gray-200 px-2 py-2 gap-x-2 items-center"
              >
                <div className="flex w-full flex-col items-start justify-between gap-y-1 min-[400px]:gap-y-2">
                  <h3 className="font-medium text-sm sm:text-base">
                    Pickup Address: {ord.pickupaddress}
                  </h3>
                  <h3 className="font-medium text-sm sm:text-base">
                    Dropoff Address: {ord.dropoffaddress}
                  </h3>
                </div>
                <Button
                  className="py-4 px-2"
                  disabled={ord.dispatched}
                  onClick={() => {
                    setOperatoropenOrder(true);
                    setSelectedOrder(ord.id);
                  }}
                >
                  {ord.dispatched ? "Taken" : "View More"}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
export { OperatorDashNavBar, OperatorDashBoardOrder };
