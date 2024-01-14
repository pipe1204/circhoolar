import { Comment } from "@/types/Types";
import React from "react";
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
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import useCreateAndDeleteComment from "@/hooks/useCreateComment";

interface CommentItemProps {
  comment: Comment;
  handleDelete: (commentId: string) => void;
}

const CommentItem = ({ comment, handleDelete }: CommentItemProps) => {
  const { data: session } = useSession();

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
      <CardFooter className="xl:p-4">
        <div className="flex flex-row items-center gap-x-8">
          <div>
            <Icons.heart className="text-gray-100 cursor-pointer" size={20} />
          </div>
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
      </CardFooter>
    </Card>
  );
};

export default CommentItem;
