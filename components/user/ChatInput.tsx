"use client";

import { useSession } from "next-auth/react";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useUserData } from "@/hooks/useUserData";
import { useSubmitChatMessage } from "@/hooks/useSubmitChatMessage";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();

  const inputUser = useUserData();
  const { form, onSubmit } = useSubmitChatMessage(chatId, session, inputUser);

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          className="w-full flex space-x-2 p-2 rounded-xl max-w-4xl mx-auto bg-light-white border border-light-white-500"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Start the conversation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"default"} className="text-light-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
