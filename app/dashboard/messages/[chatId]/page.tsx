"use client";

import { Button } from "@/components/ui/Button";
import ChatInput from "@/components/user/ChatInput";
import ChatMessages from "@/components/user/ChatMessages";
import useFetchMessages from "@/hooks/useFetchMessages";
import useMarkMessagesAsRead from "@/hooks/useMarkMessagesAsRead";
import usePostDetails from "@/hooks/usePostDetails";
import useWindowSize from "@/hooks/useWindowSize";
import { useCurrentChatStore } from "@/store/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { data: session } = useSession();

  const { width } = useWindowSize();
  const setCurrentChatId = useCurrentChatStore(
    (state) => state.setCurrentChatId
  );

  const messages = useFetchMessages(chatId);
  useMarkMessagesAsRead(chatId);
  const { post, isSold, toggleSoldStatus } = usePostDetails(chatId);

  useEffect(() => {
    setCurrentChatId(chatId);

    return () => {
      setCurrentChatId(null);
    };
  }, [chatId, setCurrentChatId]);

  const truncateTitle = (title: string | undefined) => {
    if (typeof width === "undefined" || typeof title === "undefined") {
      return null;
    }
    let maxLength = 30;

    if (width < 768) maxLength = 10;
    else if (width < 1024) maxLength = 20;

    return title.length > maxLength
      ? title?.substring(0, maxLength - 3) + "..."
      : title;
  };

  return (
    <div className="h-full w-full flex flex-col justify-between gap-y-2 mx-auto rounded-md p-0 overflow-y-auto">
      {session?.user?.id === post?.authorId && (
        <div className="flex justify-between items-center w-full xl:w-1/2 mx-auto p-2 xl:p-4 rounded-lg shadow-md bg-light-white">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={post?.images[0] || "/Logo"}
                alt="Item image"
                height={100}
                width={100}
              />
            </div>
            <h1 className="text-dark-purple font-semibold">
              {truncateTitle(post?.title)}
            </h1>
          </div>
          <Button
            variant={"link"}
            className="text-red underline"
            onClick={toggleSoldStatus}
          >
            {isSold ? "Back available" : "Mark as sold"}
          </Button>
        </div>
      )}

      <div className="bg-background h-[88%] rounded-lg overflow-y-auto flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={messages}
        />
      </div>
      <div>
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
