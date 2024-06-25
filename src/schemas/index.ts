import * as z from "zod";
import validator from "validator";

export const RegisterSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name is required",
  }),

  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  passwordConfirm: z.string().min(5, {
    message: "Password confirmation must be at least 5 characters long",
  }),

  phoneNumber: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  referralCode: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, {
    message: "Password is required",
  }),
});

export const OtpSchema = z.object({
  otp: z.string(),
});

export const createOrderschema = z.object({
  pickupname: z.string().min(3, {
    message: "Pickup name is required",
  }),
  pickupaddress: z.string().min(3, {
    message: "Pickup address is required",
  }),
  pickupitem: z.string().array().nonempty({
    message: "Can't be empty!",
  }),
  pickupphone: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  deliverymode: z.enum(
    ["bicycle", "bike", "car", "truck", "cargo", "express"],
    {
      message: "You need to select a Delivery Mode type.",
    }
  ),
  dropoffname: z.string().min(3, {
    message: "Delivery mode is required",
  }),
  dropoffaddress: z.string().min(3, {
    message: "Dropoff address is required",
  }),
  dropoffphone: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  deliverytype: z.enum(["city", "inter-state", "inter-country"], {
    message: "You need to select a Delivery Mode type.",
  }),
  note: z.string().optional(),
  insurance: z.boolean(),
  weight: z.string().optional(),
  itemvalue: z.string().optional(),
});

export const VerifyOperatorSchema = z.object({
  ninNumber: z.string().optional(),
  cacNumber: z.string().optional(),
  vechLicense: z.string().min(3, {
    message: "plate number must be at least 6 characters long",
  }),
  mobilityType: z.array(z.string()),
  document: z.array(z.string()).optional(),
});



export const bidSchema = z.object({
  price: z.string().min(3, {
    message: "enter a valid price",
  }), deliveryhour: z.string().min(3, {
    message: "enter a valid delivery hour",
  })
  , orderId: z.string().min(3, {
    message: "enter a valid order id",
  })
})