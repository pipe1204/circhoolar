"use client";

import SearchBar from "@/components/SearchBar";
import Question from "@/components/community/Question";
import TopicHeader from "@/components/community/TopicHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useMainQuestions from "@/hooks/useMainQuestions";
import { communityQuestionsAudience } from "@/lib/validations/auth";
import { useAudienceSelectedStore, useTopicStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
type Inputs = z.infer<typeof communityQuestionsAudience>;

const page = () => {
  const topic = useTopicStore((state) => state.topic);
  const setTopic = useTopicStore((state) => state.setTopic);
  const audienceSelected = useAudienceSelectedStore(
    (state) => state.audienceSelected
  );
  const setAudienceSelected = useAudienceSelectedStore(
    (state) => state.setAudienceSelected
  );

  useEffect(() => {
    setAudienceSelected("Public");
    setTopic("All");
  }, []);

  const { questions, loading, error } = useMainQuestions(
    topic,
    audienceSelected
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(communityQuestionsAudience),
    defaultValues: {
      audience: "Public",
    },
  });

  return (
    <section className="p-2">
      <Form {...form}>
        <form className="grid gap-4 mb-4">
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setAudienceSelected(value);
                    }}
                    defaultValue={field.value}
                    className="flex flex-row space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="Public"
                          className="border border-dark text-dark"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-dark">
                        All schools
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="Private"
                          className="border border-dark text-dark"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-dark">
                        My School Community
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col-reverse gap-y-4 xl:flex-row justify-between xl:gap-x-4">
        <div className="w-full xl:w-[60%]">
          <TopicHeader />
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
        <div className="w-full xl:w-[40%]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default page;
