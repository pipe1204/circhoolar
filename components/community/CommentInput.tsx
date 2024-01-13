import React, { useEffect } from "react";
import { Card, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { commentPrivacy } from "@/lib/validations/auth";
import { useCommenterIdentityStore } from "@/store/store";

interface CommentInputProps {
  commentText: string;
  setCommentText: (text: string) => void;
  handleClickComment: (commentText: string) => void;
}

type Inputs = z.infer<typeof commentPrivacy>;

const CommentInput = ({
  commentText,
  setCommentText,
  handleClickComment,
}: CommentInputProps) => {
  const setCommenterIdentity = useCommenterIdentityStore(
    (state) => state.setCommenterIdentity
  );

  useEffect(() => {
    setCommenterIdentity("Name");
  }, []);

  const form = useForm<Inputs>({
    resolver: zodResolver(commentPrivacy),
    defaultValues: {
      commenter: "Name",
    },
  });

  return (
    <Card className="bg-light-white border-none shadow-none">
      <div className="my-4">
        <CardDescription className="mb-4">Comment as:</CardDescription>
        <Form {...form}>
          <form className="grid gap-4">
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
                            className="border border-dark text-dark"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-dark">
                          Myself
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="Anonymous"
                            className="border border-dark text-dark"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-dark">
                          Anonymous
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="What are your thoughts?"
        className="w-full text-sm rounded-md shadow-sm pb-10 focus:outline-none bg-light-white-100 focus:bg-light-white focus:outline-gray-50 resize-none p-4"
      />
      <div className="mt-4">
        <Button
          variant={"outline"}
          disabled={!commentText.length}
          onClick={() => handleClickComment(commentText)}
        >
          Comment
        </Button>
      </div>
    </Card>
  );
};

export default CommentInput;
