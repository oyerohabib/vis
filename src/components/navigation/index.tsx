"use client";
import { cn } from "@/utils";
import { NAV_LINKS } from "@/constants";
import { useStateCtx } from "@/context/StateCtx";
import useWindowHeight from "@/hooks/useDimension";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const MainNav = () => {
  const { showMobileMenu, setShowMobileMenu } = useStateCtx();
  const searchParams = useSearchParams().get("path");
  const scrollHeight = useWindowHeight();
  const pathname = usePathname();

  const [isActive, setIsActive] = useState("");
  useEffect(() => {
    if (searchParams) {
      setIsActive(searchParams);
      return;
    }
  }, [searchParams]);
  const home = "/";

  return (
    <nav
      className={cn(
        " max-[500px]:py-2 px-4 sm:px-8 xl:px-16 2xl:px-24 flex w-full justify-between items-center  transition-colors duration-500",
        scrollHeight > 200
          ? " fixed backdrop-blur-xl top-0 left-0  z-50 -translate-y-28 bg-white/90 opacity-0 animate-slideDown py-2 shadow-md"
          : "sm:py-6 py-4",
        pathname === home ? "fixed top-0 le9ft-0 z-[150]" : "",
        {
          "bg-white/60 ": scrollHeight > 800 && scrollHeight < 4300,
        }
      )}
    >
      <Link
        href="/?path=home"
        className={cn(
          " max-sm:w-[120px] max-[450px]:w-[100px]",
          scrollHeight > 200 ? "w-[120px] " : "w-fit"
        )}
      >
        <Image
          src={scrollHeight > 200 ? "/bluelogo.png" : "/logo.png"}
          alt="logo"
          width={55}
          height={18}
          loading="eager"
        />
      </Link>
      <div className="hidden lg:flex items-center gap-x-5 lg:gap-x-7 2xl:gap-x-10 w-full justify-center max-w-[60%]">
        {NAV_LINKS.map((link) => (
          <Link
            href={
              link.link === "home"
                ? "/?path=home"
                : `${link.link}?path=${link.link}`
            }
            key={link.id}
            onClick={() => {
              setIsActive(link.link);
            }}
            className={cn(
              " w-full text-white  flex justify-center capitalize text-base text-[16px] relative font-medium  before:bg-primary before:w-[0%] before:h-1 before:absolute before:-bottom-2 before:left-0 before:transition-all before:duration-500 ",
              scrollHeight > 200 && "text-black",
              isActive === link.link ? "before:w-full text-primary" : "",
              pathname === home && scrollHeight < 200
                ? "text-white"
                : "text-black"
            )}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex gap-x-3 xl:gap-x-5 [&>button]:bg-white [&>button]:w-[150px] [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md [&>button:last-child]:bg-primary  [&>button:last-child]:text-white [&>button]:font-medium [&>button]:text-primary h-[56px]">
        <button
          type="button"
          className={cn(
            scrollHeight > 200 && "border border-primary bg-transparent"
          )}
        >
          Login
        </button>
        <button type="button">Get started</button>
      </div>
    </nav>
  );
};

export { MainNav };
