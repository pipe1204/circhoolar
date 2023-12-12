import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { onSnapshot } from "firebase/firestore";
import { userRef } from "@/lib/converters/User";

interface InputUser {
  name: string;
  email: string;
  image: string;
}

export function useUserData() {
  const { data: session } = useSession();
  const [inputUser, setInputUser] = useState<InputUser>();

  useEffect(() => {
    if (session?.user?.id) {
      const inputUserRef = userRef(session.user.id);
      const unsubscribe = onSnapshot(inputUserRef, (doc) => {
        setInputUser(doc.data());
      });
      return () => unsubscribe();
    }
  }, [session?.user?.id]);

  return inputUser;
}