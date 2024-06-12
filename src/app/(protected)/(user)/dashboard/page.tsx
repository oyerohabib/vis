import React from "react";
import { DashBoardNav, OrdersPreview } from "@/modules/(user)/dashboard";

const page = () => {
  return (
    <>
      <section className="min-h-[900px] w-full flex flex-col  pt-8 h-full">
        <DashBoardNav />
        <div className="flex-col flex lg:flex-row flex-1  w-full sm:px-3 mt-8 py-6 mb-6  h-full ">
          <div className="lg:w-[60%] w-full h-full flex-1">
            <OrdersPreview />
          </div>
          <div className="flex-col lg:w-[40%] w-full h-full flex-1"></div>
        </div>
      </section>
    </>
  );
};

export default page;
