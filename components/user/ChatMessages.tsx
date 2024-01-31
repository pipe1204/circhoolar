"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "../ui/UserAvatar";

const ChatMessages = ({
  chatId,
  session,
  initialMessages,
}: {
  chatId: string;
  session: Session | null;
  initialMessages: Message[];
}) => {
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-2 xl:p-14">
      {!loading && messages?.length === 0 && (
        <div className="text-light-white text-center bg-fusia rounded-lg mt-8 xl:mt-0 p-2 xl:p-8 w-4/5 mx-auto">
          <h1 className="text-lg xl:text-xl font-semibold">
            Ask anything about this item to get started
          </h1>
          <p className="mt-4">
            We will notify the author to get back to you as soon as possible
          </p>
        </div>
      )}
      {messages?.map((message) => {
        const isSender = message?.sender?.id === session?.user?.id;
        return (
          <div
            key={message?.sender?.id + message?.timestamp}
            className={`flex my-2 items-end ${
              !isSender ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <div
              className={`flex flex-col relative space-y-2 p-2 xl:p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender
                  ? "ml-auto bg-fusia text-light-white rounded-br-none"
                  : "bg-light-white dark:text-gray dark:bg-light-white rounded-bl-none"
              }`}
            >
              <p
                className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message?.sender?.name?.split(" ")[0]}
              </p>

              <div className="flex space-x-2">
                <p>{message?.text}</p>
              </div>
            </div>
            <UserAvatar
              name={message?.sender?.name}
              image={message?.sender?.image}
              className={`${isSender && "order-1"}`}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
