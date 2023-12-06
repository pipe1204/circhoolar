import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/Button";
import { Icons } from "../Icons";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { addChatRef, chatsRef } from "@/lib/converters/ChatMembers";
import { set } from "zod";
import { db } from "@/firebase";

interface ChatButtonProps {
  itemId: string | undefined;
  authorId: string | undefined;
  avatar: string | undefined;
}

const ChatButton = ({ itemId, authorId, avatar }: ChatButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const createNewChat = async () => {
    if (!session?.user?.id || !itemId || !authorId) return;

    setLoading(true);
    const q = query(
      chatsRef,
      where("itemId", "==", itemId),
      where("members", "array-contains", session.user.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Chat already exists, navigate to the existing chat
      toast({
        title: "Checking conversation...",
        description:
          "you've already have a conversation. Taking you there now.",
        duration: 3000,
      });
      setTimeout(() => {
        const existingChat = querySnapshot.docs[0].data();
        router.push(`/dashboard/messages/${existingChat.chatId}`);
      }, 3000);
    } else {
      toast({
        title: "Creating new conversation...",
        description: "Please wait while we create a new conversation for you.",
        duration: 3000,
      });
      const chatId = session.user.id + "-" + authorId + "-" + itemId; // Unique chatId based on userIds and itemId
      await setDoc(doc(db, "chats", chatId), {
        itemId: itemId,
        avatar: avatar,
        members: [session.user.id, authorId],
        createdAt: serverTimestamp(),
        chatId: chatId,
      })
        .then(() => {
          setTimeout(() => {
            toast({
              title: "Success!",
              description: "Your conversation has been created.",
              duration: 2000,
            });
          }, 3000);

          setTimeout(() => {
            setLoading(false);
            router.push(`/dashboard/messages/${chatId}`);
          }, 5000);
        })
        .catch((error) => {
          toast({
            title: "Error!",
            description: "there was an error creating your chat.",
            variant: "destructive",
            duration: 2000,
          });
          setLoading(false);
        });
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Button variant={"secondary"} onClick={createNewChat} className="w-4/5">
        <Icons.message className="text-light-white mr-2" size={18} />
        {loading ? "Loading..." : "Ask a question"}
      </Button>
    </div>
  );
};

export default ChatButton;
