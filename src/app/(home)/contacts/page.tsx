import React from "react";
import { ContactUs } from "@/modules/constac";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

const page = () => {
  return (
    <>
      <ContactUs />
    </>
  );
};

export default page;
