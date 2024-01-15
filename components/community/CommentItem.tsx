import { Comment } from "@/types/Types";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/Card";
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
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import useCheckLikes from "@/hooks/useCheckLikes";

interface CommentItemProps {
  comment: Comment;
  handleDelete: (commentId: string) => void;
}

const CommentItem = ({ comment, handleDelete }: CommentItemProps) => {
  const { data: session } = useSession();
  const { checkIfCommentLiked, handleCommentLikeCheck, isCommentLiked } =
    useCheckLikes(undefined, comment);

  useEffect(() => {
    checkIfCommentLiked();
  }, [session?.user?.id, comment.id]);

  const timeDifference = useFormatedDate(comment.createdAt);
  return (
    <Card className="bg-light-white border-none shadow-none my-4">
      <CardHeader className="xl:p-4">
        <CardDescription>
          {comment.commenterIdentity} · {timeDifference}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <p>{comment.text}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-4 xl:p-4">
        <div className="flex flex-row items-center gap-x-8">
          <CardDescription
            className="flex flex-row items-center gap-x-2"
            onClick={() => handleCommentLikeCheck(comment.id)}
          >
            <Icons.heart
              className="text-gray-100 cursor-pointer"
              size={20}
              fill={isCommentLiked ? "red" : "none"}
            />
            {comment.numberOfLikes}{" "}
            {comment.numberOfLikes === 1 ? "Like" : "Likes"}
          </CardDescription>
          <div>
            {session?.user?.name === comment.author ? (
              <div className="flex flex-row text-right">
                <Button variant={"link"}>Edit</Button>
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
                        This action cannot be undone. This will permanently
                        delete your post and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(comment.id)}
                        className="bg-red text-light-white"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {comment.authorId === session?.user?.id &&
          comment.likedBy?.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-row gap-x-2">
                    <CardDescription>
                      {comment.likedBy.includes(session?.user?.name || "")
                        ? `You${
                            comment.likedBy.length > 1
                              ? " and others liked this"
                              : " liked this"
                          }`
                        : `${comment.likedBy[0]}${
                            comment.likedBy.length > 1
                              ? " and others liked this"
                              : " liked this"
                          }`}
                    </CardDescription>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {comment.likedBy.map((name, index) => (
                    <p key={index}>{name}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
      </CardFooter>
    </Card>
  );
};

export default CommentItem;
