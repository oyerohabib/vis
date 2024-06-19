"use client";

import React, { useTransition } from "react";
import { cn } from "@/utils";
import { verifyOperator as verify } from "@/actions/verification";

const VerifyOperator = () => {
  return (
    <main className="container flex flex-col my-[20px] md:my-20 items-center justify-center">
      <div className="w-[50%]">
        <p className="first-line:tracking-widest first-letter:text-3xl md:first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
          At viscio before you get your verification badge we need to confirm a
          few things
        </p>
        <form action=""></form>
      </div>
    </main>
  );
};

export { VerifyOperator };
