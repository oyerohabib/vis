"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TermList, TermSection, NewList } from "../terms";

const Privacy = () => {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col px-5 md:container overflow-hidden mt-[50px] md:mt-[100px] md:mb-[100px]"
    >
      <header className="text-center">
        <h1 className="md:text-6xl text-primary leading-[76.8px] max-md:max-w-full text-2xl font-bold">
          Privacy Policy
        </h1>
      </header>
      <article className="md:mt-24 mt-[10px] w-full text-base md:text-xl font-light leading-8 text-neutral-900 max-md:mt-10 max-md:max-w-full">
        <p className="text-lg md:text-2xl font-bold text-black mb-[7px] md:mb-[20px]">
          Effective date: August 18, 2021
        </p>
        <p>Applicable to: Viscio Express</p>
        <TermSection
          title="1. Definitions"
          content={
            <>
              <NewList
                spanitem="Parties"
                items={[
                  `Means both You and the operator of the Application: Viscio Technologies
              LTD.`,
                ]}
              />
              <NewList
                spanitem="Operator"
                items={[
                  `means
              the owner, publisher and administrator of the Application.`,
                ]}
              />
              <NewList
                spanitem="Personal Data"
                items={[
                  `means any personal information collected for You
              in relation with your use of this service which is capable of
              identifying You.`,
                ]}
              />
              <NewList
                spanitem="Service"
                items={[
                  `means the
              application, which is known as: Viscio Express including all
              pages, sub pages, all blogs, forums and other connected internet
              content whatsoever.`,
                ]}
              />
              <NewList
                spanitem="Services"
                items={[
                  `means
              these terms and conditions.`,
                ]}
              />
              <NewList
                spanitem="You, Yours"
                items={[`means the user of this Application.`]}
              />
            </>
          }
        />
        <TermSection
          title="2. Introduction"
          content={
            <TermList
              items={[
                ` This Privacy Policy is designed to inform You about the Personal
            Data we collect, how we collect this data, the uses of the data, and
            Your rights relating to the Personal Data when You use this Service
            or purchase the Services offered on the Application.`,
                ` We are committed to protecting your Personal Data while You use this
            Application.`,
                `   By continuing to use our Application, You acknowledge that You have
            reviewed the Privacy Policy and agree to its terms. This also means
            that You have consented to the use of Your Personal Data and have
            accepted the applicable disclosures.`,
              ]}
            />
          }
        />
        <TermSection
          title="3. THE PERSONAL DATA WE COLLECT FROM YOU"
          content={
            <>
              <TermList
                items={[
                  ` We collect various information to enable us provide good Service to
            all our users. Depending on how our Service will be used, the
            different types of Personal Data we collect are as follows:`,
                ]}
              />
              <div className="ml-7 my-3">
                <p>
                  For registered users: During the process of Your registration
                  we may collect the following information:
                </p>
                <TermList
                  className="custom-class list-[lower-alpha]"
                  items={[
                    `Full name`,
                    "Email address",
                    "Phone number",
                    "Date of birth",
                    "Gender",
                  ]}
                />
              </div>
              <div className="ml-7 my-3">
                <p>We may also require other information in relation to:</p>
                <TermList
                  className="custom-class list-[lower-alpha]"
                  items={[
                    "Your interaction with our representatives",
                    "Receiving notifications by text message or email about marketing",
                    "Receiving general emails from us.",
                    "Commenting on our Content on our Application.",
                    "The purchases You make.",
                  ]}
                />
                <div className="space-y-3 mt-3">
                  <p>
                    For unregistered users: We will collect passive information
                    from all registered and unregistered users. These
                    information include cookies, IP address information,
                    location information and certain browser information.
                  </p>
                  <p>
                    User Experience: From time to time we may also request
                    certain Personal Data that may be necessary to improve our
                    Service and the Services we offer for sale on the
                    Application.
                  </p>
                  <p>
                    By using this Application and agreeing to these Terms, You
                    represent and warrant that You have the legal capacity to
                    accept these Terms.
                  </p>
                </div>
              </div>
            </>
          }
        />
        <TermSection
          title="4. THE PERSONAL DATA WE COLLECT AS YOU USE OUR SERVICE"
          content={
            <>
              <p> We use the following to collect Personal Data from You:</p>
              <NewList
                spanitem="Log Data"
                items={[
                  `   We also use log files which store automatic information collected
            when users visit this Application. The log data which may be
            collected are as follows:`,
                ]}
                className="list-none ml-0"
              />
              <TermList
                items={[
                  "The domain and host from which You access the Application",
                  "Name of the Internet Service Provider (ISP)",
                  "Date and time of visit",
                  "Your computer operating system and browser software",
                  "Your Internet Protocol (IP) address.",
                ]}
              />
            </>
          }
        />
        <TermSection
          title="5. PURPOSE OF PROCESSING PERSONAL DATA"
          content={
            <>
              <p>We use the following to collect Personal Data from You:</p>

              <TermList
                items={[
                  ` To provide our Service and to maintain and make improvements to
              the Service we provide to You`,
                  `To develop new Services on the Application`,
                  `    To provide personalized Service to You, including making
              recommendations and providing personalized content`,
                  `To provide customer service to You`,
                  `              To provide You with updates on the Application and related items`,
                  `To provide analytics to understand how our Service is used.`,
                ]}
              />
            </>
          }
        />
        <TermSection
          title="6. STORAGE OF PERSONAL DATA"
          content={
            <>
              <p>
                We take the security of the Personal Data we collect very
                seriously, and we take reasonable measures to reduce the risk of
                accidental destruction, loss or unauthorized access to such
                information. However, please note that no system involving the
                transmission of information via electronic storage systems or
                the internet is completely secure.
              </p>
              <p className="mt-3">
                The Personal Data and any other information we have about You
                may be stored for such period as we may determine until You
                terminate Your account with us or You withdraw Your consent.
              </p>
            </>
          }
        />
        <TermSection
          title="7. PROTECTION OF PERSONAL DATA"
          content={
            <>
              <p>
                Our Service is built with strong security features that
                continuously protects Your Personal Data. Our security features
                help us detect and block security threats. If we detect any
                security risk, we may inform You and guide You through steps to
                stay protected.
              </p>
            </>
          }
        />
        <TermSection
          title="8. DISCLOSURE OF PERSONAL DATA"
          content={
            <>
              <p>
                We do not disclose Your Personal Data except for any of the
                following reasons:
              </p>

              <TermList
                items={[
                  ` If You have granted us the permission to do so: We will disclose
              Your Personal Data where we have received Your unequivocal consent
              and permission to do so. However, such consent may be withdrawn at
              any time`,
                  `   For the purposes of processing Your Personal Data: We may disclose
              Your Personal Data to our affiliates and other trusted businesses
              or persons for the purpose of processing Your Personal Data for
              us, based on our instruction and in compliance with our Privacy
              Policy`,
                  `              If we are required to do so by an existing law or regulation: We
              may also disclose and share Your Personal Data for the following
              reasons`,
                ]}
              />
              <div className="ml-7 my-3">
                <TermList
                  className="custom-class list-[lower-alpha]"
                  items={[
                    ` To meet any applicable law, regulation, legal process, or any
                legal request, such as subpoenas, court orders, requests for
                administrative or government bodies`,
                    `To enforce our applicable Terms of Use`,
                    `To detect, prevent, or address any fraud, security or technical
                issues`,
                    `   To prosecute or bring any legal action against any user who has
                violated any law or our Terms of Use.`,
                  ]}
                />
              </div>
              <TermList
                items={[
                  ` For any other reason that may be necessary for the operation of
              our Application.`,
                ]}
              />
            </>
          }
        />
        <TermSection
          title="9. ACCESSING, MODIFYING AND DELETING YOUR PERSONAL DATA"
          content={
            <>
              <p>
                If you wish to access, review, modify any information we have
                about You, You may do so by editing your profile on Viscio
                Express or simply contacting us on the following email address:{" "}
                <a href="mailto:admin@viscio.com.ng" className="font-medium">
                  admin@viscio.com.ng
                </a>
                .
              </p>
              <p className="mt-2">
                You may also delete any information belonging to you that we
                have stored by simply deactivating your account or request that
                we delete any information belonging to You that we have stored.
              </p>
            </>
          }
        />
        <TermSection
          title="10. YOUR RIGHTS"
          content={
            <>
              <p>
                Your rights in relation to Your Personal Data are as follows:
              </p>

              <TermList
                items={[
                  `The right to have access to Your Personal Data`,
                  `The right to be informed about the processing of Your Personal
              Data`,
                  `              The right to rectify any inaccurate Personal Data or any
              information about You`,
                  `              The right to review, modify or erase Your Personal Data and any
              other information we have about You`,
                  `The right to restrict the processing of Your Personal Data`,
                  `              The right to block Personal Data processing in violation of any
              law`,
                  `              The right to be informed about any rectification or erasure of
              Personal Data or restriction of any processing carried out`,
                  `The right to the portability of Your Personal Data and`,
                  ` The right to lodge a complaint to a supervisory authority within
              Nigeria.`,
                ]}
              />
            </>
          }
        />
        <TermSection
          title="11. CONTACT INFORMATION"
          content={
            <p>
              If You have any questions regarding this Privacy Policy or the
              Personal Data we collect, or if You wish to make any comments,
              enquiries, complaints or feedback about anything related to this
              Privacy Policy, please contact us at the following email address:
              <a href="mailto:admin@viscio.com.ng" className="font-medium">
                {" "}
                admin@viscio.com.ng
              </a>
            </p>
          }
        />
        <TermSection
          title="12. REVISIONS AND MODIFICATIONS"
          content={
            <p>
              We reserve the right to modify and revise this Privacy Policy from
              time to time without Your explicit consent. If we make any
              fundamental change, we will notify You and obtain Your consent to
              the revised version.
            </p>
          }
        />
      </article>
    </motion.section>
  );
};

export { Privacy };
