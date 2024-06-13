"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Add,
  WatchStatus,
  SearchNormal,
  Status,
  TruckFast,
  Box,
  ArrowRight2,
} from "iconsax-react";
import { X } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { EmptyState1 } from "../emptystate";
import { useOrderCtx } from "@/context/OrderCtx";
import { useStateCtx } from "@/context/StateCtx";
import { Skeleton } from "@/components/ui/skeleton";

const DashBoardNav = () => {
  const { setCreateOrder, createOrder } = useStateCtx();
  const { orderSearchTerm, setOrderSearchTerm } = useOrderCtx();

  return (
    <div className="w-full h-[40px]  min-[900px]:h-[56px] flex items-center justify-between gap-x-2 sm:gap-x-4 px-2 sm:px-4">
      <div className="flex w-full sm:max-w-[413px] justify-center relative">
        <div className="flex items-center w-full relative">
          <Input
            placeholder="search order by id ...."
            tabIndex={0}
            onChange={(e) => setOrderSearchTerm(e.target.value)}
            value={orderSearchTerm}
            type="text"
            className=" w-full h-[40px] min-[900px]:h-[56px] outline-none text-black text-md font-medium rounded-md"
          />
          {orderSearchTerm.length === 0 ? (
            <span className="absolute right-3 text-primary">
              <SearchNormal size={18} />
            </span>
          ) : (
            <span
              className={cn(
                "absolute right-3 text-primary transition-opacity duration-700",
                {
                  "opacity-0 duration-300": !orderSearchTerm,
                }
              )}
              role="button"
              tabIndex={0}
              aria-label="Clear search"
              onClick={() => setOrderSearchTerm("")}
            >
              <X size={18} className="text-primary" />
            </span>
          )}
        </div>
      </div>
      <div className="min-[900px]:w-full flex items-center max-[900px]:justify-between gap-x-2 sm:gap-x-4">
        <Button
          tabIndex={0}
          aria-label="Create Project"
          aria-haspopup
          aria-expanded={createOrder}
          id="create-project"
          type="button"
          onClick={() => setCreateOrder(true)}
          className=" flex h-[40px] w-[56px] min-[900px]:w-full min-[900px]:max-w-[170px] min-[900px]:min-h-[56px] min-[900px]:min-w-[214px]  lg:max-w-[250px] items-center lg:gap-x-5 gap-x-2  text-white rounded-lg hover:bg-primary/80 transition-opacity duration-300 text-sm sm:text-base justify-center bg-primary"
        >
          <Add size={24} className="hidden min-[900px]:inline" />
          <TruckFast size={18} className=" min-[900px]:hidden" />
          <span className="hidden min-[900px]:inline">New Order</span>
        </Button>
        <Button
          tabIndex={0}
          aria-label="Create Project"
          aria-haspopup
          // aria-expanded={createOrder}
          id="create-project"
          type="button"
          variant="outline"
          className=" flex h-[40px] w-[56px] min-[900px]:w-full min-[900px]:max-w-[170px] min-[900px]:min-h-[56px] min-[900px]:min-w-[214px]  lg:max-w-[250px] items-center lg:gap-x-5 gap-x-2  text-primary rounded-lg transition-opacity duration-300 text-sm sm:text-base justify-center border-primary border-solid"
        >
          <Status size={24} className="hidden min-[900px]:inline" />
          <WatchStatus size={18} className=" min-[900px]:hidden" />
          <span className="hidden min-[900px]:inline">Track Order</span>
        </Button>
      </div>
    </div>
  );
};

const OrdersPreview = () => {
  const { orders, isLoading, orderSearchTerm, setOrderSearchTerm } =
    useOrderCtx();

  const filteredOrders = orderSearchTerm
    ? orders.filter((order) =>
        order.id.toLowerCase().includes(orderSearchTerm.toLowerCase())
      )
    : orders;

  const hasSearchTerm = orders.some((order) =>
    order.id.toLowerCase().includes(orderSearchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col   lg:border-r lg:border-l pb-6 lg:pb-0 border-primary h-full relative items-center lg:h-[816px] font-worksans">
      <div className="flex w-full sm:px-5 items-center justify-between  border-b border-t border-primary h-[56px] relative sm:text-xl  text-black">
        <div className="flex gap-2 items-center justify-center text-black font-worksans">
          <Box size="32" />
          <span>All Orders</span>
        </div>
        <Button asChild variant="ghost" className="flex">
          <Link href="/orders">
            <span>view all</span>
            <ArrowRight2 size={18} />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex w-full items-center justify-center space-y-2 flex-col p-4">
          <Skeleton className="h-6 rounded-none w-full" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 rounded-none w-full" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 rounded-none w-full" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
          <Skeleton className="h-6 w-full rounded-none" />
        </div>
      ) : filteredOrders.length < 1 ? (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyState1
            title={
              !hasSearchTerm
                ? "No Order with the provided id"
                : "There's no Orders yet"
            }
            text={
              !hasSearchTerm
                ? "clear your search input"
                : "Try creating an order"
            }
            Button={
              <>
                {!hasSearchTerm ? (
                  <button
                    onClick={() => setOrderSearchTerm("")}
                    className="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4"
                  >
                    Clear Input
                  </button>
                ) : (
                  <button className="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4">
                    Create Order
                  </button>
                )}
              </>
            }
          />
        </div>
      ) : (
        <table className="min-w-full rounded-xl">
          <thead>
            <tr className="bg-gray-50 divide-x divide-gray-300">
              <th className="px-4 py-3 text-left text-sm text-black">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-sm text-black">Status</th>
              <th className="px-4 py-3 text-left text-sm text-black">Date</th>
              <th className="px-4 py-3 text-left text-sm text-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="divide-x divide-gray-300">
                <td className="px-4 py-3 text-left text-sm text-black">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: order.id.replace(
                        new RegExp(`(${orderSearchTerm})`, "gi"),
                        (match, group) =>
                          `<span style="color: black; background-color: ${
                            group.toLowerCase() ===
                            orderSearchTerm.toLowerCase()
                              ? "yellow"
                              : "inherit"
                          }">${match}</span>`
                      ),
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-left text-sm text-black">
                  {order.status}
                </td>
                <td className="px-4 py-3 text-left text-sm text-black">
                  {format(new Date(order.updatedAt), "PPP")}
                </td>
                <td className="px-4 py-3 text-left text-sm text-black">
                  <Button className="py-4 px-2">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export { DashBoardNav, OrdersPreview };
