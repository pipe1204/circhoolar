"use client";

import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { questionRef } from "@/lib/converters/Questions";
import useFormatedDate from "@/hooks/useFormatedDate";
import { db } from "@/firebase";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Comments from "@/components/community/Comments";
import { useCommentCountStore } from "@/store/store";

const page = () => {
  const [question, setQuestion] = useState<Question>();
  const [isSaved, setIsSaved] = useState(false);
  const { data: session } = useSession();
  const params = useParams();

  const commentCount = useCommentCountStore((state) => state.commentCount);

  useEffect(() => {
    fetchQuestionData();
  }, [params.id, session?.user?.id, commentCount]);

  const fetchQuestionData = async () => {
    if (params.id && typeof params.id === "string") {
      try {
        const docRef = doc(questionRef, params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuestion(docSnap.data() as Question);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }
  };

  const timeDifference = useFormatedDate(question?.createdAt || null);

  return (
    <section className="pb-28 xl:pb-10">
      <Link href="/dashboard/community" passHref>
        <Button variant={"link"} size={"lg"} className="mb-8 px-0">
          <Icons.ArrowLeft size={15} className="mr-2" />
          Back
        </Button>
      </Link>
      <Card className="bg-light-white border border-gray-50 shadow-sm rounded-md p-4 mx-auto">
        {session?.user?.name === question?.author ? (
          <div className="flex flex-col-reverse xl:flex-row gap-x-4 justify-end items-end xl:items-center">
            <CardDescription className="text-right">
              Posted by you {timeDifference}
            </CardDescription>
          </div>
        ) : (
          <CardDescription className="text-right">
            Posted by{" "}
            {question?.identity === "Real name"
              ? question?.author
              : "Anonymous"}{" "}
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
              <CardDescription>
                {question?.numberOfComments}{" "}
                {question?.numberOfComments === 1 ? "Comment" : "Comments"}
              </CardDescription>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Comments question={question as Question} />
    </section>
  );
};

export default page;
