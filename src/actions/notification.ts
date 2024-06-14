"use server";

import Calls from "./axios";
import { baseurl } from "@/utils";
import { getrefreshtoken } from "./refreshToken";


const $Http = Calls(`${baseurl}`);

const getNotification = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/all-notifications", config);
    return {
      status: res.status,
      message: res.data.message,
      notifications: res.data.notifications,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { getNotification };
