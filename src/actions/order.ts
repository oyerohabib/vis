"use server";

import Calls from "./axios";
import { baseurl } from "@/utils";
import { getrefreshtoken } from "./refreshToken";

const $Http = Calls(`${baseurl}/order`);

const getallorders = async () => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const res = await $Http.get("/get-orders", config);
    return {
      status: res.status,
      message: res.data.message,
      orders: res.data.orders,
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export { getallorders };
