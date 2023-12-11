"use client";

import { authOptions } from "@/auth";
import ChatInput from "@/components/user/ChatInput";
import ChatMessages from "@/components/user/ChatMessages";
import { db } from "@/firebase";
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { data: session } = useSession();

  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

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

  return (
    <div className="h-full w-full flex flex-col justify-between gap-y-4 mx-auto rounded-md p-0 xl:p-10 overflow-y-auto">
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
