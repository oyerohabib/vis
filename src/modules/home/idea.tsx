import * as React from "react";

type BenefitItemProps = {
  text: string;
};

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => {
  return <li>{text}</li>;
};

export default function MyComponent() {
  const benefits = [
    "Viscio provides improved market access to a large pool of prospective customers.",
    "Viscio will provide improved visibility and tracking of your mobility asset leveraging on our telematics framework",
    "Registration and Otp Verification (with a fully completed profile)",
    "Prospective Logistics Agents are required to select mobility asset type (motorbike, vehicle or truck), year of production, plate number and uploads of documents (driver license, vehicle registration document and complete )",
    "Our Quality Assessment Agent will verify/screen your application after which you become verified on the Viscio express platform; which means you can start receiving requests.",
    "For complete information about required documents, click here for checklist.",
    "For more information kindly send an email to: support@viscio.com.ng",
  ];

  return (
    <section className="flex flex-col px-5">
      <h1 className="self-center text-6xl text-blue-900 capitalize leading-[76.8px] max-md:max-w-full max-md:text-4xl">
        Become a logistics agent
      </h1>
      <article className="mt-10 w-full text-2xl font-light tracking-wider leading-7 underline text-neutral-900 max-md:max-w-full">
        <p>
          You can truly become your own boss as a Viscio express logistics agent
          whether as an owner of a motorcycle, vehicle or a fleet of mobility
          assets. Viscio is a collaborative tool that depends on logistics
          agents and logistics infrastructure partners. As our logistics agent
          you can earn by fulfilling logistics requests in any of the cities we
          operate.
          <br />
          <br />
          <span className="font-medium underline">
            Benefits our Logistics Agent Enjoy
          </span>
        </p>
        <ul>
          <BenefitItem text="Viscio provides improved market access to a large pool of prospective customers." />
        </ul>
        <p>
          For fleet operators, Viscio increases sales prospects and overall
          operational efficiency with access to customized tools.
        </p>
        <ul>
          <BenefitItem text="Viscio will provide improved visibility and tracking of your mobility asset leveraging on our telematics framework" />
        </ul>
        <p>
          To begin, download our Viscio Express Driver App and follow the steps
          below:
          <br />
        </p>
        <ul>
          {benefits.slice(2).map((benefit, index) => (
            <BenefitItem key={index} text={benefit} />
          ))}
        </ul>
      </article>
    </section>
  );
}
