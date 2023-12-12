import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from 'firebase/firestore';

const useFetchMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesSnapshot = await getDocs(sortedMessagesRef(chatId));
      const fetchedMessages = messagesSnapshot.docs.map((doc) => doc.data() as Message);
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [chatId]);

  return messages;
};

export default useFetchMessages;