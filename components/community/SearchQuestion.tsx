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

  const handleDeleteFromFirebase =
    (itemId: string, image?: string) => async () => {
      if (session?.user?.id) {
        try {
          const questionRef = doc(db, "questions", itemId);
          await deleteDoc(questionRef);
        } catch (error) {
          console.error("Error deleting post:", error);
        }
        //Work on delete image function here
        // const match = image?.match(/circhoolar_items_upload\/(.+)\.jpg/);
        // if (match && match.length >= 2) {
        //   const publicId = match[1];
        //   try {
        //     // Send DELETE request to Cloudinary
        //     await fetch("/api/deleteImage", {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ publicId }),
        //     });
        //     // Delete the post from Firebase
        //     const questionRef = doc(db, "posts", itemId);
        //     await deleteDoc(questionRef);
        //   } catch (error) {
        //     console.error("Error deleting post:", error);
        //   }
        // } else {
        //   console.error("Invalid image URL format");
        // }
      }
    };

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
