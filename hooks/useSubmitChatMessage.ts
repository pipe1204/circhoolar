import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatInputSchema } from "@/lib/validations/auth";
import { doc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Session } from "next-auth";

interface InputUser {
    name: string;
    email: string;
    image: string;
  }

export function useSubmitChatMessage(chatId: string, session?: Session | null, inputUser?: InputUser) {
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
    const messageRef = doc(collection(db, "chats", chatId, "messages"));
    await setDoc(messageRef, {
      text: inputCopy,
      isRead: false,
      timestamp: serverTimestamp(),
      user: {
        name: inputUser?.name,
        email: session.user.email,
        id: session.user.id,
        image: inputUser?.image,
      },
    });
  }

  return { form, onSubmit };
}