import { Comment } from "@/types/Types";
import React, { useEffect, useState } from "react";
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
import useFetchAllUsers from "@/hooks/useFetchAllUsers";
import { useLikeCommentCountStore } from "@/store/store";

interface CommentItemProps {
  comment: Comment;
  handleDelete: (comment: Comment) => void;
  fetchSingleComment: (
    commentId: string
  ) => Promise<Comment | null | undefined>;
}

const CommentItem = ({
  comment,
  handleDelete,
  fetchSingleComment,
}: CommentItemProps) => {
  const { data: session } = useSession();
  const { checkIfCommentLiked, handleCommentLikeCheck, isCommentLiked } =
    useCheckLikes(undefined, comment);

  const likeCommentCount = useLikeCommentCountStore(
    (state) => state.likeCommentCount
  );

  const [localComment, setLocalComment] = useState<Comment>(comment);

  const { users } = useFetchAllUsers();

  useEffect(() => {
    checkIfCommentLiked();
  }, [session?.user?.id, comment.id, likeCommentCount]);

  const timeDifference = useFormatedDate(comment.createdAt);

  const isAuthorInUsers = () => {
    return users.some((user) => user.id === comment.authorId);
  };

  const handleCommentLike = async () => {
    await handleCommentLikeCheck(comment.id);
    const updatedComment = await fetchSingleComment(comment.id);
    if (updatedComment) {
      setLocalComment(updatedComment);
    }
  };

  return (
    <Card className="bg-light-white border-none shadow-none my-4">
      <CardHeader className="xl:p-4">
        <CardDescription>
          {isAuthorInUsers() ? localComment.commenterIdentity : "Deleted user"}{" "}
          · {timeDifference}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <p>{localComment.text}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-y-4 xl:p-4">
        <div className="flex flex-row items-center gap-x-8">
          <CardDescription
            className="flex flex-row items-center gap-x-2"
            onClick={() => handleCommentLike()}
          >
            <Icons.heart
              className="text-gray-100 cursor-pointer"
              size={20}
              fill={isCommentLiked ? "red" : "none"}
            />
            {localComment.numberOfLikes}{" "}
            {localComment.numberOfLikes === 1 ? "Like" : "Likes"}
          </CardDescription>
          <div>
            {session?.user?.name === localComment.author ? (
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
                        onClick={() => handleDelete(localComment)}
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
        {localComment.authorId === session?.user?.id &&
          localComment.likedBy?.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-row gap-x-2">
                    <CardDescription>
                      {localComment.likedBy.includes(session?.user?.name || "")
                        ? `You${
                            localComment.likedBy.length > 1
                              ? " and others liked this"
                              : " liked this"
                          }`
                        : `${localComment.likedBy[0]}${
                            localComment.likedBy.length > 1
                              ? " and others liked this"
                              : " liked this"
                          }`}
                    </CardDescription>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {localComment.likedBy.map((name, index) => (
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
