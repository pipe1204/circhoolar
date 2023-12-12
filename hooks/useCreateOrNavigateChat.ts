import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { chatsRef } from '@/lib/converters/ChatMembers';
import { db } from '@/firebase';
import { useToast } from "../components/ui/use-toast";

const useCreateOrNavigateChat = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
  
    const createOrNavigateToChat = async (itemId: string, authorId: string, avatar: string) => {
      if (!session?.user?.id || !itemId || !authorId) return;
  
      setLoading(true);
      const q = query(chatsRef, where("itemId", "==", itemId), where("members", "array-contains", session.user.id));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Chat already exists, navigate to the existing chat
        navigateToExistingChat(querySnapshot.docs[0].data().chatId);
      } else {
        createNewChat(itemId, authorId, avatar);
      }
    };
  
    const navigateToExistingChat = (chatId: string) => {
      toast({
        title: "Checking conversation...",
        description: "You already have a conversation. Taking you there now.",
        duration: 3000,
      });
      setTimeout(() => {
        router.push(`/dashboard/messages/${chatId}`);
      }, 3000);
    };
  
    const createNewChat = async (itemId: string, authorId: string, avatar: string) => {
      toast({
        title: "Creating new conversation...",
        description: "Please wait while we create a new conversation for you.",
        duration: 3000,
      });
      const chatId = session?.user.id + "-" + authorId + "-" + itemId; // Unique chatId based on userIds and itemId
      await setDoc(doc(db, "chats", chatId), {
        itemId: itemId,
        avatar: avatar,
        members: [session?.user.id, authorId],
        createdAt: serverTimestamp(),
        chatId: chatId,
      })
        .then(() => {
          toast({
            title: "Success!",
            description: "Your conversation has been created.",
            duration: 2000,
          });
          setTimeout(() => {
            setLoading(false);
            router.push(`/dashboard/messages/${chatId}`);
          }, 5000);
        })
        .catch((error) => {
          toast({
            title: "Error!",
            description: "There was an error creating your chat.",
            variant: "destructive",
            duration: 2000,
          });
          setLoading(false);
        });
    };
  
    return { createOrNavigateToChat, loading };
  };
  
  export default useCreateOrNavigateChat;