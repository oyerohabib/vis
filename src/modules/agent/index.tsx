"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TermList, TermSection, NewList } from "../terms";

const Agent = () => {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col px-5 md:container overflow-hidden mt-[50px] md:mt-[100px] md:mb-[100px]"
    >
      <header className="text-center">
        <h1 className="md:text-6xl text-primary leading-[76.8px] max-md:max-w-full text-2xl font-bold">
          Become a logistics agent
        </h1>
      </header>
      <article className="mt-10 w-full font-light tracking-wider leading-7 text-neutral-900 max-md:max-w-full text-base">
        <p>
          You can truly become your own boss as a Viscio express logistics agent
          whether as an owner of a motorcycle, vehicle or a fleet of mobility
          assets. Viscio is a collaborative tool that depends on logistics
          agents and logistics infrastructure partners. As our logistics agent
          you can earn by fulfilling logistics requests in any of the cities we
          operate. operate.
        </p>
        <TermSection
          title="Benefits our Logistics Agent Enjoy"
          content={
            <>
              <TermList
                className="custom-class list-[lower-alpha]"
                items={[
                  `Viscio provides improved market access to a large pool of prospective customers`,
                  `For fleet operators, Viscio increases sales prospects and overall operational efficiency with access to customized tools.`,
                  `Viscio will provide improved visibility and tracking of your mobility asset leveraging on our telematics framework`,
                ]}
              />
            </>
          }
        />
        <div className="pt-6">
          <TermSection
            title="To begin, sign up as a vendor on our website or download Viscio Express
        Driver App and follow the steps below:"
            content={
              <>
                <TermList
                  className=""
                  items={[
                    `Registration and Otp Verification (with a fully completed profile)`,
                    `Prospective Logistics Agents are required to select mobility asset type (motorbike, vehicle or truck), year of production, plate number and uploads of documents (driver license, vehicle registration document and complete )`,
                    `Our Quality Assessment Agent will verify/screen your application after which you become verified on the Viscio express platform; which means you can start receiving requests.`,
                    `For complete information about required documents, click here for checklist.`,
                    `For more information kindly send an email to: support@viscio.com.ng`,
                  ]}
                />
              </>
            }
          />
        </div>
      </article>
    </motion.section>
  );
};

export { Agent };
