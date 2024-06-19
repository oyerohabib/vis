"use server";

import { LoginSchema, RegisterSchema, OtpSchema } from "@/schemas";
import * as z from "zod";
import { baseurl, response } from "@/utils";
import Calls from "./axios";
import { cookies } from "next/headers";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

const $Http = Calls(baseurl);

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const {
    email,
    fullName,
    password,
    passwordConfirm,
    referralCode,
    phoneNumber,
  } = validatedFields.data;

  if (password !== passwordConfirm) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }

  const userdata = { email, fullName, password, referralCode, phoneNumber };

  try {
    const res = await $Http.post("/user/signup", userdata);
    return {
      status: res.status,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const Otp = async (values: z.infer<typeof OtpSchema>, userId: string) => {
  const otp = values;

  const userdata = { otp, userId };

  try {
    const res = await $Http.post("/user/verify-otp", userdata);

    return {
      status: res.status,
      message: res.data.message,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const login = async (values: z.infer<typeof LoginSchema>) => {
  const cookie = cookies();
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }
  try {
    const res = await $Http.post("/user/login", validatedFields.data);
    cookie.set("access_token", res.data.token, {
      maxAge: 60 * 60 * 24 * 1,
      httpOnly: true,
      path: "/",
      priority: "high",
    });

    return {
      status: res.status,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const signInCredentials = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return response({
            success: false,
            error: {
              code: 401,
              message: "Invalid credentials.",
            },
          });

        case "Verification":
          return response({
            success: false,
            error: {
              code: 422,
              message: "Verification failed. Please try again.",
            },
          });

        default:
          return response({
            success: false,
            error: {
              code: 500,
              message: "Something went wrong.",
            },
          });
      }
    }

    throw error;
  }
};

const nextlogin = async (values: z.infer<typeof LoginSchema>) => {
  const cookie = cookies();
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  try {
    const res = await $Http.post("/user/login", validatedFields.data);
    cookie.set("access_token", res.data.token, {
      maxAge: 60 * 60 * 24 * 1,
      httpOnly: true,
      path: "/",
      priority: "high",
    });

    return {
      status: res.status,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

const registerOperator = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const {
    email,
    fullName,
    password,
    passwordConfirm,
    referralCode,
    phoneNumber,
  } = validatedFields.data;

  if (password !== passwordConfirm) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }

  // const 

  const userdata = { email, fullName, password, referralCode, phoneNumber };

  try {
    const res = await $Http.post("/user/signup", userdata);
    return {
      status: res.status,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { Otp, register, login, signInCredentials, nextlogin, registerOperator };
