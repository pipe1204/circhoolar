import ChatInput from "@/components/user/ChatInput";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  return (
    <div className="w-[95%] h-full xl:w-3/4 flex flex-col justify-between bg-light-white mx-auto rounded-md p-0 xl:p-10 overflow-y-auto">
      <div className="bg-background h-[88%] rounded-lg overflow-y-auto"></div>
      <div>
        <ChatInput chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
