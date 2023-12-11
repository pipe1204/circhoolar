"use client";

import { db } from "@/firebase";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import {
  useCurrentChatStore,
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
import React, { useEffect, useState } from "react";

function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setProfileImage = useUserNameStore((state) => state.setProfileImage);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);
  const setTotalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.setTotalUnreadMessages
  );
  const currentChatId = useCurrentChatStore((state) => state.currentChatId);

  const [chatUnreadCounts, setChatUnreadCounts] = useState({});

  useEffect(() => {
    if (!session?.user?.id) return;

    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("members", "array-contains", session.user.id)
    );

    const unsubscribeChats = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const chatId = change.doc.id;

        if (chatId === currentChatId) return;

        if (change.type === "added" || change.type === "modified") {
          const unreadMessagesQuery = query(
            collection(db, "chats", chatId, "messages"),
            where("isRead", "==", false),
            where("user.id", "!=", session.user.id)
          );

          onSnapshot(unreadMessagesQuery, (messagesSnapshot) => {
            setChatUnreadCounts((prevCounts) => ({
              ...prevCounts,
              [chatId]: messagesSnapshot.docs.length,
            }));
          });
        }
      });
    });

    return () => unsubscribeChats();
  }, [session?.user?.id, currentChatId]);

  useEffect(() => {
    const totalUnread = Object.values(chatUnreadCounts).reduce(
      (total: number, count: any) => total + count,
      0
    );
    setTotalUnreadMessages(totalUnread);
  }, [chatUnreadCounts, setTotalUnreadMessages]);

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
