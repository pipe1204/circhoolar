import React from "react";
import { CardTitle } from "@/components/ui/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questionsAndAnswers } from "@/constants";

const page = () => {
  return (
    <section className="flex-start flex-col paddings xl:mx-20 my-16 text-light-white">
      <CardTitle className="text-light-white mb-4 text-2xl xl:text-4xl">
        Circhoolar Questions and{" "}
        <span className="text-title-color">Answers</span>
      </CardTitle>
      <Accordion type="single" collapsible className="w-full">
        {questionsAndAnswers.map((questionAndAnswer) => {
          return (
            <AccordionItem
              key={questionAndAnswer.id}
              value={questionAndAnswer.question}
            >
              <AccordionTrigger className="text-light-white">
                {questionAndAnswer.question}
              </AccordionTrigger>
              <AccordionContent className="text-title-color text-[16px]">
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
