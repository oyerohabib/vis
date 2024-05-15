import React from "react";
import {
  HeroSection,
  Statistics,
  Patners,
  WhatWeDo,
  CoveredLocation,
} from "@/modules/home";

const HOME = () => {
  return (
    <div>
      <HeroSection />
      <Statistics />
      <Patners />
      <WhatWeDo />
      <CoveredLocation />
    </div>
  );
};

export default HOME;
