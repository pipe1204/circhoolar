import { useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import { useSession } from "next-auth/react";
import { useUserNameStore, useSchoolCodeStore } from "@/store/store";

const useSchoolCodeVerification = () => {
  const [validCode, setValidCode] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<string>("");
  const { data: session, update } = useSession();
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);

  const handleCheckCode = async (code: string, name: string) => {
    if (session?.user?.id) {
      await checkCode(code, session.user.id, name);
    } else {
      console.log("User is not logged in.");
    }
  };

  const checkCode = async (code: string, userId: string, name: string) => {
    if (!code) {
      console.log("Code is undefined or empty");
      setValidCode(false);
      setErrorCode("Code is required");
      return;
    }

    const docRef = doc(codeRef, code);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setValidCode(true);
      setUserName(name);
      setSchoolCode(code);

      const userDocRef = userRef(userId);
      await updateDoc(userDocRef, {
        schoolCode: code,
        name: name,
        hasBankDetails: false,
        likedQuestions: [],
        likedComments: [],
        notifications: [],
      });
      await update({ ...session, user: { ...session?.user, name: name } });
    } else {
      console.log("No such document!");
      setValidCode(false);
      setErrorCode("Wrong code. Please try again.");
    }
  };

  return { validCode, errorCode, handleCheckCode };
};

export default useSchoolCodeVerification;
