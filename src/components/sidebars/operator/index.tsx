"use client";
import { Setting2, LogoutCurve, Verify } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { OPERATOR_SIDEBAR_LINKS } from "@/constants";
import { cn, shrinkString } from "@/utils";
import { useUserCtx } from "@/context/UserCtx";

const OPERATORSideBar = () => {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user: session } = useUserCtx();

  useEffect(() => {
    const currentPath = pathname;

    setActiveLink(currentPath.trim());
  }, [pathname]);

  return (
    <section className="bg-primary z-[50] w-[0px] md:w-[96px] min-[1140px]:w-[270px] hover:w-[270px] hover:p-4 transition-all duration-300 py-4 min-[1140px]:p-4 hidden md:flex flex-col gap-y-4 items-center justify-between min-[1140px]:items-start fixed h-screen left-0 top-0 overflow-y-auto border-r border-gray-200  sidebar-scroll overflow-x-hidden group select-none">
      <Link href="/dashboard">
        <Image src="/main.png" alt="Logo" width={155} height={53} />
      </Link>
      <ul className="flex flex-col gap-y-4 pt-8">
        {OPERATOR_SIDEBAR_LINKS.map((link) => (
          <Link
            href={`/operator/${link.link}`}
            aria-current={activeLink === link.link ? "page" : undefined}
            key={link.id}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveLink(link.link);
                return;
              }
            }}
            tabIndex={0}
            aria-label={link.label}
            className={cn(
              "flex items-center gap-x-3 py-2 px-3 h-[52px] text-white font-medium text-base transition-colors duration-300 cursor-pointer ",
              activeLink === `/operator/${link.link}`
                ? "bg-white text-primary rounded outline-none"
                : "hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/35"
            )}
            onClick={() => setActiveLink(`/operator/${link.link}`)}
          >
            <link.icon
              size={24}
              aria-hidden
              variant={activeLink === link.link ? "Bulk" : "Outline"}
            />

            <span className=" max-[1139px]:hidden group-hover:block w-[185px]">
              {link.label}
            </span>
          </Link>
        ))}

        <span className="bg-[#8e8e8e] w-full max-w-[245px] h-[1px] " />
      </ul>
      <ul className="flex flex-col w-full gap-y-6 xl:gap-y-8 pt-4 items-center">
        <Link
          href="/settings"
          role="button"
          tabIndex={0}
          aria-label="/operator/settings"
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveLink("/operator/settings");
              return;
            }
          }}
          className={cn(
            "flex group-hover:w-full min-[1140px]:w-full min-[1140px]:justify-start items-center gap-x-3 py-2 px-3 h-[52px] text-white font-medium text-base transition-colors duration-300 cursor-pointer",
            activeLink === "settings"
              ? "bg-white text-primary rounded outline-none"
              : "hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/35"
          )}
          onClick={() => setActiveLink("/operator/settings")}
        >
          <Setting2
            size={24}
            aria-hidden
            variant={activeLink === "/operator/settings" ? "Bulk" : "Outline"}
          />
          <span className=" max-[1139px]:hidden group-hover:block">
            Settings
          </span>
        </Link>

        <Link
          href="/operator/profile"
          className={cn(
            "w-full flex items-center gap-x-[6px]  p-2 transition-colors duration-300 justify-center mb-4",
            activeLink === "/operator/profile"
              ? "bg-white text-primary rounded outline-none"
              : "hover:bg-black/10 focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/35"
          )}
          role="button"
          tabIndex={0}
          aria-label="Profile"
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveLink("/operator/profile");
              return;
            }
          }}
          onClick={() => setActiveLink("/operator/profile")}
        >
          <div className="relative w-full max-w-[60px] flex justify-center h-[60px] rounded-full ">
            <Image
              src={
                session?.image
                  ? session.image
                  : `https://ui-avatars.com/api/?name=${session?.fullName}&background=random`
              }
              alt="user"
              width={60}
              height={60}
              className="rounded-full object-contain"
            />

            <span className="w-[15px] h-[15px] bg-[#04802e] rounded-full border border- absolute bottom-1 right-1" />
          </div>
          <div className="flex flex-col  max-[1139px]:hidden w-full group-hover:w-full group-hover:flex">
            <span
              className="text-white text-base capitalize"
              title={session?.fullName}
            >
              {shrinkString({ str: session?.fullName!, len: 10 })}
            </span>
            {session.accountType === "operator" && (
              <>
                <span
                  className={cn(
                    session.isOperatorverified
                      ? "text-[#04802e]"
                      : " text-yellow-500"
                  )}
                >
                  <Verify variant="Bold" />
                  {!session.isOperatorverified && (
                    <span className="text-xs text-white">
                      your account has not been verified yet
                    </span>
                  )}
                </span>
              </>
            )}
          </div>
        </Link>

        {/* LogOut */}
        <button
          role="button"
          tabIndex={0}
          aria-label="logout"
          // onKeyUp={(e) => {
          //   if (e.key === "Enter" || e.key === " ") {
          //     router.push("/workspace");
          //     return;
          //   }
          // }}
          className={cn(
            "flex flex-nowrap group-hover:w-full min-[1140px]:w-full  min-[1140px]:justify-start items-center gap-x-3 py-2 px-3 h-[52px] text-[#e80000] font-medium text-sm transition-colors duration-300 cursor-pointer hover:bg-black/10 dark:hover:bg-color-dark/10  focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          )}
        >
          <LogoutCurve size={24} aria-hidden />
          <span className=" max-[1139px]:hidden group-hover:block">Logout</span>
        </button>
      </ul>
    </section>
  );
};

export { OPERATORSideBar };
