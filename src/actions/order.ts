"use server";

import Calls from "./axios";
import { baseurl } from "@/utils";
import { getrefreshtoken } from "./refreshToken";
import { createOrderschema } from "@/schemas";
import * as z from "zod";

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

const CreateOrder = async (values: z.infer<typeof createOrderschema>) => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const validatedFields = createOrderschema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }
  const {
    pickupname,
    pickupaddress,
    pickupitem,
    pickupphone,
    deliverymode,
    dropoffname,
    dropoffaddress,
    dropoffphone,
    deliverytype,
    note,
    weight,
    insurance,
    itemvalue,
  } = validatedFields.data;
  const orderData = {
    pickupname,
    pickupaddress,
    pickupitem,
    pickupphone,
    deliverymode,
    dropoffname,
    dropoffaddress,
    dropoffphone,
    deliverytype,
    note,
    weight,
    insurance,
    itemvalue,
  };
  try {
    const res = await $Http.post("/create-order", orderData, config);
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

export { getallorders, CreateOrder };
