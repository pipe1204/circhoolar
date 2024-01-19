"use client";

import Billboard from "@/components/Billboard";
import SearchBar from "@/components/SearchBar";
import Question from "@/components/community/Question";
import TopicHeader from "@/components/community/TopicHeader";
import { CardTitle } from "@/components/ui/Card";
import useMainQuestions from "@/hooks/useMainQuestions";
import { useAudienceSelectedStore, useTopicStore } from "@/store/store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const page = () => {
  const { data: session } = useSession();
  const topic = useTopicStore((state) => state.topic);
  const setTopic = useTopicStore((state) => state.setTopic);
  const audienceSelected = useAudienceSelectedStore(
    (state) => state.audienceSelected
  );

  useEffect(() => {
    setTopic(topic);
  }, []);

  const { questions } = useMainQuestions(topic, audienceSelected);

  let audienceTitle;
  switch (audienceSelected) {
    case "Public":
      audienceTitle = "All schools communities";
      break;
    case "Private":
      audienceTitle = "My school community";
      break;
    case "Own":
      audienceTitle = "My posts";
      break;
    default:
      break;
  }

  if (questions.length === 0) {
    return (
      <section className="p-2">
        <Billboard text="There are no posts at this moment" />
      </section>
    );
  }

  return (
    <section className="p-2 pb-28 xl:pb-10">
      <div className="flex flex-col-reverse gap-y-4 xl:flex-row justify-between xl:gap-x-4">
        <div className="w-full xl:w-[60%]">
          <div>
            <div className="relative mb-4">
              <div className="absolute px-4 inset-0 flex items-center">
                <span className="w-full border-t border-primary-purple" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <CardTitle className="bg-primary-purple w-3/4 xl:w-2/3 px-2 py-[3px] text-center text-light-white text-lg xl:text-xl rounded-md">
                  {audienceTitle}
                </CardTitle>
              </div>
            </div>
            <TopicHeader />
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
        <div className="xl:flex w-full xl:w-[40%]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default page;
