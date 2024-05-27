import React from "react";
import { Privacy } from "@/modules/privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Page",
};

const page = () => {
  return (
    <>
      <Privacy />
    </>
  );
};

export default page;
