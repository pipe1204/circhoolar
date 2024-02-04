import { Comment } from "@/types/Types";
import React, { use, useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import useCheckLikes from "@/hooks/useCheckLikes";
import useFetchAllUsers from "@/hooks/useFetchAllUsers";
import { useLikeCommentCountStore } from "@/store/store";
import UpdateCommentDialog from "./UpdateCommentDialog";
import { usePathname } from "next/navigation";
import { reportBehaviours } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { reportSchema } from "@/lib/validations/auth";

interface CommentItemProps {
  comment: Comment;
  handleDelete: (comment: Comment) => void;
  fetchSingleComment: (
    commentId: string
  ) => Promise<Comment | null | undefined>;
}

type Inputs = z.infer<typeof reportSchema>;
const CommentItem = ({
  comment,
  handleDelete,
  fetchSingleComment,
}: CommentItemProps) => {
  const { data: session } = useSession();
  const path = usePathname();
  const { checkIfCommentLiked, handleCommentLikeCheck, isCommentLiked } =
    useCheckLikes(undefined, comment);

  const likeCommentCount = useLikeCommentCountStore(
    (state) => state.likeCommentCount
  );

  const [localComment, setLocalComment] = useState<Comment>(comment);
  const [behaviour, setBehaviour] = useState<string>("");
  const [behaviourDescription, setBehaviourDescription] = useState<string>("");

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

  const refreshComment = async () => {
    const updatedComment = await fetchSingleComment(comment.id);
    if (updatedComment) {
      setLocalComment(updatedComment);
    }
  };

  const form = useForm<Inputs>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      behaviour: undefined,
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
  }

  const handleSendReport = () => {
    //functionality to send email to issues@circhoolar.com
  };

  const handleBehaviorSelect = (selectedBehavior: string) => {
    const selectedOption = reportBehaviours.find(
      (behaviour) => behaviour.behaviour === selectedBehavior
    );
    setBehaviour(selectedBehavior);
    setBehaviourDescription(selectedOption?.description || "");
  };

  const handleDismiss = () => {
    setBehaviour("");
    setBehaviourDescription("");
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
      <CardFooter className="flex flex-col items-start xl:p-4">
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
          <AlertDialog>
            <AlertDialogTrigger className="text-gray flex justify-center items-center text-sm">
              <Icons.flag
                size={20}
                className="text-gray-100 cursor-pointer mr-2"
              />
              Report
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-light-white">
                  Submit a Report
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Thanks for looking out for yourself and your community by
                  reporting things that break the rules. Let us know what's
                  happening, and we'll look into it.
                </AlertDialogDescription>
                <div className="flex -flex-row flex-wrap gap-x-4 gap-y-4 py-4">
                  <Form {...form}>
                    <form
                      className="grid gap-4"
                      onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                      }
                    >
                      <FormField
                        control={form.control}
                        name="behaviour"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-light-white">
                              Behaviours
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={handleBehaviorSelect}
                                defaultValue={field.value}
                                className="flex flex-row flex-wrap space-y-2"
                              >
                                {reportBehaviours.map((behaviour) => (
                                  <FormItem
                                    key={behaviour.id}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={behaviour.behaviour}
                                        className="border border-light-white text-light-white"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-light-white">
                                      {behaviour.behaviour}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                  {behaviourDescription && (
                    <div>
                      <h1 className="text-title-color text-lg font-semibold mt-4">
                        {behaviour}
                      </h1>
                      <CardDescription className="text-title-color py-2">
                        {behaviourDescription}
                      </CardDescription>
                    </div>
                  )}
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDismiss}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red text-light-white"
                  onClick={handleSendReport}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div>
            {session?.user?.name === localComment.author &&
            path !== "/dashboard/comments" ? (
              <div className="flex flex-row text-right">
                <UpdateCommentDialog
                  comment={localComment}
                  onUpdateSuccess={refreshComment}
                />
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
