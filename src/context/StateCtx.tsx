"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";

interface StateContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  ShowAdminSidebar: boolean;
  setShowAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  Showprice: boolean;
  setShowprice: React.Dispatch<React.SetStateAction<boolean>>;
  selectedprice: string;
  setSelectedrice: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContext = createContext({} as StateContextProps);

const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [ShowAdminSidebar, setShowAdminSidebar] = React.useState(false);
  const [Showprice, setShowprice] = React.useState(false);
  const [selectedprice, setSelectedrice] = React.useState("");

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false);
        setShowAdminSidebar(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMobileMenu, ShowAdminSidebar]);

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
      ShowAdminSidebar,
      setShowAdminSidebar,
      Showprice,
      setShowprice,
      selectedprice,
      setSelectedrice,
    }),
    [
      showMobileMenu,
      setShowMobileMenu,
      ShowAdminSidebar,
      setShowAdminSidebar,
      Showprice,
      setShowprice,
      selectedprice,
      setSelectedrice,
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
