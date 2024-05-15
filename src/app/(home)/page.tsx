import React from "react";
import {
  HeroSection,
  Statistics,
  Patners,
  WhatWeDo,
  CoveredLocation,
  FeedBack,
  GiveReview,
} from "@/modules/home";

const HOME = () => {
  return (
    <div>
      <HeroSection />
      <Statistics />
      <Patners />
      <WhatWeDo />
      <CoveredLocation />
      <FeedBack />
      <GiveReview />
    </div>
  );
};

export default HOME;
