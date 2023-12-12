import { useEffect } from 'react';
import { db } from '@/firebase';
import { useSession } from 'next-auth/react';
import { collection, doc, query, updateDoc, where, getDocs } from 'firebase/firestore';

const useMarkMessagesAsRead = (chatId: string) => {
  const { data: session } = useSession();

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (session?.user?.id) {
        const messagesQuery = query(
          collection(db, "chats", chatId, "messages"),
          where("isRead", "==", false),
          where("user.id", "!=", session.user.id)
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        messagesSnapshot.docs.forEach(async (docSnapshot) => {
          await updateDoc(docSnapshot.ref, { isRead: true });
        });
      }
    };

    markMessagesAsRead();
  }, [chatId, session?.user?.id]);
};

export default useMarkMessagesAsRead;