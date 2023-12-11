"use client";

import { db } from "@/firebase";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import {
  useSchoolCodeStore,
  useSchoolNameStore,
  useTotalUnreadMessagesStore,
  useUserNameStore,
} from "@/store/store";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setProfileImage = useUserNameStore((state) => state.setProfileImage);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);
  const setTotalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.setTotalUnreadMessages
  );

  const fetchTotalUnreadMessages = async () => {
    if (session?.user?.id) {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("members", "array-contains", session.user.id)
      );
      const chatDocs = await getDocs(q);
      let totalUnreadCount = 0;

      for (const chatDoc of chatDocs.docs) {
        const unreadMessagesQuery = query(
          collection(db, "chats", chatDoc.id, "messages"),
          where("isRead", "==", false),
          where("user.id", "!=", session.user.id)
        );
        const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
        totalUnreadCount += unreadMessagesSnapshot.docs.length;
      }

      setTotalUnreadMessages(totalUnreadCount);
    }
  };

  useEffect(() => {
    fetchTotalUnreadMessages();
  }, [session?.user?.id]);

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      userRef(session.user.id),
      async (docSnapShot) => {
        if (docSnapShot.exists()) {
          if (!docSnapShot.data().schoolCode) return;
          const docRef = doc(codeRef, docSnapShot.data().schoolCode);
          const schoolDocSnapshot = await getDoc(docRef);
          if (schoolDocSnapshot.exists()) {
            setSchoolName(schoolDocSnapshot.data().name);
          }
          setSchoolCode(docSnapShot.data().schoolCode);
          setUserName(docSnapShot.data().name);
          setProfileImage(docSnapShot.data().image);
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

export default GlobalStateProvider;
