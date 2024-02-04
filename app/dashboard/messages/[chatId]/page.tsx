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
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { CardDescription } from "@/components/ui/Card";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between mx-auto rounded-md p-0 overflow-y-auto">
      {session?.user?.id === post?.authorId ? (
        <div className="flex justify-between items-center w-full mx-auto p-2 xl:p-4 rounded-t-lg shadow-md bg-background">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={post?.images[0] || "/Logo"}
                alt="Item image"
                height={100}
                width={100}
              />
            </div>
            <h1 className="text-light-white font-semibold">
              {truncateTitle(post?.title)}
            </h1>
            <div className="bg-light-white rounded-full px-4">
              <p className="text-background font-semibold">
                {post?.sellingmethod === "Free" ? "Free" : `$${post?.price}`}
              </p>
            </div>
          </div>
          <Button
            variant={"link"}
            className="text-red underline"
            onClick={toggleSoldStatus}
          >
            {isSold ? "Back available" : "Mark as sold"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full mx-auto p-2 xl:p-4 rounded-t-lg shadow-md bg-background">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={post?.images[0] || "/Logo"}
                alt="Item image"
                height={100}
                width={100}
              />
            </div>
            <h1 className="text-light-white font-semibold">
              {truncateTitle(post?.title)}
            </h1>
            <div className="bg-light-white rounded-full px-4">
              <p className="text-background font-semibold">
                {post?.sellingmethod === "Free" ? "Free" : `$${post?.price}`}
              </p>
            </div>
          </div>
          {post?.sellingmethod === "Free" && (
            <Dialog open={isOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button variant="secondary">Donation</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="w-full">
                  <DialogTitle className="text-light-white text-center">
                    South Yarra Primary Donations
                  </DialogTitle>
                  <DialogDescription className="text-light-white text-center">
                    Thanks for your generosity ❤️ Please select from any of the
                    below options.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex flex-col gap-y-6">
                  <div className="flex flex-col space-x-1 text-light-white">
                    <h1 className="text-title-color font-semibold">
                      Charity One
                    </h1>
                    <CardDescription>
                      Charity long description Charity long description
                    </CardDescription>
                    <Link
                      href={"/"}
                      className="text-paragraph-color underline italic"
                    >
                      Link to charity
                    </Link>
                  </div>
                  <div className="flex flex-col space-x-1 text-light-white">
                    <h1 className="text-title-color font-semibold">
                      Charity One
                    </h1>
                    <CardDescription>
                      Charity long description Charity long description
                    </CardDescription>
                    <Link
                      href={"/"}
                      className="text-paragraph-color underline italic"
                    >
                      Link to charity
                    </Link>
                  </div>
                  <div className="flex flex-col space-x-1 text-light-white">
                    <h1 className="text-title-color font-semibold">
                      Charity One
                    </h1>
                    <CardDescription>
                      Charity long description Charity long description
                    </CardDescription>
                    <Link
                      href={"/"}
                      className="text-paragraph-color underline italic"
                    >
                      Link to charity
                    </Link>
                  </div>
                </div>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}

      <div className="bg-background h-[88%] rounded-b-lg overflow-y-auto flex-1">
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
