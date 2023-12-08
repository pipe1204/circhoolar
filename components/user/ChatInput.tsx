"use client";

import { chatInputSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { userRef } from "@/lib/converters/User";

type CahtInput = z.infer<typeof chatInputSchema>;
interface InputUser {
  name: string;
  email: string;
  image: string;
}

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const [inputUser, setInputUser] = useState<InputUser>();

  useEffect(() => {
    const inputUserRef = userRef(session?.user?.id || "");
    const unsubscribe = onSnapshot(inputUserRef, (doc) => {
      setInputUser(doc.data());
    });
    return () => unsubscribe();
  });

  const form = useForm<CahtInput>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(data: CahtInput) {
    const inputCopy = data.input.trim();
    form.reset();

    if (!inputCopy || !session?.user?.id || !chatId) return;
    const messageRef = doc(collection(db, "chats", chatId, "messages"));
    await setDoc(messageRef, {
      text: inputCopy,
      timestamp: serverTimestamp(),
      user: {
        name: inputUser?.name,
        email: session.user.email,
        id: session.user.id,
        image: inputUser?.image,
      },
    });
  }

  console.log(inputUser);

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
