"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questionsAndAnswers } from "@/constants";

const page = () => {
  return (
    <section className="bg-light-white w-11/12 xl:w-10/12 mx-auto my-8 p-10 shadow-md rounded-lg flex flex-col justify-center items-center">
      <Accordion type="single" collapsible className="w-full">
        {questionsAndAnswers.map((questionAndAnswer) => {
          return (
            <AccordionItem
              key={questionAndAnswer.id}
              value={questionAndAnswer.question}
            >
              <AccordionTrigger className="text-background">
                {questionAndAnswer.question}
              </AccordionTrigger>
              <AccordionContent className="text-dark-purple text-[16px]">
                {questionAndAnswer.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default page;
