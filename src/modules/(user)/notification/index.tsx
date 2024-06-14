"use client";

import React from "react";
import { cn, timeAgo } from "@/utils";
import Image from "next/image";
import { Notification } from "@/types";
import { useOrderCtx } from "@/context/OrderCtx";
import { useSession } from "next-auth/react";

const UnreadCount = () => {
  const { Notifications } = useOrderCtx();
  const unreadCount = getUnreadNotificationCount(Notifications);
  return (
    <div className="text-white bg-primary font-extrabold h-6 w-6 flex items-center justify-center rounded-md leading-tight text-center">
      <span className="select-none">{unreadCount}</span>
    </div>
  );
};

const Notificationcard = ({
  read,
  avatar,
  from,
  item,
  userId,
}: Notification) => {
  return (
    <div
      className={cn(
        "card flex items-start p-4 sm:px-[19px] rounded-[10px] gap-[13px] sm:gap-[19px]",
        !read ? "" : ""
      )}
    >
      <Image
        src={avatar}
        alt=""
        width={39}
        height={39}
        className="sm:w-[45px] overflow-hidden flex-shrink-0"
      />
      <div
        className={cn(
          "md:text-sm text-base text-black grow flex items-start gap-[13px] justify-between"
        )}
      >
        <div>
          <p className="space-x-1.5">
            <span className="font-bold font-worksans">{from}</span>
            <NotificationCase item={item} userId={userId} />
            {!read && <UnreadIndicator />}
          </p>
        </div>
      </div>
    </div>
  );
};

function UnreadIndicator() {
  return (
    <svg
      viewBox="0 0 8 8"
      width={8}
      fill="currentColor"
      className="unread-indicator inline text-primary-red relative bottom-[1.5px]"
      aria-label="Unread"
    >
      <circle cx={4} cy={4} r={4} />
    </svg>
  );
}

const NotificationList = () => {
  const { Notifications } = useOrderCtx();
  console.log(Notifications);
  return (
    <ul className="space-y-[11px]">
      {Notifications.map((note) => (
        <li key={note.id}>
          <Notificationcard {...note} />
        </li>
      ))}
    </ul>
  );
};

interface item {
  item: {
    type: string;
    body: string;
  };
  userId: string;
}

const getUnreadNotificationCount = (notifications: Notification[]): number => {
  return notifications.filter((notification) => !notification.read).length;
};

const NotificationCase = ({ item, userId }: item) => {
  const { data: session } = useSession();
  const isOwner = userId === session?.user?.id;
  let content;
  if (!item) {
    content = "created an order";
  } else {
    switch (item.type) {
      case "order":
        if (isOwner) {
          content = item.body;
        }
        break;
      case "message":
        content = "sent you a private message";
        break;
      case "ORDER_DELETED":
        content = "deleted an order";
        break;
      default:
        content = "created an order";
        break;
    }
  }

  return <span>{content}</span>;
};

export { NotificationList, UnreadCount };
