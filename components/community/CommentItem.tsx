import { Comment } from "@/types/Types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/Card";
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: string) => void;
  loadingDeleteComment: boolean;
}

const CommentItem = ({
  comment,
  onDeleteComment,
  loadingDeleteComment,
}: CommentItemProps) => {
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
              <div>
                <Button variant={"link"}>Edit</Button>
                <Button variant={"link"} className="text-red">
                  Delete
                </Button>
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
