"use client";

import { useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/utils";
import { Input } from "../ui/input";
// import { LoginWithGoggle } from "@/modules/auth/social";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeSlash } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { OtpModal } from "@/components/modals";
import { User } from "@/types";
import { register } from "@/actions/auth";

const UserSignup = () => {
  const { toast } = useToast();
  const [defaultInpType, setDefaultInpType] = useState<"password" | "text">(
    "password"
  );
  const [user, setuser] = useState<User>();
  const { setShowOtp } = useStateCtx();
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      passwordConfirm: "",
      fullName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      toast({
        title: "ew",
        description: "ew",
      });
      // register(values).then((data) => {
      //   toast({
      //     title:
      //       data.status === 201
      //         ? "Registration successfully!"
      //         : "An error occured",
      //     description: `${data.message}`,
      //   });

      //   if (data.status === 201) {
      //     setShowOtp(true);
      //     setuser(data.user);
      //   }
      // });
    });
  };

  const handle = () => {
    toast({
      title: "ew",
      description: "ew",
    });
  };
  return (
    <>
      <div className="rounded-2xl bg-white shadow-2xl px-4 w-full py-5">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col mt-8 gap-y-6 md:gap-y-6 "
            onSubmit={form.handleSubmit(handle)}
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="fullName"
                        disabled={isLoading}
                        type="text"
                        className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                        placeholder="email | username"
                      />
                      <FormLabel
                        htmlFor="fullName"
                        className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                      >
                        FullName
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        disabled={isLoading}
                        className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                        placeholder="email | username"
                      />
                      <FormLabel
                        htmlFor="email"
                        className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                      >
                        Email
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="phoneNumber"
                        type="phone"
                        disabled={isLoading}
                        className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                        placeholder="email | username"
                      />
                      <FormLabel
                        htmlFor="phoneNumber"
                        className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                      >
                        Phone Number
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full relative items-center">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          id="password"
                          disabled={isLoading}
                          type={defaultInpType}
                          className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                          placeholder="email | username"
                        />
                        <FormLabel
                          htmlFor="email"
                          className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                        >
                          Password
                        </FormLabel>
                        <span className="absolute right-2 top-4">
                          {defaultInpType === "text" ? (
                            <Eye
                              color="#777"
                              onClick={() => setDefaultInpType("password")}
                            />
                          ) : (
                            <EyeSlash
                              color="#777"
                              onClick={() => setDefaultInpType("text")}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full relative items-center">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          id="confirmpassword"
                          type={defaultInpType}
                          disabled={isLoading}
                          className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                          placeholder="email | username"
                        />
                        <FormLabel
                          htmlFor="email"
                          className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                        >
                          Confirm Password
                        </FormLabel>
                        <span className="absolute right-2 top-4">
                          {defaultInpType === "text" ? (
                            <Eye
                              color="#777"
                              onClick={() => setDefaultInpType("password")}
                            />
                          ) : (
                            <EyeSlash
                              color="#777"
                              onClick={() => setDefaultInpType("text")}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referralCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="referralCode"
                        type="text"
                        disabled={isLoading}
                        className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                        placeholder="email | username"
                      />
                      <FormLabel
                        htmlFor="referralCode"
                        className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                      >
                        Referal Code
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="mb-4 text-xs dark:text-dark-background text-background">
              Forgot password?{" "}
              <Link
                href="/auth/forgot-password"
                className="text-primary font-medium"
              >
                Reset
              </Link>
            </span>
            <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
              <Button
                type="submit"
                className={cn(
                  "rounded-full w-full h-[56px] font-medium font-worksans flex items-center space-x-2 text-[16px] bg-primary text-white hover:bg-primary",
                  isLoading && "relative"
                )}
              >
                {isLoading ? (
                  <>
                    <svg
                      viewBox="0 0 240 240"
                      height="240"
                      width="240"
                      className="pl relative"
                    >
                      <circle
                        strokeLinecap="round"
                        strokeDashoffset="-330"
                        strokeDasharray="0 660"
                        strokeWidth="20"
                        stroke="#000"
                        fill="none"
                        r="105"
                        cy="120"
                        cx="120"
                        className="pl__ring pl__ring--a"
                      ></circle>
                      <circle
                        strokeLinecap="round"
                        strokeDashoffset="-110"
                        strokeDasharray="0 220"
                        strokeWidth="20"
                        stroke="#000"
                        fill="none"
                        r="35"
                        cy="120"
                        cx="120"
                        className="pl__ring pl__ring--b"
                      ></circle>
                      <circle
                        strokeLinecap="round"
                        strokeDasharray="0 440"
                        strokeWidth="20"
                        stroke="#000"
                        fill="none"
                        r="70"
                        cy="120"
                        cx="85"
                        className="pl__ring pl__ring--c"
                      ></circle>
                      <circle
                        strokeLinecap="round"
                        strokeDasharray="0 440"
                        strokeWidth="20"
                        stroke="#000"
                        fill="none"
                        r="70"
                        cy="120"
                        cx="155"
                        className="pl__ring pl__ring--d"
                      ></circle>
                    </svg>
                  </>
                ) : (
                  " Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* <div className="seperator flex items-center space-x-2 my-4">
          <div className="seperate h-[1px] dark:bg-dark-background bg-background w-full" />
          <h4 className="text-dark-copy dark:text-copy"> Or</h4>
          <div className="seperate h-[1px] dark:bg-dark-background bg-background w-full" />
        </div>
        <LoginWithGoggle /> */}
        <span className="mt-5 md:mt-8 text-sm relative block text-center text-dark-copy dark:text-copy z-10">
          Alreaady have an account?
          <Link href="/auth/login" className="ml-1 underline font-medium">
            Login
          </Link>
        </span>
        {user && <OtpModal {...user} />}
      </div>
    </>
  );
};

const OperatorSignup = () => {
  return (
    <>
      <div>operatoe</div>
    </>
  );
};

export { UserSignup, OperatorSignup };
