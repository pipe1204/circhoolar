import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Separator } from "../ui/separator";
import { Question } from "@/types/Types";
import { Timestamp } from "firebase/firestore";
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";

interface QuestionProps {
  question: Question;
}

const Question = ({ question }: QuestionProps) => {
  const timeDifference = useFormatedDate(question.createdAt);

  return (
    <Card className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md p-4 mt-2">
      <CardDescription className="text-right">
        Posted by{" "}
        {question.identity === "Real name" ? question.author : "Anonymous"}{" "}
        {timeDifference}
      </CardDescription>
      <div className="cursor-pointer">
        <CardHeader>
          <CardTitle className=" text-title-color">{question.title}</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <CardDescription>{question.description}</CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex flex-row gap-x-8">
          <Icons.heart className="text-title-color" />
          <Icons.message className="text-title-color" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default Question;
