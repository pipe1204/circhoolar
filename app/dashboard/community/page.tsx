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
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
type Inputs = z.infer<typeof communityQuestionsAudience>;

const page = () => {
  const { data: session } = useSession();
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
      <div className="flex flex-col gap-y-4 xl:flex-row justify-between xl:gap-x-4">
        <div className="w-full xl:w-[60%]">
          <Form {...form}>
            <form className="grid gap-4 p-4 rounded-md bg-card-color w-[84%] xl:w-[43.6%] fixed">
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
                        className="flex flex-row justify-between gap-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Public"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            All schools
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Private"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            My school community
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Own"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            My posts
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="mt-16 xl:mt-14">
            <TopicHeader />
            <div className="xl:hidden block w-full mt-4 mx-auto xl:w-[40%]">
              <SearchBar />
            </div>
            {questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                ownPost={
                  session?.user?.name === question.author &&
                  audienceSelected === "Own"
                    ? true
                    : false
                }
              />
            ))}
          </div>
        </div>
        <div className="hidden xl:flex w-full xl:w-[40%]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default page;
