import React, { useEffect } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/firebase";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import Image from "next/image";
import Link from "next/link";
import useCheckLikes from "@/hooks/useCheckLikes";
import UserAvatar from "../ui/UserAvatar";

interface QuestionProps {
  question: Question;
  ownPost?: boolean;
}

const Question = ({ question, ownPost }: QuestionProps) => {
  const timeDifference = useFormatedDate(question.createdAt);
  const { data: session } = useSession();

  const { checkIfQuestionLiked, handleQuestionLikeCheck, isQuestionLiked } =
    useCheckLikes(question);

  useEffect(() => {
    checkIfQuestionLiked();
  }, [session?.user?.id, question.id]);

  const handleDeleteFromFirebase =
    (itemId: string, images?: string[]) => async () => {
      if (session?.user?.id) {
        const questionRef = doc(db, "questions", itemId);
        await deleteDoc(questionRef);
        // if (images && images.length > 0) {
        //   try {
        //     // Iterate over each image URL in the array
        //     await Promise.all(
        //       images.map(async (image) => {
        //         const match = image.match(/circhoolar_items_upload\/(.+)\.jpg/);
        //         if (match && match.length >= 2) {
        //           const publicId = match[1];
        //           // Send DELETE request to Cloudinary for each image
        //           await fetch("/api/deleteImage", {
        //             method: "POST",
        //             headers: {
        //               "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({ publicId }),
        //           });
        //         } else {
        //           console.error("Invalid image URL format");
        //         }
        //       })
        //     );

        //     // Delete the post from Firebase after all images have been deleted
        //     const questionRef = doc(db, "questions", itemId);
        //     await deleteDoc(questionRef);
        //   } catch (error) {
        //     console.error("Error deleting post or images:", error);
        //   }
        // } else {
        //   // If there are no images, just delete the post from Firebase
        //   const questionRef = doc(db, "questions", itemId);
        //   await deleteDoc(questionRef);
        // }
      }
    };

  return (
    <Card className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md p-4 my-4">
      {ownPost ? (
        <div className="flex flex-col xl:flex-row justify-between items-end xl:items-center">
          <div>
            <p className="text-xs text-dark-purple font-semibold">
              {question.topic}
            </p>
          </div>
          <div className="flex flex-col-reverse xl:flex-row gap-x-4 justify-end items-end xl:items-center">
            <CardDescription className="text-right">
              Posted by you {timeDifference}
            </CardDescription>
            <div className="flex flex-row text-right">
              <UpdateQuestionDialog itemId={question.id} />
              <AlertDialog>
                <AlertDialogTrigger className="text-red flex justify-center items-center text-sm">
                  <Icons.trash size={15} className="mr-2" />
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-light-white">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your post and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteFromFirebase(
                        question.id,
                        question.images
                      )}
                      className="bg-red text-light-white"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-2">
            <UserAvatar
              name={
                question.identity === "Real name"
                  ? question.author
                  : "Anonymous"
              }
              image={question.identity === "Real name" ? question.avatar : null}
            />
          </div>
          <div className="flex flex-col xl:flex-row justify-between items-end xl:items-center">
            <div>
              <p className="text-sm text-dark-purple font-semibold">
                {question.topic}
              </p>
            </div>
            <CardDescription className="text-right">
              Posted by{" "}
              {session?.user?.name === question.author
                ? "you"
                : question.identity === "Real name"
                ? question.author
                : "Anonymous"}{" "}
              {timeDifference}
            </CardDescription>
          </div>
        </div>
      )}
      <Link href={`/dashboard/community/${question?.id}`}>
        <div className="cursor-pointer">
          <CardHeader className="p-3">
            <CardTitle className="text-background text-xl xl:text-2xl font-semibold">
              {question.title}
            </CardTitle>
          </CardHeader>
          <Separator className="mb-2" />
          {question?.images?.length > 0 && (
            <CardContent className="flex flex-col xl:flex-row justify-center items-center space-y-4 xl:space-x-4 p-2 overflow-y-auto xl:overflow-x-auto">
              {question?.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={image}
                    alt="Question image"
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                </div>
              ))}
            </CardContent>
          )}

          <CardContent>
            <CardDescription>{question.description}</CardDescription>
          </CardContent>
        </div>
      </Link>
      <CardFooter className="mt-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-8">
            <div className="flex flex-row items-center gap-x-2">
              <div onClick={() => handleQuestionLikeCheck(question.id)}>
                <Icons.heart
                  className="text-gray-100 cursor-pointer"
                  fill={isQuestionLiked ? "red" : "none"}
                />
              </div>
              <CardDescription>
                {question.numberOfLikes}{" "}
                {question.numberOfLikes === 1 ? "Like" : "Likes"}
              </CardDescription>
            </div>
            <Link href={`/dashboard/community/${question?.id}`}>
              <div className="flex flex-row items-center gap-x-2">
                <Icons.message className="text-gray-100 cursor-pointer" />
                <CardDescription>
                  {question.numberOfComments}{" "}
                  {question.numberOfComments === 1 ? "Comment" : "Comments"}
                </CardDescription>
              </div>
            </Link>
          </div>
          {question.authorId === session?.user?.id &&
            question.likedBy?.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-row gap-x-2">
                      <CardDescription>
                        {question.likedBy.includes(session?.user?.name || "")
                          ? `You${
                              question.likedBy.length > 1
                                ? " and others liked this"
                                : " liked this"
                            }`
                          : `${question.likedBy[0]}${
                              question.likedBy.length > 1
                                ? " and others liked this"
                                : " liked this"
                            }`}
                      </CardDescription>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {question.likedBy.map((name, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Question;
