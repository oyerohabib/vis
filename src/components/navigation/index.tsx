/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { cn } from "@/utils";
import { NAV_LINKS } from "@/constants";
import { useStateCtx } from "@/context/StateCtx";
import useWindowHeight from "@/hooks/useDimension";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseSquare, HambergerMenu } from "iconsax-react";
import { SkeletonNavbar } from "../skeltons";
import { Button } from "../ui/button";

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
          src={
            scrollHeight > 200
              ? "/bluelogo.png"
              : pathname === home
              ? "/logo.png"
              : "/bluelogo.png"
          }
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
      <div className="hidden lg:flex gap-x-3 xl:gap-x-5 items-center [&>Button]:bg-white [&>Button]:w-[150px] [&>Button]:px-4 [&>Button]:py-2 [&>Button]:rounded-md [&>Button:last-child]:bg-primary  [&>Button:last-child]:text-white [&>Button]:font-medium [&>Button]:text-primary h-[56px]">
        <Button
          asChild
          className={cn(
            scrollHeight > 200 && "border border-primary bg-transparent ",
            "bg-white text-primary py-2 w-[150px] px-4 h-[56px] hover:bg-white"
          )}
        >
          <Link href="/auth/sign-in">Login</Link>
        </Button>
        <Button
          className="bg-primary text-white py-2 w-[150px] h-[56px] hover:bg-primary"
          asChild
          type="button"
        >
          <Link href="/auth/sign-up">Get started</Link>
        </Button>
      </div>
      <div
        tabIndex={0}
        className="lg:hidden text-2xl cursor-pointer"
        onClick={() => setShowMobileMenu(true)}
      >
        <HambergerMenu className="text-primary" />
      </div>
      <Suspense fallback={<SkeletonNavbar />}>
        <MobileNav />
      </Suspense>
    </nav>
  );
};

const MobileNav = () => {
  const { showMobileMenu, setShowMobileMenu } = useStateCtx();
  const [isActive, setIsActive] = useState("");
  const searchParams = useSearchParams().get("path");

  useEffect(() => {
    if (searchParams) {
      setIsActive(searchParams);
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMobileMenu]);

  return (
    <>
      <div
        className={cn(
          "lg:hidden fixed min-h-screen w-full bg-black/50 top-0 left-0 z-20 transition-all duration-300",
          showMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowMobileMenu(false)}
      />
      <nav
        className={cn(
          "pt-20 lg:hidden  px-4 sm:px-8 xl:px-16 2xl:px-24 flex w-full max-w-[300px] sm:max-w-[70%] md:max-w-[50%] justify-between items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg fixed right-0 top-0 z-50 h-screen transition-all opacity-0",
          showMobileMenu
            ? "translate-x-0 duration-1000 opacity-100"
            : "translate-x-full duration-300"
        )}
      >
        <button
          autoFocus
          aria-label="close menu"
          type="button"
          className="outline-none text-primary text-2xl sm:text-4xl absolute top-2 right-2  flex justify-center items-center"
          onClick={() => setShowMobileMenu(false)}
          tabIndex={0}
        >
          <CloseSquare variant="Bold" />
        </button>
        <div className="flex-col flex justify-between h-full w-full ">
          <div className="flex flex-col  items-start h-full gap-y-10 ">
            {NAV_LINKS.map((link) => (
              <Link
                tabIndex={0}
                aria-label={link.label}
                href={
                  link.link === "home"
                    ? "/?path=home"
                    : `${link.link}?path=${link.link}`
                }
                key={link.id}
                onClick={() => {
                  setIsActive(link.link);
                  setShowMobileMenu(false);
                }}
                className={cn(
                  " focus-visible:rounded-md focus-visible:border-2 outline-none focus-visible:p-1 focus-visible:border-primary text-black  flex justify-center capitalize relative font-medium  before:bg-primary before:w-[0%] before:h-1 before:absolute before:-bottom-2 before:left-0 before:transition-all before:duration-500 text-lg",
                  isActive === link.link ? "before:w-full text-primary" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="lg:hidden flex flex-col gap-y-5 [&>button]:bg-white [&>button]:w-[150px] [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md [&>button:last-child]:bg-primary  [&>button:last-child]:text-white [&>button]:font-medium [&>button]:text-primary h-[56px]">
              <Button
                asChild
                className={cn(
                  "bg-white text-primary py-2 w-[150px] px-4 h-[56px] hover:bg-white"
                )}
              >
                <Link href="/auth/sign-in">Login</Link>
              </Button>
              <Button
                className="bg-primary text-white py-2 w-[150px] h-[56px] hover:bg-primary"
                asChild
                type="button"
              >
                <Link href="/auth/sign-up">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export { MainNav };
