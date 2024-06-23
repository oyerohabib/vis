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
  Bookmark,
  Notification1,
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
import { Notificationcard } from "../notification";

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
  const { orders, orderSearchTerm, setOrderSearchTerm } = useOrderCtx();

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

      {filteredOrders.length < 1 ? (
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
            Item={
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
        <>
          <table className="min-w-full w-full rounded-xl hidden md:block">
            <thead>
              <tr className="bg-gray-50 divide-x divide-gray-300">
                <th className="px-4 py-3 text-left text-sm text-black">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm text-black">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm text-black">Date</th>
                <th className="px-4 py-3 text-left text-sm text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 overflow-x-hidden overflow-y-auto">
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
          <div className="flex w-full flex-col max-w-[687px] hide-scroll overflow-y-auto md:hidden">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="w-full flex justify-between border-t border-b border-gray-200 py-2 gap-x-2"
              >
                <div className="flex w-full flex-col items-start justify-between gap-y-1 min-[400px]:gap-y-2">
                  <h3 className="font-medium text-sm sm:text-base text-header dark:text-gray-100">
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
                  </h3>
                  <p className="text-xs min-[400px]:text-sm sm:text-base text-header dark:text-gray-400">
                    {order.pickupitem.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </div>
                <div className="flex w-full  max-w-[130px] sm:max-w-[160px] flex-col items-end justify-between">
                  <p className="text-xs sm:text-sm opacity-70 text-header dark:text-gray-300">
                    {format(new Date(order.updatedAt), "PPP")}
                  </p>
                  <span
                    className={cn("px-2  rounded-full text-sm", {
                      "bg-green-100 text-green-700":
                        order.status === "delivered",
                      "bg-yellow-100 text-yellow-900":
                        order.status === "in-tranist",
                      "bg-red-100 text-red-900": order.status === "canceled",
                      "bg-blue-100 text-blue-700": order.status === "pending",
                    })}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

const NotificationPreview = () => {
  const { Notifications } = useOrderCtx();

  return (
    <section className="flex flex-col w-full   border-r-[#e1e1e1] h-full items-center jusstify-center lg:h-[408px]">
      <div className="flex w-full sm:px-5 items-center justify-between mb-6 border-b border-t border-primary h-[56px] relative md:text-xl">
        <div className="flex gap-2 items-center justify-center text-header dark:text-gray-200">
          <Notification1 size="32" />
          <span>Notification</span>
        </div>
        <Button asChild variant="ghost" className="flex">
          <Link href="/notification">
            <span>view all</span>
            <ArrowRight2 size={18} />
          </Link>
        </Button>
      </div>
      {Notifications.length < 1 ? (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyState1
            title="There's no Notifications yet"
            text="Try creating an order"
            Item={
              <button className="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4">
                keep working
              </button>
            }
          />
        </div>
      ) : (
        <ul className="space-y-[11px] px-2">
          {Notifications.map((note) => (
            <li key={note.id}>
              <Notificationcard {...note} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { DashBoardNav, OrdersPreview, NotificationPreview };
