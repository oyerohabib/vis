"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col px-5 md:container overflow-hidden mt-[50px] md:mt-[100px] md:mb-[100px]"
    >
      <header className="text-center">
        <h1 className="md:text-6xl text-primary leading-[76.8px] max-md:max-w-full text-2xl font-bold">
          Frequently Asked Questions
        </h1>
      </header>
      <article className="md:mt-24 mt-[10px] w-full text-base md:text-xl font-light leading-8 text-neutral-900 max-md:mt-10 max-md:max-w-full">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-5 md:space-y-9"
        >
          {faqitem.map((faq) => (
            <AccordionItem
              value={faq.question}
              key={faq.id}
              className="md:rounded-3xl rounded-md border-[2px] shadow-xl md:shadow-2xl md:py-4 border-primary px-4 text-primary"
            >
              <AccordionTrigger className="md:text-[24px] font-medium md:font-semibold text-base hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="md:text-[18px] md:font-normal">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </article>
    </motion.section>
  );
};

const faqitem = [
  {
    id: 1,
    question: "What Is Viscio?",
    answer: `Viscio express practically leverages on the domain strengths of various logistics agents and niche courier companies across Africa. With the simple convenience of a smartphone, we have smartly eliminated traditional logistics operations barriers that make movement of goods from one point to another in Africa seem like rocket science. Our operational model, harmonized with our deployed technology tools enables us to seamlessly address your logistics needs affordably, reliably and with utmost peace of mind.`,
  },
  {
    id: 2,
    question: "How To Make A Delivery Order",
    answer: `Simply download the Viscio express app and register, then proceed to select type of transaction (city or intercity); then provide required details and available agents will be matched with your request in real time.`,
  },
  {
    id: 3,
    question: "How Do I Make Payment?",
    answer: `Payment is required on the app before you are matched with any logistics agent, however, this payment is captured in our escrow system and logistics agents only get paid after successful completion of your delivery. Our payment channels are secure and safe.`,
  },
  {
    id: 4,
    question: "How Safe Are My Goods To Be Delivered?",
    answer: `Viscio is fully committed to ensuring seamless and safe movement of goods from pickup to destination. Our platform ensures transparency of goods in-transit by prescreened logistics agents via our mapping systems and telematics framework. In addition to this, Viscio ensures end-to-end operational efficiency in all our logistics transactions which are fully insured (by our NAICOM licensed provider) and smartly tracked.`,
  },
  {
    id: 5,
    question: "How Can I Become A Logistics Agent",
    answer: `You can begin the amazing journey of becoming your own boss by earning on the Viscio platform when you fulfill delivery requests as our logistics agent. All that is simply required are your personal details and details of your mobility asset. Follow the link and learn more about our criteria and on-boarding process.`,
  },
];

export { FAQ };
