import React from "react";
import { FAQ } from "@/modules/faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked questions",
};

const page = () => {
  return (
    <>
      <FAQ />
    </>
  );
};

export default page;
