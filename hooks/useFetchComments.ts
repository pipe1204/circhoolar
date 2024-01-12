import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";

const useFetchMessages = (chatId: string) => {
  const [comments, setComments] = useState<Message[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {};

    fetchMessages();
  }, [chatId]);

  return { comments, fetchLoading, createLoading };
};

export default useFetchMessages;
