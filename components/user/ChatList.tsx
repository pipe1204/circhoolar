import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import ChatListRows from "./ChatListRows";
import { useTotalUnreadMessagesStore } from "@/store/store";
import useFetchChatData from "@/hooks/useFecthChatData";
import Billboard from "../Billboard";

const ChatList = () => {
  const { chatListData, setChatListData, totalUnreadMessages } =
    useFetchChatData();
  const setTotalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.setTotalUnreadMessages
  );

  useEffect(() => {
    setTotalUnreadMessages(totalUnreadMessages);
  }, [totalUnreadMessages, setTotalUnreadMessages]);

  const handleDeleteMessage = async (chatId: string) => {
    const chatRef = doc(db, "chats", chatId);
    await deleteDoc(chatRef);
    setChatListData((prev) => prev.filter((chat) => chat.chatId !== chatId));
  };

  console.log(chatListData);

  return (
    <div className="w-[95%] xl:w-3/4 mx-auto rounded-md p-0 xl:p-10 overflow-y-auto">
      {chatListData.length === 0 ? (
        <div className="flex justify-center w-[95%]">
          <Billboard text="You don't have any conversations" />
        </div>
      ) : (
        <div>
          {chatListData.map((chat, index) => (
            <ChatListRows
              key={index}
              {...chat}
              onDelete={() => handleDeleteMessage(chat.chatId)}
              chatId={chat.chatId}
              lastMessage={chat.lastMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
