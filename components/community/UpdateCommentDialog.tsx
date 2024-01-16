"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { imageSchema, updateCommentAuth } from "@/lib/validations/auth";
import { Textarea } from "../ui/textarea";
import { useCommenterIdentityStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { Icons } from "../Icons";
import { Comment } from "@/types/Types";
import useFetchComments from "@/hooks/useFetchComments";
import useUpdateComment from "@/hooks/useUpdateComment";

type Inputs = z.infer<typeof updateCommentAuth>;

interface UpdateItemDialogProps {
  comment: Comment;
  onUpdateSuccess: () => Promise<void>;
}

const UpdateCommentDialog = ({
  comment,
  onUpdateSuccess,
}: UpdateItemDialogProps) => {
  const { data: session } = useSession();
  const { fetchSingleComment } = useFetchComments();
  const { updateComment } = useUpdateComment();
  const setCommenterIdentity = useCommenterIdentityStore(
    (state) => state.setCommenterIdentity
  );

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCommentAuth),
    defaultValues: {
      commenter: "Name",
      text: "",
    },
  });

  const checkCommenterIdentity =
    comment.commenterIdentity === session?.user?.name ? "Name" : "Anonymous";

  //Clearing inputs when dialog is closed
  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    if (comment && session?.user?.id) {
      form.setValue("commenter", checkCommenterIdentity);
      form.setValue("text", comment.text);
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  async function onSubmit(data: Inputs) {
    setLoading(true);
    if (
      data.commenter === checkCommenterIdentity &&
      data.text === comment.text
    ) {
      setLoading(false);
      setIsOpen(false);
      return;
    } else {
      updateComment(comment.id, data.text, data.commenter);
      setLoading(false);
      setIsOpen(false);
      await onUpdateSuccess();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="link" className="w-full text-dark-purple">
          <Icons.edit size={15} className="mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <div className="w-full flex xl:hidden justify-end mb-2">
            <Icons.close
              className="text-light-white text-right"
              onClick={handleCloseDialog}
            />
          </div>
          <DialogTitle className="text-light-white text-center">
            Updat comment
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[450px] xl:max-h-[500px] overflow-y-auto">
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="commenter"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setCommenterIdentity(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-row justify-start gap-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Name"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Myself
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Anonymous"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Anonymous
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">
                      Text (Optional)
                    </label>
                    <FormControl>
                      <Textarea
                        placeholder="I am looking for tips and activities to boost my 2-year-old language development. What has worked for you and your child?"
                        className="resize-none text-light-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="w-full flex flex-col justify-center items-center my-10">
                  <Button
                    variant={"outline"}
                    className="text-light-white bg-background w-9/12"
                  >
                    {loading ? "Updating..." : "Update comment"}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCommentDialog;
