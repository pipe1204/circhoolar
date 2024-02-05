"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questionsAndAnswers } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useSendSupportEmail from "@/hooks/useSendSupportEmail";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  const { sendSupportEmail, isLoading, form } = useSendSupportEmail();

  const handleSubmitEmail = async (data: any) => {
    if (data.email === "" || data.name === "" || data.text === "") {
    } else {
      sendSupportEmail(data.email, data.name, data.text);
    }
  };

  return (
    <section className="bg-light-white w-11/12 xl:w-10/12 mx-auto my-8 p-4 xl:p-10 shadow-md rounded-lg flex flex-col justify-center items-center">
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
      <Card className="mt-8 w-full">
        <CardHeader className="flex flex-col justify-center items-center text-center">
          <CardTitle className="text-title-color font-semibold text-2xl xl:text-4xl">
            Can't find what you are looking for?
          </CardTitle>
          <CardDescription>
            Send us an message and we will get in touch as soon as we can
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full xl:w-3/4 mx-auto pb-10">
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={(...args) =>
                  void form.handleSubmit(handleSubmitEmail)(...args)
                }
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sx text-light-white">Email</label>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="shadow-sm bg-light-white-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sx text-light-white">
                        Full name
                      </label>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="shadow-sm bg-light-white-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-light-white text-sx">
                        Message
                      </label>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us how can we help?"
                          className="resize-none text-background bg-light-white-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"default"}
                  className="hover:text-light-white"
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
