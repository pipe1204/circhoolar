import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatInputSchema } from "@/lib/validations/auth";
import {
  doc,
  collection,
  serverTimestamp,
  setDoc,
  where,
  query,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Session } from "next-auth";

interface InputUser {
  name: string;
  email: string;
  image: string;
}

export function useSubmitChatMessage(
  chatId: string,
  session?: Session | null,
  inputUser?: InputUser
) {
  const form = useForm({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(data: any) {
    const inputCopy = data.input.trim();
    form.reset();

    if (!inputCopy || !session?.user?.id || !chatId) return;
    // Fetch the chat document to get the members array
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      console.log("No such chat document!");
      return;
    }

    const members = chatDoc.data().members;
    const receiverId = members.find(
      (memberId: string) => memberId !== session.user.id
    );

    if (!receiverId) {
      console.log("Receiver not found");
      return;
    }

    // Fetch receiver's data from the "users" collection
    const receiverRef = doc(db, "users", receiverId);
    const receiverDoc = await getDoc(receiverRef);

    if (!receiverDoc.exists()) {
      console.log("No such user document for receiver!");
      return;
    }

    const receiverData = receiverDoc.data();

    const messageRef = doc(collection(db, "chats", chatId, "messages"));
    await setDoc(messageRef, {
      text: inputCopy,
      isRead: false,
      timestamp: serverTimestamp(),
      sender: {
        name: inputUser?.name,
        email: session.user.email,
        id: session.user.id,
        image:
          inputUser?.image ||
          "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
      },
      receiver: {
        name: receiverData.name,
        email: receiverData.email,
        id: receiverId,
        image: receiverData.image,
      },
    });
    await updateUnreadMessagesCount(receiverId);
  }

  async function updateUnreadMessagesCount(receiverId: string) {
    let totalUnread = 0;
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("members", "array-contains", receiverId));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const chatId = doc.id;
      const unreadMessagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        where("isRead", "==", false),
        where("receiver.id", "==", receiverId)
      );

      const messagesSnapshot = await getDocs(unreadMessagesQuery);
      totalUnread += messagesSnapshot.docs.length;
    }

    const receiverRef = doc(db, "users", receiverId);
    await updateDoc(receiverRef, {
      unreadMessages: totalUnread,
    });
  }

  return { form, onSubmit };
}
