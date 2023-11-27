"use client";

import { db } from "@/firebase";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import { useSchoolCodeStore } from "@/store/store";
import { getDoc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function VerificationCodeProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      userRef(session.user.id),
      (docSnapShot) => {
        if (docSnapShot.exists()) {
          setSchoolCode(docSnapShot.data().schoolCode);
        } else {
          console.log("No such document!");
          setSchoolCode(null);
          return;
        }
      },
      (error) => {
        console.log("Error getting document:", error);
      }
    );
  }, [session, setSchoolCode]);

  return <>{children}</>;
}

export default VerificationCodeProvider;
