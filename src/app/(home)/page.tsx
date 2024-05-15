import React from "react";
import { HeroSection, Statistics, Patners, WhatWeDo } from "@/modules/home";

const HOME = () => {
  return (
    <div
    // className="overflow-x-hidden"
    >
      <HeroSection />
      <Statistics />
      <Patners />
      <WhatWeDo />
    </div>
  );
};

export default HOME;
