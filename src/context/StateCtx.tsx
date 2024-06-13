"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";

interface StateContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  ShowOtp: boolean;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  swipeIndicator: boolean;
  setSwipeIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  createOrder: boolean;
  setCreateOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext({} as StateContextProps);

const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [ShowOtp, setShowOtp] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [swipeIndicator, setSwipeIndicator] = React.useState(false);
  const [createOrder, setCreateOrder] = React.useState(false);
  const [handleSwipe, setHandleSwipe] = React.useState<number | null>(null);

  const isAnyModalOpen = ShowOtp || createOrder;

  const anyMobileSidebarOpen = showMobileMenu || openSidebar;

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    );
  };

  useEffect(() => {
    if (!isMobileDevice()) return;
    const isSwiped = localStorage.getItem("swiped");
    if (isSwiped) {
      setSwipeIndicator(false);
      return;
    }
    if (openSidebar) {
      setSwipeIndicator(true);
    } else {
      setSwipeIndicator(false);
    }
  }, [openSidebar]);

  useEffect(() => {
    if (!isMobileDevice() || !("ontouchstart" in window)) return;
    const handleSwipeStart = (e: TouchEvent) => {
      setHandleSwipe(e.changedTouches[0].screenX);
    };
    const handleSwipeEnd = (e: TouchEvent) => {
      if (handleSwipe !== null) {
        const swipeDis = e.changedTouches[0].screenX - handleSwipe;
        const swipeThreshold = 70;

        if (swipeDis < -swipeThreshold) {
          localStorage.setItem("swiped", "true");
          console.log("first");
          setOpenSidebar(false);
        }

        setHandleSwipe(null);
      }
    };

    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchend", handleSwipeEnd);
    return () => {
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [handleSwipe]);

  useEffect(() => {
    if (anyMobileSidebarOpen || isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false);
        setOpenSidebar(false);
        setShowOtp(false);
        setCreateOrder(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anyMobileSidebarOpen, isAnyModalOpen]);

  useEffect(() => {
    const t = "%c  Made By \ud83d\udc9a  - Phoenix ",
      n = [
        "font-size: 12px",
        "color: #fffce1",
        "font-family: monospace",
        "background: #0e100f",
        "display: inline-block",
        "padding: 1rem 3rem",
        "border: 1px solid #0ff",
        "border-radius: 4px;",
      ].join(";");
    console.log(t, n);
  }, []);

  const value = useMemo(
    () => ({
      showMobileMenu,
      setShowMobileMenu,
      ShowOtp,
      setShowOtp,
      openSidebar,
      setOpenSidebar,
      swipeIndicator,
      setSwipeIndicator,
      createOrder,
      setCreateOrder,
    }),
    [
      showMobileMenu,
      setShowMobileMenu,
      ShowOtp,
      setShowOtp,
      openSidebar,
      setOpenSidebar,
      swipeIndicator,
      setSwipeIndicator,
      createOrder,
      setCreateOrder,
    ]
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

// Call this function whenever you want to use the context
export const useStateCtx = () => {
  const ctx = useContext(StateContext);

  if (!ctx) {
    throw new Error("useStateCtx must be used within a StateContextProvider");
  }
  return ctx;
};

export default StateContextProvider;
