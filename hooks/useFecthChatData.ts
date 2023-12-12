import { use } from 'react';
import { useState, useEffect } from 'react';
import { db } from "@/firebase";
import { collection, query, where, getDocs, doc, orderBy, limit, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Post } from "@/types/Types";

type ChatData = {
  author: string;
  avatar: string;
  title: string;
  createdAt: string;
  chatId: string;
  lastMessage: string;
  unreadCount: number;
};

const useFetchChatData = () => {
    const { data: session } = useSession();
  const [chatListData, setChatListData] = useState<ChatData[]>([]);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0);
    useEffect(() => {
        const fetchChats = async () => {
          if (session?.user?.id) {
            const chatsRef = collection(db, "chats");
            const q = query(
              chatsRef,
              where("members", "array-contains", session.user.id)
            );
            const chatDocs = await getDocs(q);
    
            let totalUnreadCount = 0;
    
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
    
              const unreadMessagesQuery = query(
                collection(db, "chats", chatDoc.id, "messages"),
                where("isRead", "==", false),
                where("user.id", "!=", session.user.id)
              );
              const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
              const unreadCount = unreadMessagesSnapshot.docs.length;
    
              totalUnreadCount += unreadCount;
    
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
                unreadCount,
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
            setTotalUnreadMessages(totalUnreadCount);
          }
        };
    
        fetchChats();
      }, [session]);
      return { chatListData, totalUnreadMessages, setChatListData };
}

export default useFetchChatData