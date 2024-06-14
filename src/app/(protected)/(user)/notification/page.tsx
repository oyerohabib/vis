import React from "react";
import { NotificationList, UnreadCount } from "@/modules/(user)/notification";

const page = () => {
  return (
    <section
      aria-labelledby="heading"
      className="md:py-8 px-2 py-4 bg-white w-full"
    >
      <div className="flex items-center gap-2 mb-6 sm:mb-[33px]">
        <h1
          id="heading"
          className="font-bold font-worksans text-xl sm:text-2xl"
        >
          Notifications
        </h1>
        <UnreadCount />
      </div>
      <NotificationList />
    </section>
  );
};

export default page;
