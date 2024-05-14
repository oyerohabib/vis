import React from "react";
import { HeroSection, Statistics, Patners } from "@/modules/home";

const HOME = () => {
  return (
    <div 
    // className="overflow-x-hidden"
    >
      <HeroSection />
      <Statistics />
      <Patners />
    </div>
  );
};

export default HOME;
