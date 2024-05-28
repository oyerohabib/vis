"use client";
import React from "react";
import { UserSignup, OperatorSignup } from "@/components/form/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserRegister = () => {
  return (
    <>
      <main className="md:container flex md:my-[100px] my-[50px] items-center justify-center">
        <Tabs defaultValue="user" className="w-[380px] md:w-[70%]">
          <div className="px-5">
            <h2 className="text-primary capitalize text-xl font-medium md:text-4xl">
              Create Account
            </h2>
            <span className="text-base">continue as</span>
          </div>
          <TabsList className="grid w-full grid-cols-2 my-5">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="operator">Operator</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserSignup />
          </TabsContent>
          <TabsContent value="operator">
            <OperatorSignup />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export { UserRegister };
