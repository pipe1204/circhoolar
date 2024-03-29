"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { onSnapshot, query } from "firebase/firestore";
import { questionRef } from "@/lib/converters/Questions";
import { useSchoolCodeStore } from "@/store/store";
import SearchQuestion from "./community/SearchQuestion";
import { Question } from "@/types/Types";

const SearchBar = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    let questionQuery;

    questionQuery = query(questionRef);

    const unsubscribe = onSnapshot(
      questionQuery,
      (querySnapshot) => {
        const fetchedQuestions = querySnapshot.docs.map(
          (doc) => doc.data() as Question
        );
        setQuestions(fetchedQuestions);
      },
      (error) => {
        console.error("Error fetching questions:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setFilteredQuestions([]);
    }

    if (value.length > 0) {
      const filteredQuestions = questions.filter((question) => {
        return (
          question.title.toLowerCase().includes(value.toLowerCase()) &&
          (question.schoolCode === schoolCode || question.audience === "Public")
        );
      });
      setFilteredQuestions(filteredQuestions);
    }
  };

  return (
    <section className="xl:mt-6">
      <div className="flex flex-row items-center">
        <div className="xl:fixed w-full xl:w-[29%] flex h-10 rounded-lg border border-gray-50 bg-light-white-300 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <Icons.search className="mr-2 text-sm " />
          <input
            placeholder="Search previous questions"
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md bg-light-white-300  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      {filteredQuestions.length > 0 && (
        <div className="mt-8">
          {filteredQuestions.map((question) => (
            <SearchQuestion key={question.id} question={question} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBar;
