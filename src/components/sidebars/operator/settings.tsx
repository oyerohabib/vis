"use client";

import * as React from "react";
import { Settingsnav } from "@/constants";
import { cn } from "@/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const OperatorSettingsSideBar = () => {
  const [activeLink, setActiveLink] = React.useState("");
  const searchParams = useSearchParams().get("setting_tab");

  React.useEffect(() => {
    setActiveLink(searchParams || "profile");
  }, [searchParams]);

  return (
    <section className="w-[220px] px-2 transition-all duration-300 py-4 lg:p-4 hidden md:flex flex-col gap-y-4 items-center lg:items-start fixed h-screen min-[1139px]:left-[270px] max-[1139px]:-ml-[26px] top-[50px] z-30 sm:top-[70px] md:top-[90px] overflow-y-auto border-r border-gray-200 sidebar-scroll overflow-x-hidden  select-none justify-between">
      <ul className="flex flex-col gap-y-4 w-full">
        {Settingsnav.map((link) => (
          <Link
            href={`/operator${link.path}?setting_tab=${link.path.replace(
              "/",
              ""
            )}`}
            aria-current={activeLink === link.name ? "page" : undefined}
            key={link.id}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveLink(link.path);
                return;
              }
            }}
            tabIndex={0}
            aria-label={link.name}
            className={cn(
              "w-full flex items-center gap-x-3 py-2 px-3 h-[52px] text-[#3a3a3a] font-medium text-base transition-colors duration-300 cursor-pointer ",
              activeLink === link.path.replace("/", "")
                ? "bg-[#eaeef2] text-primary rounded outline-none"
                : "hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
            onClick={() => setActiveLink(link.path.replace("/", ""))}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </section>
  );
};

export { OperatorSettingsSideBar };
