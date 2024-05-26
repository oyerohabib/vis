import React from "react";
import {
  HeroSection,
  Stat,
  Patners,
  WhatWeDo,
  CoveredLocation,
  Feedback,
} from "@/modules/home";

const page = () => {
  return (
    <>
      <HeroSection />
      <Stat />
      <Patners />
      <WhatWeDo />
      <CoveredLocation />
      <Feedback />
    </>
  );
};

export default page;
