import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Post } from "@/types/Types";
import React, { useEffect, useState } from "react";
import ChatListRows from "./ChatListRows";

type ChatData = {
  author: string;
  avatar: string;
  title: string;
  createdAt: string;
  chatId: string;
  lastMessage: string;
};

const ChatList = () => {
  const { data: session } = useSession();
  const [chatListData, setChatListData] = useState<ChatData[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      if (session?.user?.id) {
        const chatsRef = collection(db, "chats");
        const q = query(
          chatsRef,
          where("members", "array-contains", session.user.id)
        );
        const chatDocs = await getDocs(q);

        const chatDataPromises = chatDocs.docs.map(async (chatDoc) => {
          const chatData = chatDoc.data();
          const [initiatorId, receiverId] = chatData.chatId.split("-");

          // Check if the current session user is the initiator or receiver
          const otherUserId =
            session.user.id === initiatorId ? receiverId : initiatorId;
          const otherUserDoc = await getDoc(doc(db, "users", otherUserId));
          const otherUserData = otherUserDoc.data();

          // Fetch post data
          const postRef = doc(db, "posts", chatData.itemId);
          const postDoc = await getDoc(postRef);
          if (!postDoc.exists()) return null;

          const postData = postDoc.data() as Post;

          const messagesQuery = query(
            collection(db, "chats", chatDoc.id, "messages"),
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const messagesSnapshot = await getDocs(messagesQuery);
          const lastMessage = messagesSnapshot.docs[0]?.data()?.text || "";

          return {
            author: otherUserData?.name || "Unknown User",
            avatar: otherUserData?.image || "/path/to/default/avatar.jpg",
            title: postData.title,
            createdAt: chatData.createdAt.toDate().toLocaleString(),
            chatId: chatDoc.id,
            lastMessage:
              lastMessage.length > 50
                ? lastMessage.substring(0, 47) + "..."
                : lastMessage,
          };
        });

        const formatDate = (createdAt: any) => {
          if (!createdAt) return "";

          // Check if createdAt is a Firebase Timestamp
          let messageDate;
          if (typeof createdAt === "object" && "toDate" in createdAt) {
            messageDate = createdAt.toDate();
          } else if (typeof createdAt === "number") {
            // If createdAt is a number (timestamp in milliseconds)
            messageDate = new Date(createdAt);
          } else if (typeof createdAt === "string") {
            // If createdAt is a string
            messageDate = new Date(createdAt);
          } else {
            return "";
          }

          const today = new Date();
          const isToday = messageDate.toDateString() === today.toDateString();

          return isToday
            ? messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : messageDate.toLocaleDateString();
        };

        const resolvedChatData = (await Promise.all(chatDataPromises))
          .filter((data): data is NonNullable<typeof data> => data !== null)
          .map((chat) => ({
            ...chat,
            createdAt: formatDate(chat.createdAt),
          }));

        setChatListData(resolvedChatData);
      }
    };

    fetchChats();
  }, [session]);

  const handleDeleteMessage = async (chatId: string) => {
    const chatRef = doc(db, "chats", chatId);
    await deleteDoc(chatRef);
    setChatListData((prev) => prev.filter((chat) => chat.chatId !== chatId));
  };

  return (
    <div className="w-[95%] xl:w-3/4 mx-auto rounded-md p-0 xl:p-10 overflow-y-auto">
      {chatListData.length === 0 ? (
        <div className="flex justify-center w-[95%]">
          <h1 className="text-xl xl:text-2xl text-dark-purple font-semibold">
            You don't have any conversations
          </h1>
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
