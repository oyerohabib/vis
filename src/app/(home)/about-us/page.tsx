import React from "react";
import { AboutHero, Services, BAL } from "@/modules/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT US",
};

const page = () => {
  return (
    <>
      <AboutHero />
      <Services />
      <BAL />
    </>
  );
};

export default page;
