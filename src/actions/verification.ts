import { VerifyOperatorSchema } from "@/schemas";
import { baseurl } from "@/utils";
import * as z from "zod";
import Calls from "./axios";

const $Http = Calls(`${baseurl}/user`);

const verifyOperator = async (values: z.infer<typeof VerifyOperatorSchema>) => {
  const validatedFields = VerifyOperatorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }
  const { cacNumber, ninNumber, mobilityType, vechLicense, driversLicense } =
    validatedFields.data;

  try {
    const res = await $Http.post("/verify-operator", {
      cacNumber,
      ninNumber,
      mobilityType,
      vechLicense,
      driversLicense,
    });
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
export { verifyOperator };
