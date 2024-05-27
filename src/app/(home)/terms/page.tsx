import React from "react";
import { Terms } from "@/modules/terms";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms And Conditions",
};

const page = () => {
  return (
    <>
      <Terms />
    </>
  );
};

export default page;
