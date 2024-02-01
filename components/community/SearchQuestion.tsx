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
import { deleteDoc, doc } from "firebase/firestore";
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { db } from "@/firebase";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import Image from "next/image";
import Link from "next/link";

interface SearchQuestionProps {
  question: Question;
}

const SearchQuestion = ({ question }: SearchQuestionProps) => {
  const timeDifference = useFormatedDate(question.createdAt);
  const { data: session } = useSession();

  return (
    <Card className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md p-4 mt-2">
      {session?.user?.name === question.author ? (
        <div className="flex flex-col-reverse xl:flex-row gap-x-4 justify-end items-end xl:items-center">
          <CardDescription className="text-right">
            Posted by you {timeDifference}
          </CardDescription>
        </div>
      ) : (
        <CardDescription className="text-right">
          Posted by{" "}
          {question.identity === "Real name" ? question.author : "Anonymous"}{" "}
          {timeDifference}
        </CardDescription>
      )}
      <Link href={`/dashboard/community/${question?.id}`}>
        <div className="cursor-pointer">
          <CardHeader className="p-3">
            <CardTitle className="text-gray text-xl xl:text-lg font-medium">
              {question.title}
            </CardTitle>
          </CardHeader>
          <Separator className="mb-2" />
          {question?.images?.length > 0 && (
            <CardContent className="flex justify-center items-center">
              {question?.images?.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Question image"
                  width={400}
                  height={400}
                  className="rounded-md"
                />
              ))}
            </CardContent>
          )}

          <CardContent>
            <CardDescription>{question.description}</CardDescription>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export default SearchQuestion;
