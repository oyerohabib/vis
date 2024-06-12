"use server";

import Calls from "./axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { baseurl } from "@/utils";

interface DecodedToken {
  exp: number;
}

const $Http = Calls(baseurl);

const getrefreshtoken = async () => {
  const token = cookies()?.get("access_token")?.value;

  if (!token) {
    return {
      status: 401,
      message: "No refresh token available",
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const decoded: DecodedToken | null = jwtDecode<DecodedToken>(token);
    if (!decoded) {
      return {
        status: 401,
        message: "Invalid token",
      };
    }

    const expInMilliseconds = decoded.exp * 1000;
    const expirationDate = new Date(expInMilliseconds);

    console.log(expirationDate);

    const oneHourFromNow = new Date(Date.now() - 3600000);
    if (expirationDate > oneHourFromNow) {
      return {
        status: 200,
        refreshToken: token,
      };
    }

    const res = await $Http.get("/user/refresh-token", config);

    return {
      status: res.status,
      refreshToken: res.data.refreshToken,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { getrefreshtoken };


