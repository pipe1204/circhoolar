"use client";

import SearchBar from "@/components/SearchBar";
import Question from "@/components/community/Question";
import TopicHeader from "@/components/community/TopicHeader";
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

  return (
    <section className="p-2 mb-28 xl:mb-0">
      <div className="flex flex-col-reverse gap-y-4 xl:flex-row justify-between xl:gap-x-4">
        <div className="w-full xl:w-[60%]">
          <div>
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
