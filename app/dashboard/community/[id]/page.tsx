"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Question } from "@/types/Types";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import { Icons } from "@/components/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import UpdateQuestionDialog from "@/components/community/UpdateQuestionDialog";
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
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { questionRef } from "@/lib/converters/Questions";
import useFormatedDate from "@/hooks/useFormatedDate";
import { db } from "@/firebase";

const page = () => {
  const [question, setQuestion] = useState<Question>();
  const [isSaved, setIsSaved] = useState(false);
  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    const fetchQuestionData = async () => {
      if (params.id && typeof params.id === "string") {
        try {
          const docRef = doc(questionRef, params.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setQuestion(docSnap.data() as Question);

            if (session?.user?.id) {
              const savedItemRef = doc(
                userRef(session.user.id),
                "savedItems",
                params.id
              );
              const savedItemSnap = await getDoc(savedItemRef);
              setIsSaved(savedItemSnap.exists());
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      }
    };
    fetchQuestionData();
  }, [params.id, session?.user?.id]);

  const timeDifference = useFormatedDate(question?.createdAt || null);

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
    <Card className="bg-light-white border border-gray-50 shadow-sm rounded-md p-4 mt-2 xl:w-5/6 mx-auto">
      {session?.user?.name === question?.author ? (
        <div className="flex flex-col-reverse xl:flex-row gap-x-4 justify-end items-end xl:items-center">
          <CardDescription className="text-right">
            Posted by you {timeDifference}
          </CardDescription>
        </div>
      ) : (
        <CardDescription className="text-right">
          Posted by{" "}
          {question?.identity === "Real name" ? question?.author : "Anonymous"}{" "}
          {timeDifference}
        </CardDescription>
      )}
      <div>
        <CardHeader className="p-3">
          <CardTitle className="text-background text-xl xl:text-2xl font-semibold">
            {question?.title}
          </CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        {question && question?.images?.length > 0 && (
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
          <CardDescription>{question?.description}</CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex flex-row gap-x-8">
          <div className="flex flex-row items-center gap-x-2">
            <Icons.heart className="text-gray-100 cursor-pointer" />
            <CardDescription>Like</CardDescription>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Icons.message className="text-gray-100 cursor-pointer" />
            <CardDescription>Comment</CardDescription>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default page;
