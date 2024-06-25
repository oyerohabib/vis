import { VerifyOperatorSchema } from "@/schemas";
import { baseurl } from "@/utils";
import * as z from "zod";
import Calls from "./axios";
import { getrefreshtoken } from "./refreshToken";

const $Http = Calls(`${baseurl}/user`);

const verifyOperator = async (values: z.infer<typeof VerifyOperatorSchema>) => {
  const { refreshToken } = await getrefreshtoken();

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const validatedFields = VerifyOperatorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }


  try {
    const res = await $Http.post("/verify-operator", validatedFields.data, config);
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
export { verifyOperator };
