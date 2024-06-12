"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import { getallorders } from "@/actions/order";
import { Order } from "@/types";
import Link from "next/link";

const DashBoardNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="w-full h-[40px]  min-[900px]:h-[56px] flex items-center justify-between gap-x-2 sm:gap-x-4 px-2 sm:px-4">
      <div className="flex w-full sm:max-w-[413px] justify-center relative">
        <div className="flex items-center w-full relative">
          <Input
            placeholder="search order...."
            tabIndex={0}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            className=" w-full h-[40px] min-[900px]:h-[56px] outline-none text-black text-md font-medium rounded-md"
          />
          {searchTerm.length === 0 ? (
            <span className="absolute right-3 text-primary">
              <SearchNormal size={18} />
            </span>
          ) : (
            <span
              className={cn(
                "absolute right-3 text-primary transition-opacity duration-700",
                {
                  "opacity-0 duration-300": !searchTerm,
                }
              )}
              role="button"
              tabIndex={0}
              aria-label="Clear search"
              onClick={() => setSearchTerm("")}
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
          //   aria-expanded={createProjectModal}
          id="create-project"
          type="button"
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
          //   aria-expanded={createProjectModal}
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
  const [orders, setOrders] = useState<Order | null>(null);
  const [isLoading, startTransition] = useTransition();
  useEffect(() => {
    const fetchData = async () => {
      startTransition(() =>
        getallorders().then((res) => {
          setOrders(res.orders);
        })
      );
    };
    fetchData();
  });
  console.log(orders);
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
    </section>
  );
};

export { DashBoardNav, OrdersPreview };
