import { useEffect } from "react";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import {
  collection,
  query,
  updateDoc,
  where,
  onSnapshot,
} from "firebase/firestore";

const useMarkMessagesAsRead = (chatId: string) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id || !chatId) return;

    const messagesQuery = query(
      collection(db, "chats", chatId, "messages"),
      where("isRead", "==", false),
      where("sender.id", "!=", session.user.id)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      snapshot.docs.forEach((docSnapshot) => {
        updateDoc(docSnapshot.ref, { isRead: true });
      });
    });

    // Clean up the listener when the component unmounts or chatId changes
    return () => unsubscribe();
  }, [chatId, session?.user?.id]);
};

export default useMarkMessagesAsRead;
