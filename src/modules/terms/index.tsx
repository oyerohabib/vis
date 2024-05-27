"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

type TermSectionProps = {
  title?: string;
  content?: string | JSX.Element;
};

type TermListProps = {
  items: string[];
  className?: string;
  span?: boolean;
};

type Props = {
  items: string[];
  className?: string;
  spanitem?: string;
};

const TermSection: React.FC<TermSectionProps> = ({ title, content }) => (
  <div className="md:mt-[20px] mt-[10px]">
    <h2 className="text-2xl font-medium">{title}</h2>
    <div className="leading-8 text-neutral-900 mt-3">{content}</div>
  </div>
);

const NewList: React.FC<Props> = ({ items, className, spanitem }) => (
  <ul className={cn("list-disc ml-6", className)}>
    {items.map((item, index) => (
      <li key={index}>
        <span className="font-medium">{spanitem}</span>
        {item}
      </li>
    ))}
  </ul>
);

const TermList: React.FC<TermListProps> = ({ items, className }) => (
  <ul className={cn("list-disc ml-6", className)}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
const Terms = () => {
  return (
    <>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col px-5 md:container overflow-hidden mt-[50px] md:mt-[100px] md:mb-[100px]"
      >
        <header className="text-center">
          <h1 className="md:text-6xl text-primary leading-[76.8px] max-md:max-w-full text-2xl font-bold">
            Terms and Conditions
          </h1>
        </header>
        <article className="md:mt-24 mt-[10px] w-full text-base md:text-xl font-light leading-8 text-neutral-900 max-md:mt-10 max-md:max-w-full">
          <p className="text-lg md:text-2xl font-bold text-black mb-[7px] md:mb-[20px]">
            Effective date: August 18, 2021
          </p>
          <p>
            These terms and conditions apply to You, the user of this
            application, and Viscio Technologies LTD, the Owner and operator of
            the following application: Viscio Express the
            &quot;Application&quot;.
          </p>
          <p className="text-primary mt-[20px]">
            PLEASE READ THE TERMS AND CONDITIONS CAREFULLY as they affect Your
            legal right.
          </p>
          <TermSection
            title="1. Definitions"
            content={
              <TermList
                items={[
                  "Parties means both You (the user of the Service) and the Owner of this Service.",
                  "Content means any content, writing, images, audiovisual content or other information published on this Service.",
                  "Your Content means any audio, video, text, images or other material You choose to display on this Application subject to the restrictions provided in this Agreement.",
                  "Materials means any materials, information or documentation that we may provide to You in connection with Your use of the Products including documentation, data, information developed any use and other materials which may assist in Your use of the Goods or Service.",
                  "Terms means these terms and conditions.",
                  "Service means the application, which is known as: Viscio Express including all pages, sub pages, all blogs, forums and other connected internet content whatsoever.",
                  "Third Party Goods/Services means goods, products and services of third party that may be advertised on the Application.",
                  "Services means the services offered on the Application.",
                ]}
              />
            }
          />

          <TermSection
            title="2. About this Application"
            content={
              <div className="space-y-[5px] md:space-y-[10px]">
                <p>
                  The Application is an online store that engages in the sale of
                  the following Services: Logistics
                </p>
                <p>
                  This Application is comprised of various pages operated by
                  Viscio Technologies LTD.
                </p>
                <p>
                  This Service is offered to You upon Your acceptance of the
                  Terms, conditions, notices hereinafter contained. Your use of
                  this Service constitutes Your agreement to all the Terms
                  contained herein.
                </p>
              </div>
            }
          />

          <TermSection
            title="3. Agreement"
            content={
              <TermList
                items={[
                  "By using this Application, You acknowledge that You have reviewed, considered the Terms of this Agreement and understand same and agree to be bound by it. If You u do not agree with these Terms or do not intend to be bound by it, You must quit the use of this Application immediately. In addition, when using these Service, You shall be subject to any posted guidelines or rules applicable to such services. Accordingly, any participation in this Service shall constitute acceptance of this Agreement.",
                  "By using this Application and agreeing to these Terms, You represent and warrant that You have the legal capacity to accept these Terms.",
                ]}
              />
            }
          />
          <TermSection
            title="4. Acceptable Use"
            content={
              <TermList
                items={[
                  "We may provide You with other items in connection with Your use of this Service.",
                  "We hereby grant You the license to use our Service for Your personal, non-commercial use to retrieve, display and view the Content on a computer screen.",
                  "The license created under these Terms is limited, non-exclusive, non-transferable and revocable.",
                  "You agree that You will not use the Contents or Materials for any other purpose which may be contrary to your license to use this Service.",
                  "Any unauthorized use by You shall terminate the permission or license granted by this Application.",
                ]}
              />
            }
          />

          <TermSection
            title="5. Prohibited Use"
            content={
              <>
                <TermList
                  items={[
                    "You are expressly prohibited from collecting, downloading, copying or otherwise communicating with other Users from the Application.",
                    "You agree not to use the Service in the following manner:",
                  ]}
                />
                <div className="ml-7 my-3">
                  <TermList
                    items={[
                      "to harass, abuse or threaten others or otherwise violate any person's legal rights;",
                      "to perpetrate fraud;",
                      "to create or transmit unnecessary spam to any person or URL;",
                      "to post, transmit or cause to be posted or transmitted, any communication or solicitation designed to obtain password, account, or private information of other Users or persons;",
                      "to post copyrighted content which does not belong to You and without obtaining the prior consent of the author;",
                      "to use robot, spider, scraper or other automated means to access this Service without obtaining the prior consent of the Owner;",
                      "to engage in or create any unlawful gambling, sweepstakes, or scheme;",
                      "publishing or distributing any obscene or defamatory material;",
                      "using this Service in any way that impacts user access to the Application;",
                      "to engage in advertisement or solicit any User to buy or sell products or services without obtaining the prior consent of the Owner;",
                      "disseminating computer viruses or other software;",
                      "violating any intellectual property rights of the Owner or any third party;",
                      "to use the Application or any of the Services for illegal spam activities.",
                    ]}
                    className="custom-class list-[upper-roman]"
                  />
                </div>
                <TermList
                  items={[
                    "Additionally, you agree that You will not do as follows:",
                  ]}
                />
                <div className="ml-7 my-3">
                  <TermList
                    className="custom-class list-[upper-roman]"
                    items={[
                      "interfere or attempt to interfere with the proper working of this Application; or",
                      "by pass any measures we may use to prevent or restrict access to this Application;",
                      "to interfere with or circumvent the security features of this Service;",
                      "to damage, disable, overburden or impair this Service or any other person's use of this Service.",
                      "to use this Service contrary to the applicable laws and regulations or in a way that causes, or may cause harm to this Application, any person or business entity.",
                    ]}
                  />
                </div>

                <TermList
                  items={[
                    "The Owner has the authority to review all content posted by the Users on this Application and we reserve the right to terminate Your use of the Service for violating any of the prohibited uses.",
                    "You acknowledge that the Application does not control the content or any information that may be posted by other users. Consequently, it is not responsible or liable for those contents or information.",
                  ]}
                />
              </>
            }
          />
          <TermSection
            title="6. Intellectual Property Ownership"
            content={
              <TermList
                items={[
                  "You agree that we retain ownership of all Content included on the Application (text, graphics, video, software, data, page layout, images, and any other information capable of being stored in a computer) other than the contents uploaded by users.",
                  "You are granted a limited license only, subject to the restrictions provided in this Terms, nothing on this Application shall be construed as granting any license or right to use any trademark or logo displayed on the Application without obtaining the prior written consent of the Owner.",
                  "You hereby agree not to reproduce or distribute the Owner's intellectual property or use the intellectual property for any unlawful purpose.",
                ]}
              />
            }
          />

          <TermSection
            title="7. Your Content"
            content={
              <TermList
                items={[
                  "You undertake that You retain the exclusive right and ownership of Your Content and You are not infringing on any third party rights.",
                  "You retain all rights and ownership to Your Content. However, when You upload Your Content, You grant the Owner a worldwide license to communicate, distribute, host, make modification or derivative works (solely for the purpose of showcasing Your work), reproduce, publicly display, publicly perform and use such content. The license granted by You is for the purposes of marketing, promoting, and improving our services.",
                  "The Owner reserves the right to remove any of Your Content or any content that is unlawful, offensive, defamatory, or otherwise objectionable or violates any intellectual property rights or thees Terms.",
                ]}
              />
            }
          />

          <TermSection
            title="8. User Account"
            content={
              <TermList
                items={[
                  "You may be required to register with us to have access to our Service.",
                  "You will be required to provide certain personal information, which includes but not limited to Your name, user name, email address and password. The information provided must be correct and accurate.",
                  "This personal information must not be disseminated to anyone and when You discover that Your information has been compromised, You agree to notify us immediately. You also acknowledge that You are responsible for the security of Your personal information and that the Owner does not accept liability for the security of Your account as You agree to be responsible for maintaining the confidentiality of Your passwords or other account identifiers which You choose and all activities under Your account.",
                  "The Owner reserves the right to terminate Your account where You have provided false inaccurate or incorrect information.",
                  "It is at the sole discretion of the Owner to terminate the account or refuse to sell any Services to any User at any time and for any reason.",
                ]}
              />
            }
          />

          <TermSection
            title="9. Sale of Services"
            content={
              <>
                <TermList
                  items={[
                    `The Application may offer Services for sale. The Owner
                  undertakes to give accurate information about the description
                  of the Services. However, the Owner does not guarantee the
                  reliability of any information relating to the Services.`,
                    `The Owner does not guarantee the accuracy or reliability of
                  any services and You agree that any purchase made by You is
                  done at Your own risk.`,
                    `We reserve the right to refuse to sell the Services provided
                  on the Application at our sole discretion.`,
                    `Subject to the terms of our return policy, if You are not
                  satisfied with Your purchase, we offer replacement of services
                  sold on the Application.`,
                    `All replacements will be made using the same means of payment
                  as You used for the initial transaction, unless You have
                  expressly agreed otherwise.`,
                  ]}
                />
              </>
            }
          />

          <TermSection
            title="10. Payment and Billing"
            content={
              <TermList
                items={[
                  "If You register for our Service or to purchase any Services offered on this Application, You agree to pay the full price for the Services when the purchase is made.",
                  "The total price will also include the taxes applicable on the date of purchase.",
                  "The total price of the Services provided including all applicable taxes is included upon the confirmation of Your order.",
                ]}
              />
            }
          />
          <TermSection
            title="11. Performance of Services"
            content={
              <TermList
                items={[
                  `Upon payment for our Services, We may offer You the opportunity
                  to book a time and date for the performance of the Services. The
                  Services will be performed within a reasonable time. If You have
                  any questions regarding the time and date for the performance,
                  contact us.`,
                ]}
              />
            }
          />

          <TermSection
            title="12. Privacy Policy"
            content={
              <TermList
                items={[
                  `Our privacy policy explains how we treat Your personal data and
              protect Your privacy when You use our Service. By using our
              Service, You agree that the Owner can use such data in the manner
              described in the our Privacy Policy.`,
                ]}
              />
            }
          />

          <TermSection
            title="13. Electronic Communications"
            content={
              <TermList
                items={[
                  ` You consent to receive electronic communications and You agree
                that all agreements, notices, disclosures and other
                communications we provide to You electronically, via email and
                on this Application, satisfy any legal requirements that
                communications must be in writing.`,
                ]}
              />
            }
          />

          <TermSection
            title="14. Reverse Engineering and Security"
            content={
              <TermList
                items={[
                  "not to reverse engineer or permit the reverse engineering or dissemble any code or software from or on the Application or Services; and",
                  "not to violate the Security of the Application or other Services through any unauthorized access, circumvention of encryption or other security tools, data mining or interference with any host or User or network.",
                ]}
              />
            }
          />
          <TermSection
            title="15. Affiliate Marketing and Advertisement"
            content={
              <TermList
                items={[
                  ` We may engage in affiliate marketing and advertisement whereby
                we receive commission on the sale of Third Party Goods and/or
                Services through our Service. We may also accept advertising and
                sponsorship from commercial businesses or receive other forms of
                advertising compensation.`,
                ]}
              />
            }
          />

          <TermSection
            title="16. Change to Service"
            content={
              <TermList
                items={[
                  "You accept that the Owner may vary, alter, amend, or update the Content or Service, Services at any time and without Your consent.",
                  "You also agree that the Services may not be available at all times and this may be as a result of the maintenance or for any other reason and we shall not be held liable for the failure to provide this Service.",
                ]}
              />
            }
          />

          <TermSection
            title="17. Indemnification"
            content={
              <TermList
                items={[
                  `You hereby agree to indemnify the Owner, its employees, agents;
                and third parties from and against all liabilities, cost,
                demands, cause of action, damages; and expenses including
                reasonable attorney's fees arising out of Your use or inability
                to use, any uploads made by You, Your violation of any rights of
                a third party and Your violation of applicable laws, rules or
                regulation.`,
                ]}
              />
            }
          />

          <TermSection
            title="18. No Warranties"
            content={
              <>
                <TermList
                  items={[
                    `  You agree that You use this Application solely at Your risk as
                  the Owner does not warrant the accuracy of the contents in
                  this Application. You assume all the risk of viewing, reading,
                  or downloading the contents of this Application.`,
                    ` The Owner expressly disclaims all express and implied
                  warranties such as implied warranty of merchantability as the
                  Owner makes no warranties that the Application or other
                  Services will be accurate, error free, secure or
                  uninterrupted.`,
                    `  The Owner makes no warranty about the suitability,
                  reliability, availability, timeliness and accuracy of the
                  information, Contents, Services and other materials contained
                  here in for any purpose. The Owner hereby disclaims all
                  warranties and conditions with regard to the information,
                  software, Products, related graphics and materials, including
                  all implied warranties or conditions of merchantability,
                  fitness for a particular purpose, title, and non-infringement.
                `,
                    ` You also agree that the Owner and its affiliates shall not be
                  liable for any direct, indirect, punitive and all
                  consequential damages or any damages whatsoever including, but
                  not limited to damages for loss of use, data or profits, the
                  failure to provide Services or for any information, software,
                  Products, Services, related graphics and materials obtained
                  through this Application, or otherwise arising out of the use
                  of this Application, whether based on contract, negligence,
                  strict liability, or otherwise.`,
                  ]}
                />
              </>
            }
          />

          <TermSection
            title="19. Service Interruptions"
            content={
              <TermList
                items={[
                  ` The Owner may from time to time interrupt Your access or use
                  of this Application to perform some maintenance or emergency
                  services and You agree that the Owner shall not be held liable
                  for any damage, loss which may arise thereof.`,
                ]}
              />
            }
          />

          <TermSection
            title="20. Termination/Restriction of Access"
            content={
              <>
                <TermList
                  items={[
                    ` The Owner reserves the right to, at its sole discretion,
                  terminate Your access to this Application and the related
                  Service or any part thereof at any time, for any reason and
                  without notice.`,
                    `  The Owner shall have the right to terminate or
                  terminate/suspend Your account for violating the Terms of this
                  Service.`,
                    ` If You register with us, You may terminate this Service at
                  anytime by issuing a prior notice to us. Once this is done,
                  You will no longer be bound by the provisions of this Terms.`,
                    "We may provide You with other items in connection with Your use of this Service.",
                    "We hereby grant You the license to use our Service for Your personal, non-commercial use to retrieve, display and view the Content on a computer screen.",
                    "The license created under these Terms is limited, non-exclusive, non-transferable and revocable.",
                    "You agree that You will not use the Contents or Materials for any other purpose which may be contrary to your license to use this Service.",
                    "Any unauthorized use by You shall terminate the permission or license granted by this Application.",
                  ]}
                />
              </>
            }
          />
          <TermSection
            title="21. General Provisions"
            content={
              <>
                <NewList
                  spanitem="Assignment:"
                  items={[
                    ` The Owner shall be permitted to assign, transfer its rights and/or obligations under these Terms. However, You shall not be permitted to assign, transfer any rights and/or obligations under these Terms.`,
                  ]}
                />
                <NewList
                  spanitem="Entire Agreement:"
                  items={[
                    ` These Terms, disclaimers and any other agreement relating to the use of this Application constitutes the entire agreement and shall supersede any other agreement.`,
                  ]}
                />
                <NewList
                  spanitem="Separate Agreements:"
                  items={[
                    ` You may have other legal agreements with us. Those agreements are separate from these Terms. These Terms are not intended to alter, amend, revise or replace the terms of the other agreement.`,
                  ]}
                />
                <NewList
                  spanitem="Applicable law:"
                  items={[
                    ` These Terms may be governed and construed in accordance with the Laws, regulations or guidelines of the Federal Republic of Nigeria and other treaties, or regulations which is applicable in Nigeria.`,
                  ]}
                />
                <NewList
                  spanitem="Variation:"
                  items={[
                    ` The Owner may revise these Terms at any time as it sees fit, and by using this Application, You undertake that You shall review the terms of the revised Terms before accepting same. If any part of the of the Terms or any modification thereof is considered invalid or unenforceable, the remaining parts shall be considered valid and enforceable`,
                  ]}
                />
                <NewList
                  spanitem="Waiver:"
                  items={[
                    ` In the event that any provision of these Terms is held to be invalid, illegal or unenforceable, such invalidity shall not affect the validity of the remaining provisions of these Terms.`,
                  ]}
                />

                <NewList
                  spanitem="Severability:"
                  items={[
                    ` Every provision contained herein is intended to be severable. If any provision is invalid for any reason whatsoever, such invalidity shall not affect the validity of other clauses of these Terms.`,
                  ]}
                />
              </>
            }
          />
        </article>
      </motion.section>
    </>
  );
};

export { Terms, TermList, TermSection, NewList };
