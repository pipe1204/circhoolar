"use client";

import { Button } from "@/components/ui/Button";
import ChatInput from "@/components/user/ChatInput";
import ChatMessages from "@/components/user/ChatMessages";
import { db } from "@/firebase";
import useWindowSize from "@/hooks/useWindowSize";
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { postRef } from "@/lib/converters/Post";
import { useCurrentChatStore } from "@/store/store";
import { Post } from "@/types/Types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [isAlreisSoadySold, setIsAlreadySold] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    setCurrentChatId(chatId);

    return () => {
      setCurrentChatId(null); // Clear the current chat ID when unmounted
    };
  }, [chatId, setCurrentChatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesSnapshot = await getDocs(sortedMessagesRef(chatId));
      const messages = messagesSnapshot.docs.map((doc) => doc.data());
      setInitialMessages(messages);
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        where("isRead", "==", false),
        where("user.id", "!=", session?.user?.id)
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      messagesSnapshot.docs.forEach(async (doc) => {
        const messageRef = doc.ref;
        await updateDoc(messageRef, { isRead: true });
      });
    };

    if (session?.user?.id) {
      markMessagesAsRead();
    }
  }, [chatId, session?.user?.id, initialMessages]);

  useEffect(() => {
    const checkPost = async () => {
      if (session?.user?.id) {
        const itemId = chatId.split("-").pop();

        const docRef = doc(postRef, itemId);
        const docSnap = await getDoc(docRef);
        setCurrentPost(docSnap.data() as Post);
        setIsAlreadySold(docSnap.data()?.isSold);
      }
    };
    checkPost();
  }, [chatId, session?.user?.id]);

  const handleSoldItem = async () => {
    const docRef = doc(postRef, currentPost?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        isSold: !docSnap.data().isSold,
      });
      setIsAlreadySold(!docSnap.data().isSold);
    }
  };

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
      {session?.user?.id === currentPost?.authorId && (
        <div className="flex justify-between items-center w-full xl:w-1/2 mx-auto p-2 xl:p-4 rounded-lg shadow-md bg-light-white">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={currentPost?.images[0] || "/Logo"}
                alt="Item image"
                height={100}
                width={100}
              />
            </div>
            <h1 className="text-dark-purple font-semibold">
              {truncateTitle(currentPost?.title)}
            </h1>
          </div>
          <Button
            variant={"link"}
            className="text-red underline"
            onClick={handleSoldItem}
          >
            {isAlreisSoadySold ? "Back available" : "Mark as sold"}
          </Button>
        </div>
      )}

      <div className="bg-background h-[88%] rounded-lg overflow-y-auto flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <div>
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
