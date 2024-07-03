"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import useInView from "@/hooks/useInView";

const AboutHero = () => {
  const AboutusRef = React.useRef<HTMLDivElement>(null);
  const isInView2 = useInView({ ref: AboutusRef });
  return (
    <section
      ref={AboutusRef}
      className={cn(
        "relative w-full",
        isInView2
          ? "opacity-100 translate-y-0 md:delay-300 duration-500"
          : " opacity-0 translate-y-36"
      )}
    >
      <div className="md:container px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="img-box"
          >
            <Image
              src="/abouthero.png"
              alt="Logistics Illustration"
              width={1090}
              height={1090}
              className=" object-cover hidden lg:block "
            />
          </motion.div>
          <div className="lg:pr-24 flex items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="data w-full"
            >
              <Image
                src="/about-sm.png"
                alt="Logistics Illustration"
                width={302}
                height={302}
                className="w-full h-full object-cover block lg:hidden"
              />
              <h2 className="font-bold text-xl lg:text-5xl text-black mb-9 max-lg:text-center">
                We&apos;re here because of you.
              </h2>
              <div className="text-start">
                <p className="font-normal text-base md:text-xl leading-8 text-black max-w-2xl mx-auto">
                  Viscio is changing the narrative of efficient logistics in
                  Africa by offering ease of access to multiple logistics agents
                  anywhere and at any time. The African logistics scene is
                  riddled with infrastructure gaps, high operating costs and
                  overly fragmented activities
                </p>
                <p className="font-normal text-base md:text-xl leading-8 max-w-2xl mx-auto text-black mt-5">
                  Viscio express platform serves as a reliable collaboration
                  tool for various logistics agents across multiple locations
                  leveraging on technology tools and a smart operations
                  framework.
                </p>
                <p className="font-normal text-base md:text-xl leading-8  max-w-2xl mx-auto text-black mt-5">
                  Our commitment is to facilitate movement of packages and cargo
                  from point of origin to the destination desired by the user.
                  We are creating Africa&apos;s largest logistics marketplace
                  and collaboration tool across multiple-modal channels.
                </p>
                <p className="font-normal text-base md:text-xl leading-8 max-w-2xl mx-auto text-black mt-5">
                  In ensuring that we keep to our promise of safely moving your
                  goods from one point to another, we go the extra mile in
                  providing end-to-end logistics efficiency by practically
                  closing the infrastructure gaps that limit the deployment of
                  our technology tools. Our Key Stakeholders: Logistics Agents,
                  Infrastructure partners and various courier organizations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const AboutusRef = React.useRef<HTMLDivElement>(null);
  const isInView2 = useInView({ ref: AboutusRef });
  return (
    <>
      <main className="md:container px-4 overflow-hidden mt-[50px] md:mt-[100px]">
        <section
          // ref={AboutusRef}
          className={cn(
            "relative w-full"
            // isInView2
            //   ? "opacity-100 translate-y-0 md:delay-300 duration-500"
            //   : " opacity-0 translate-y-36"
          )}
        >
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
              <div className="lg:pr-24 flex items-center">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="data w-full"
                >
                  <Image
                    src="/abt.png"
                    alt="Logistics Illustration"
                    width={632}
                    height={480}
                    className="max-w-full h-auto aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover block lg:hidden mb-9 mx-auto rounded-3xl"
                  />
                  <h2 className="text-xl lg:text-2xl font-medium text-primary mb-9 max-lg:text-center">
                    Exclusive Express delivery
                  </h2>
                  <p className="font-normal text-xl leading-8 text-black max-lg:text-center max-w-2xl mx-auto">
                    Using our app, users can order for vehicles or motorcycles
                    for exclusive pick-up and delivery of courier packages with
                    no stop overs from pick point to destination.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="img-box"
              >
                <Image
                  src="/abt.png"
                  alt="Logistics Illustration"
                  width={600}
                  height={300}
                  className="max-w-full h-[300px] max-md:mt-10 max-md:max-w-full object-cover hidden lg:block rounded-3xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section
          // ref={AboutusRef}
          className={cn(
            "relative w-full"
            // isInView2
            //   ? "opacity-100 translate-y-0 md:delay-300 duration-500 mt-[25px] md:mt-[50px]"
            //   : " opacity-0 translate-y-36"
          )}
        >
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="img-box"
              >
                <Image
                  src="/abt2.png"
                  alt="Logistics Illustration"
                  width={600}
                  height={300}
                  className="max-w-full h-[300px] aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover hidden lg:block rounded-3xl"
                />
              </motion.div>
              <div className="lg:pr-24 flex items-center mt-5">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="data w-full"
                >
                  <Image
                    src="/abt2-sm.png"
                    alt="Logistics Illustration"
                    width={600}
                    height={300}
                    className="max-w-full h-[300px] aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover block lg:hidden mb-9 mx-auto rounded-3xl"
                  />
                  <h2 className="text-xl lg:text-3xl font-medium text-primary mb-9 max-lg:text-center">
                    Scheduled Delivery
                  </h2>
                  <p className="font-normal text-xl leading-8 text-black max-lg:text-center max-w-2xl mx-auto">
                    This is for same day pick up and deliveries (where
                    scheduling must be done between 6am to 9:59am same day) and
                    next-day only pick-up and delivery. Users can choose their
                    preferred pick up time and choice of vehicle for this
                    affordable delivery option.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section
          // ref={AboutusRef}
          className={cn(
            "relative w-full"
            // isInView2
            //   ? "opacity-100 translate-y-0 md:delay-300 duration-500 mt-[25px] md:mt-[50px]"
            //   : " opacity-0 translate-y-36"
          )}
        >
          <div className="relative p-[30px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
              <div className="lg:pr-24 flex items-center">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="data w-full"
                >
                  <Image
                    src="/abt3-sm.png"
                    alt="Logistics Illustration"
                    width={600}
                    height={300}
                    className="max-w-full h-[300px] aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover block lg:hidden mb-9 mx-auto rounded-3xl"
                  />
                  <h2 className="text-xl lg:text-2xl font-medium text-primary mb-9 max-lg:text-center capitalize">
                    Inter-country Delivery
                  </h2>
                  <p className="font-normal text-xl leading-8 text-black max-lg:text-center max-w-2xl mx-auto">
                    This is a scheduled service where users can book for pickup
                    of goods for onward door-step delivery to intended recipient
                    in another city.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="img-box"
              >
                <Image
                  src="/abt3.png"
                  alt="Logistics Illustration"
                  width={600}
                  height={300}
                  className="max-w-full h-[300px] max-md:mt-10 max-md:max-w-full object-cover hidden lg:block rounded-3xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section
          // ref={AboutusRef}
          className={cn(
            "relative w-full"
            // isInView2
            //   ? "opacity-100 translate-y-0 md:delay-300 duration-500 mt-[25px] md:mt-[50px]"
            //   : " opacity-0 translate-y-36"
          )}
        >
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="img-box"
              >
                <Image
                  src="/abt4.png"
                  alt="Logistics Illustration"
                  width={600}
                  height={300}
                  className="max-w-full h-[300px] aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover hidden lg:block rounded-3xl"
                />
              </motion.div>
              <div className="lg:pr-24 flex items-center">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="data w-full"
                >
                  <Image
                    src="/abt4-sm.png"
                    alt="Logistics Illustration"
                    width={632}
                    height={480}
                    className="max-w-full h-auto aspect-[1.15] max-md:mt-10 max-md:max-w-full object-cover block lg:hidden mb-9 mx-auto rounded-3xl"
                  />
                  <h2 className="text-xl lg:text-3xl font-medium text-primary mb-9 max-lg:text-center capitalize">
                    doorstep to the intended recipient in another country
                  </h2>
                  <p className="font-normal text-xl leading-8 text-black max-lg:text-center max-w-2xl mx-auto">
                    This affordable pick-up and delivery option is a special
                    scheduled service for movement of goods from doorstep to bus
                    park closest to the intended recipient in another city.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

type BenefitItemProps = {
  text: string;
};

const benefits = [
  "Viscio provides improved market access to a large pool of prospective customers.",
  "Viscio will provide improved visibility and tracking of your mobility asset leveraging on our telematics framework",
  "Registration and Otp Verification (with a fully completed profile)",
  "Prospective Logistics Agents are required to select mobility asset type (motorbike, vehicle or truck), year of production, plate number and uploads of documents (driver license, vehicle registration document and complete )",
  "Our Quality Assessment Agent will verify/screen your application after which you become verified on the Viscio express platform; which means you can start receiving requests.",
  "For complete information about required documents, click here for checklist.",
];

const BAL = () => {
  const AboutusRef = React.useRef<HTMLDivElement>(null);
  const isInView2 = useInView({ ref: AboutusRef });
  return (
    <>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        ref={AboutusRef}
        className={cn(
          "flex flex-col px-5 md:container overflow-hidden mt-[50px] md:mt-[100px] md:mb-[100px]",
          isInView2
            ? "opacity-100 translate-y-0 md:delay-300 duration-500"
            : " opacity-0 translate-y-36"
        )}
      >
        <h1 className="self-center text-6xl text-primary capitalize leading-[76.8px] max-md:max-w-full max-md:text-4xl font-medium text-center">
          Become a logistics agent
        </h1>
        <article className="mt-10 w-full font-light tracking-wider leading-7 text-neutral-900 max-md:max-w-full text-base">
          <p>
            You can truly become your own boss as a Viscio express logistics
            agent whether as an owner of a motorcycle, vehicle or a fleet of
            mobility assets. Viscio is a collaborative tool that depends on
            logistics agents and logistics infrastructure partners. As our
            logistics agent you can earn by fulfilling logistics requests in any
            of the cities we operate.
            <br />
            <br />
          </p>
          <h2 className="font-medium underline text-center text-2xl">
            Benefits our Logistics Agent Enjoy
          </h2>
          <ul className="mt-5 list-disc ml-6">
            <li>
              Viscio provides improved market access to a large pool of
              prospective customers. To begin, download our Viscio Express
              Driver App and follow the steps below:
            </li>
          </ul>

          <ul className="list-disc ml-6">
            {benefits.slice(1).map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
            <li className="">
              For more information kindly send an email to:{" "}
              <a
                href="mailto:support@viscio.com.ng"
                className="text-primary underline "
              >
                support@viscio.com.ng
              </a>
            </li>
          </ul>
        </article>
      </motion.section>
    </>
  );
};

export { AboutHero, Services, BAL };
