import SearchBar from "@/components/SearchBar";
import Question from "@/components/community/Question";
import TopicHeader from "@/components/community/TopicHeader";
import React from "react";

const page = () => {
  return (
    <section className="p-2">
      <div className="flex flex-col-reverse gap-y-4 xl:flex-row justify-between xl:gap-x-4">
        <div className="w-full xl:w-[60%]">
          <TopicHeader />
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
        <div className="w-full xl:w-[40%]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default page;
