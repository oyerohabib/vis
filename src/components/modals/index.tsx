/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useState,
  useId,
  useEffect,
  startTransition,
  useTransition,
} from "react";
import { useStateCtx } from "@/context/StateCtx";
import { FiAlertCircle } from "react-icons/fi";
import { cn } from "@/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "../ui/use-toast";
import { Order, User } from "@/types";
import { maskEmail } from "@/utils";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { OtpSchema, bidSchema, createOrderschema } from "@/schemas";
import { createBid, CreateOrder, GetOrderById } from "@/actions/order";
import * as z from "zod";
import { Otp } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useOrderCtx } from "@/context/OrderCtx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { useUserCtx } from "@/context/UserCtx";
import useMediaQuery from "@/hooks/use-media-query";
import { Sheet, SheetContent } from "../ui/sheet";
import { format } from "date-fns";

const OtpModal = ({ email, id }: User) => {
  const { ShowOtp, setShowOtp } = useStateCtx();
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (
    value: z.infer<typeof OtpSchema>,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault?.();
    startTransition(() => {
      Otp(value, id).then((data) => {
        toast({
          title:
            data.status === 200
              ? "OTP verification successfully!"
              : "An error occured",
          description: `${data.message}`,
          action: (
            <ToastAction altText="Login">
              <Link href="/auth/sign-in">Login</Link>
            </ToastAction>
          ),
        });

        if (data.status === 200) {
          setValue("");
          setShowOtp(false);

          router.push("/auth/sign-in");
        }
      });
    });
  };
  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          ShowOtp ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setShowOtp(false)}
      />
      <div
        role="dialog"
        aria-labelledby="make-payment"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[90%] h-[380px] min-[550px]:w-[500px] md:h-[400px] md:w-[682px]  justify-between items-start bg-white backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none ",
          ShowOtp
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-copy dark:text-dark-copy">
              <p>We have sent a code to your email {maskEmail(email)}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center justify-between h-full space-y-16">
              <div className="items-center justify-center mt-8 flex w-full ">
                <InputOTP
                  maxLength={6}
                  className="flex w-full"
                  onComplete={onSubmit}
                  value={value}
                  onChange={setValue}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="hidden md:block" />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={2}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="hidden md:block" />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={4}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1">
                  <p>Didn&apos;t recieve code?</p>
                  <button
                    className="flex flex-row items-center text-blue-600"
                    disabled
                  >
                    Resend
                  </button>
                </div>
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 ">
                  <p>OTP expires in 15 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CreateOrderModal = () => {
  const { createOrder, setCreateOrder } = useStateCtx();
  const { updateOrders } = useOrderCtx();
  const id = useId();
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();

  const { user: session } = useUserCtx();
  const form = useForm<z.infer<typeof createOrderschema>>({
    resolver: zodResolver(createOrderschema),
    defaultValues: {
      pickupname: "",
      pickupaddress: "",
      pickupphone: "",
      pickupitem: [""],
      weight: "",
      note: "",
      deliverymode: "car",
      dropoffname: "",
      dropoffaddress: "",
      dropoffphone: "",
      deliverytype: "city",
      insurance: false,
      itemvalue: "",
    },
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof createOrderschema>) => {
    startTransition(() => {
      CreateOrder(values).then((data) => {
        toast({
          title:
            data.status === 201
              ? "Order Created successfully!"
              : "An error occured",
          description: `${data.message}`,
        });
        if (data.status === 201) {
          form.reset();
          updateOrders();
          setCreateOrder(false);
          router.refresh();
        }
      });
    });
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 backdrop-blur-sm top-0 left-0  transition-all duration-300 z-[99]",
          createOrder ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCreateOrder(false)}
      />
      <div
        role="dialog"
        aria-labelledby="create-project"
        aria-modal
        className={cn(
          "pt-2 pb-6 sm:py-6 flex flex-col w-[98%] sm:w-[95%]  min-[500px]:h-[750px] 2xl:h-[820px] max-w-[1000px] h-[600px] max-h-[1458px]  justify-between items-start bg-white backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none font-worksans",
          createOrder
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "-translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-2 sm:pb-4  px-2 sm:px-4 md:pl-8">
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <Image
              src={
                session?.image
                  ? session.image
                  : `https://ui-avatars.com/api/?name=${session?.email}&background=random`
              }
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-primary font-semibold sm:text-lg tracking-wide">
              {session?.fullName}
            </span>
            <span className="text-primary  hidden sm:inline">
              <ChevronRight size={24} />
            </span>
            <span className="text-primary  sm:hidden">
              <ChevronRight size={18} />
            </span>{" "}
            <h3 className="sm:text-lg md:text-2xl font-medium text-primary ">
              New Project
            </h3>
          </div>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setCreateOrder(false)}
            className="text-red-600  rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <section className="w-full h-full overflow-x-hidden overflow-y-auto hide-scroll pt-2 sm:pt-4">
          <Form {...form}>
            <form
              action=""
              className="flex flex-col max-sm:gap-y-6 gap-y-4 lg:gap-y-6 py-4 xl:py-8 px-2 sm:px-4 md:px-6 lg:px-8 h-full w-full mb-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="pickupname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickup"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Pick Up FullName
                        </Label>
                        <Input
                          {...field}
                          id={id + "-pickup"}
                          type="text"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="Pick Up FullName"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupaddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickupaddress"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Pick Up Address
                        </Label>
                        <Input
                          {...field}
                          id={id + "-pickupaddresspickup"}
                          type="text"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="Pick Up Address"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupphone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickupphone"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Pick Up Phone Number
                        </Label>
                        <Input
                          {...field}
                          id={id + "-pickupphone"}
                          type="tel"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="(+234) 123 456 789"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickupitem"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickupitem"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Pick Up Pickup items
                        </Label>
                        <Textarea
                          {...field}
                          id={id + "-pickupitem"}
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[150px] resize-none"
                          placeholder="if the item is more than one use , to seprate them"
                          onChange={(e) => {
                            const value = e.target.value;
                            const items = value.split(",").map((item) => item);
                            field.onChange(items);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickup"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Total weight in kg
                        </Label>
                        <Input
                          {...field}
                          id={id + "-weight"}
                          type="text"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="weight in kg"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-note"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Add Any additional details about the items to be
                          picked
                        </Label>
                        <Textarea
                          {...field}
                          id={id + "-note"}
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[100px] resize-none"
                          placeholder="any helpful details"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliverymode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="flex flex-col gap-y-2"
                      >
                        <div className="flex flex-col gap-x-2 w-full">
                          <Label
                            htmlFor={id + "-deliverymode"}
                            className="text-sm sm:text-base font-medium"
                          >
                            Delivery Mode
                          </Label>
                          <div className="flex w-full gap-3 items-center justify-between">
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="bicycle" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bicycle
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="bike" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bike
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="car" />
                              </FormControl>
                              <FormLabel className="font-normal">Car</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="truck" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Truck
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="cargo" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Cargo
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="express" />
                              </FormControl>
                              <FormLabel className="font-normal flex flex-col">
                                Express Delivery{" "}
                                <span className="text-xs">
                                  (this might attract extra charges)
                                </span>
                              </FormLabel>
                            </FormItem>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-dropoffname"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Drop Off Name
                        </Label>
                        <Input
                          {...field}
                          id={id + "-dropoffname"}
                          type="text"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="Drop Off Name"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffaddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickupaddress"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Drop Off Address
                        </Label>
                        <Input
                          {...field}
                          id={id + "-dropoffaddress"}
                          type="text"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="Drop Off Address"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffphone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2 w-full">
                        <Label
                          htmlFor={id + "-pickupaddress"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Drop Off Phone Number
                        </Label>
                        <Input
                          {...field}
                          id={id + "-dropoffphone"}
                          type="tel"
                          disabled={isLoading}
                          className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                          placeholder="(234) 123 456 789"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliverytype"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                        className="flex flex-col gap-y-2"
                      >
                        <div className="flex flex-col gap-x-2 w-full">
                          <Label
                            htmlFor={id + "-deliverytype"}
                            className="text-sm sm:text-base font-medium"
                          >
                            Delivery Type
                          </Label>
                          <div className="flex w-full gap-3 items-center justify-between">
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="city" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                City (delivery within same state or city)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="inter-state" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Inter-State
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 gap-x-1">
                              <FormControl>
                                <RadioGroupItem value="inter-country" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Inter-Country
                              </FormLabel>
                            </FormItem>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-x-2 w-full">
                        <Label
                          htmlFor={id + "-pickupaddress"}
                          className="text-sm sm:text-base font-medium"
                        >
                          Insurance
                        </Label>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.getValues().insurance && (
                <FormField
                  control={form.control}
                  name="itemvalue"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col gap-y-2 w-full">
                          <Label
                            htmlFor={id + "-itemvalue"}
                            className="text-sm sm:text-base font-medium"
                          >
                            Total Extimated Price
                          </Label>
                          <Input
                            {...field}
                            id={id + "-itemvalue"}
                            type="text"
                            disabled={isLoading}
                            className="w-full rounded-md border md:py-4 py-2 px-2 md:px-4 outline-none h-[50px]"
                            placeholder="a value in naria"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex w-full justify-center sm:justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 py-6 max-sm:gap-x-5">
                <Button
                  type="button"
                  tabIndex={0}
                  aria-label="Cancel"
                  onClick={() => {
                    form.reset();
                  }}
                  variant="outline"
                  className={cn(
                    "rounded-lg border border-primary text-primary min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
                  )}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  tabIndex={0}
                  disabled={isLoading}
                  aria-label="Remove"
                  className={cn(
                    "rounded-lg bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:bg-primary/80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium"
                  )}
                >
                  {isLoading ? (
                    <div className="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </div>
    </>
  );
};

const VerifyOperatorModal = () => {
  const { verifyOperator, setVerifyOperator } = useStateCtx();
  const router = useRouter();
  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          verifyOperator ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setVerifyOperator(false)}
      />
      <div
        role="dialog"
        aria-labelledby="Action Modal"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[90%] h-[380px] min-[550px]:w-[500px] md:w-[682px] md:h-[400px] font-worksans items-center bg-white fixed top-1/2 left-1/2  z-[999]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          verifyOperator
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-2 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-red-500">
            Action Needed Urgerntly
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setVerifyOperator(false)}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="bg-red-500 w-16 h-16 mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
            <FiAlertCircle />
          </div>
          <h3 className="md:text-3xl text-lg font-semibold text-center mb-2">
            Your Account Has Not Been Verified
          </h3>
          <p className="text-center mb-6 text-xs md:text-base">
            To ensure the security and integrity of our platform, your account
            must be verified before you can transact with others. Click the
            verify Button to start the verification process or contact support
            if you need assistance.
          </p>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => setVerifyOperator(false)}
            >
              I&apos;ll do it later
            </Button>
            <Button
              variant="success"
              onClick={() => {
                router.push(
                  "/operator/settings/verification?setting_tab=verification"
                );
                setVerifyOperator(false);
              }}
            >
              Verify Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ViewOrderDetails = () => {
  const { setOpenOrder, openOrder } = useStateCtx();
  const { selectedOrder } = useOrderCtx();

  const { isMobile } = useMediaQuery();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    startTransition(() => {
      GetOrderById(selectedOrder).then((data) => {
        setOrder(data.order);
      });
    });
  }, [openOrder]);

  return (
    <Sheet open={openOrder} onOpenChange={setOpenOrder}>
      <SheetContent
        className="w-full z-[150]"
        side={isMobile ? "bottom" : "right"}
      >
        <div className="flex flex-col w-full sm:px-3 py-6 mb-6 sm:rounded-xl h-full relative">
          <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary">
            <h3 className="text-lg font-semibold text-primary">
              Order Details
            </h3>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Status: {order?.status.replace("-", " ").toLowerCase()}
            </p>
          </div>
          <div className="flex w-full flex-col py-5 gap-y-3 lg:gap-y-4">
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Pickup Name:
              <span className="font-medium">{order?.pickupname}</span>
              <span className="text-primary/50 text-[11px]">
                (Created on{" "}
                {format(
                  new Date(order?.createdAt ? order.createdAt : new Date()),
                  "dd-MM-yyyy"
                )}
                )
              </span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Phone:
              <span className="font-medium">{order?.pickupphone}</span>
            </p>
            <p className="text-sm xl:text-base text-header dark:text-gray-200 flex items-center gap-x-1">
              Tracking ID:
              <span className="font-medium text-xs">{order?.id}</span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Pickup Address:
              <span className="font-medium">{order?.pickupaddress}</span>
            </p>

            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Items:{" "}
              <span className="font-medium">
                {order?.pickupitem.join(", ")}
              </span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              DropOff Assignee:{" "}
              <span className="font-medium">{order?.dropoffname}</span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Destination Address:
              <span className="font-medium">{order?.dropoffaddress}</span>
            </p>
          </div>
          {order?.dispatched ? (
            <>
              <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary">
                <h3 className="text-lg font-semibold text-primary">
                  Delivery Agent Details
                </h3>
              </div>
              <div className="flex w-full flex-col py-5 gap-y-3 lg:gap-y-4">
                <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
                  Name:
                  <span className="font-medium">
                    {order?.deliveryAgent?.fullName}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary">
                <h3 className="text-lg font-semibold text-primary">Bids</h3>
              </div>
              <div className="flex w-full flex-col py-5 gap-y-3 lg:gap-y-4">
                {order?.bids && order.bids.length > 0 ? (
                  order.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1 flex-col"
                    >
                      <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
                        Bidder:
                        <span className="font-medium">
                          {bid.bidder.fullName}
                        </span>
                      </p>
                      <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
                        Price:
                        <span className="font-medium">{bid.price}</span>
                      </p>
                      <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
                        Estimated time of delivery:
                        <span className="font-medium">
                          {bid.deliveryhour} from time of pickup
                        </span>
                      </p>
                      <div className="flex w-full justify-center sm:justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 py-6 max-sm:gap-x-5">
                        <Button
                          className={cn(
                            "rounded-lg bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:bg-primary/80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium"
                          )}
                        >
                          Chat Bidder
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
                    No bids yet
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ViewOrderDetailsOperator = () => {
  const { OperatoropenOrder, setOperatoropenOrder } = useStateCtx();
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();
  const { isMobile } = useMediaQuery();
  const [order, setOrder] = useState<Order>();
  const { selectedOrder, updateBids, bids } = useOrderCtx();
  const [openCreatebid, setOpenCreatebid] = useState<Boolean>(false);

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),

    defaultValues: {
      price: "",
      deliveryhour: "",
      orderId: order?.id ?? selectedOrder,
    },
  });

  useEffect(() => {
    startTransition(() => {
      GetOrderById(selectedOrder).then((data) => {
        setOrder(data.order);
      });
    });
  }, [OperatoropenOrder]);

  const onSubmit = async (values: z.infer<typeof bidSchema>) => {
    console.log(values);
    const bidsDetails = {
      ...values,
      orderId: order?.id,
    };
    startTransition(() => {
      createBid(bidsDetails).then((data) => {
        toast({
          title: data.status === 201 ? "Bid created" : "an error occurred",
          description: data.message || "An error occurred while creating a bid",
        });
        if (data.status === 201) {
          updateBids();
          setOpenCreatebid(false);
        }
      });
    });
  };

  const hasBidded = bids.some((bid) => bid.orderId === selectedOrder);

  return (
    <Sheet open={OperatoropenOrder} onOpenChange={setOperatoropenOrder}>
      <SheetContent
        className="w-full z-[150]"
        side={isMobile ? "bottom" : "right"}
      >
        <div className="flex flex-col w-full sm:px-3 py-6 mb-6 sm:rounded-xl h-full relative">
          <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary">
            <h3 className="text-lg font-semibold text-primary">
              Order Details
            </h3>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Status: {order?.status.replace("-", " ").toLowerCase()}
            </p>
          </div>
          <div className="flex w-full flex-col py-5 gap-y-3 lg:gap-y-4">
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Pickup Name:
              <span className="font-medium">{order?.pickupname}</span>
              <span className="text-primary/50 text-[11px]">
                (Created on{" "}
                {format(
                  new Date(order?.createdAt ? order.createdAt : new Date()),
                  "dd-MM-yyyy"
                )}
                )
              </span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Phone:
              <span className="font-medium">{order?.pickupphone}</span>
            </p>
            <p className="text-sm xl:text-base text-header dark:text-gray-200 flex items-center gap-x-1">
              Tracking ID:
              <span className="font-medium text-xs">{order?.id}</span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Pickup Address:
              <span className="font-medium">{order?.pickupaddress}</span>
            </p>

            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Items:{" "}
              <span className="font-medium">
                {order?.pickupitem.join(", ")}
              </span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              DropOff Assignee:{" "}
              <span className="font-medium">{order?.dropoffname}</span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              DropOff Contact:{" "}
              <span className="font-medium">{order?.dropoffphone}</span>
            </p>
            <p className="text-sm xl:text-base text-black flex flex-wrap items-center gap-x-1">
              Destination Address:
              <span className="font-medium">{order?.dropoffaddress}</span>
            </p>
          </div>

          {!isMobile && (
            <>
              {hasBidded ? (
                <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary"></div>
              ) : order?.dispatched ? (
                <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary"></div>
              ) : (
                <>
                  {!openCreatebid && (
                    <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary">
                      <div className="flex w-full justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 mt-6 relative">
                        <button
                          tabIndex={0}
                          disabled={bids.some(
                            (bid) => bid.orderId === selectedOrder
                          )}
                          aria-label="Create bid"
                          onClick={() => {
                            setOpenCreatebid(true);
                          }}
                          className={cn(
                            "rounded-lg border bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navbar"
                          )}
                        >
                          Create Bid
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {openCreatebid && (
                <div className="flex flex-col w-full justify-between pb-2 md:pb-3 border-b border-primary">
                  <h3 className="text-lg font-semibold text-primary ">
                    Create Bid
                  </h3>
                  <Form {...form}>
                    <form
                      action=""
                      className="flex flex-col mt-8 gap-y-6 md:gap-y-6 "
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="price"
                                  disabled={isLoading}
                                  type="text"
                                  className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                                  placeholder="price"
                                />
                                <FormLabel
                                  htmlFor="price"
                                  className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                                >
                                  Price
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormDescription>
                              At what price would you deliver
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deliveryhour"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="deliveryhour"
                                  disabled={isLoading}
                                  type="text"
                                  className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                                  placeholder="price"
                                />
                                <FormLabel
                                  htmlFor="price"
                                  className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                                >
                                  Delivery Hour
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormDescription>
                              How soon can you deliver your delivery
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex w-full justify-center sm:justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 py-6 max-sm:gap-x-5">
                        <Button
                          type="button"
                          tabIndex={0}
                          aria-label="Cancel"
                          onClick={() => {
                            form.reset();
                          }}
                          variant="outline"
                          className={cn(
                            "rounded-lg border border-primary text-primary min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
                          )}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          tabIndex={0}
                          disabled={
                            isLoading ||
                            !(
                              form.getValues().deliveryhour &&
                              form.getValues().price
                            )
                          }
                          aria-label="Create Bid"
                          className={cn(
                            "rounded-lg bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:bg-primary/80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium"
                          )}
                        >
                          {isLoading ? (
                            <div className="loading">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          ) : (
                            "Make Bid"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </>
          )}
        </div>

        {isMobile && (
          <div className="flex flex-col w-full sm:px-3 py-6 mb-6 sm:rounded-xl h-full relative">
            {hasBidded ? (
              <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary"></div>
            ) : order?.dispatched ? (
              <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-primary"></div>
            ) : (
              <>
                {!openCreatebid && (
                  <div className="flex w-full justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 mt-6 relative">
                    <button
                      tabIndex={0}
                      aria-label="Create bid"
                      disabled={bids.some(
                        (bid) => bid.orderId === selectedOrder
                      )}
                      onClick={() => {
                        setOpenCreatebid(true);
                      }}
                      className={cn(
                        "rounded-lg border bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navbar"
                      )}
                    >
                      Create Bid
                    </button>
                  </div>
                )}
              </>
            )}
            {openCreatebid && (
              <div className="flex flex-col w-full justify-between pb-2 md:pb-3 border-b border-primary">
                <h3 className="text-lg font-semibold text-primary">
                  Create Bid
                </h3>
                <Form {...form}>
                  <form
                    action=""
                    className="flex flex-col mt-8 gap-y-6 md:gap-y-6 "
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="price"
                                disabled={isLoading}
                                type="text"
                                className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                                placeholder="price"
                              />
                              <FormLabel
                                htmlFor="price"
                                className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                              >
                                Price
                              </FormLabel>
                            </div>
                          </FormControl>
                          <FormDescription>
                            At what price would you deliver
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deliveryhour"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="deliveryhour"
                                disabled={isLoading}
                                type="text"
                                className="block px-2.5 pb-2.5  placeholder:text-white pt-4 w-full  text-sm rounded-lg border border-primary/50 h-[56px]  focus:border-primary focus:outline-none focus:ring-0 peer"
                                placeholder="price"
                              />
                              <FormLabel
                                htmlFor="price"
                                className="absolute text-sm bg-white text-gray-500 duration-300 peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                              >
                                Delivery Hour
                              </FormLabel>
                            </div>
                          </FormControl>
                          <FormDescription>
                            How soon can you deliver your delivery
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full justify-center sm:justify-end items-center gap-x-2 sm:gap-x-3 md:gap-x-6 py-6 max-sm:gap-x-5">
                      <Button
                        type="button"
                        tabIndex={0}
                        aria-label="Cancel"
                        onClick={() => {
                          form.reset();
                        }}
                        variant="outline"
                        className={cn(
                          "rounded-lg border border-primary text-primary min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
                        )}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        tabIndex={0}
                        aria-label="Create Bid"
                        disabled={
                          isLoading ||
                          !(
                            form.getValues().deliveryhour &&
                            form.getValues().price
                          )
                        }
                        className={cn(
                          "rounded-lg bg-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:bg-primary/80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium"
                        )}
                      >
                        {isLoading ? (
                          <div className="loading">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        ) : (
                          "Make Bid"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export {
  OtpModal,
  CreateOrderModal,
  VerifyOperatorModal,
  ViewOrderDetails,
  ViewOrderDetailsOperator,
};
