import { authOptions } from "@/auth";
import ChatInput from "@/components/user/ChatInput";
import ChatMessages from "@/components/user/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );
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
