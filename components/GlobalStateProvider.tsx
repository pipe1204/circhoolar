"use client";

import { db } from "@/firebase";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import {
  useAudienceSelectedStore,
  useBankDetailsStore,
  useCurrentChatStore,
  useItemsLocationStore,
  useSchoolCodeStore,
  useSchoolNameStore,
  useTopicStore,
  useTotalUnreadMessagesStore,
  useUserNameStore,
} from "@/store/store";
import {
  collection,
  doc,
  getDoc,
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
  const setHasBankDetails = useBankDetailsStore(
    (state) => state.setHasBankDetails
  );
  const setBsbNumber = useBankDetailsStore((state) => state.setBsbNumber);
  const setAccountNumber = useBankDetailsStore(
    (state) => state.setAccountNumber
  );
  const setAccountName = useBankDetailsStore((state) => state.setAccountName);
  const setTotalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.setTotalUnreadMessages
  );
  const setItemsLocation = useItemsLocationStore(
    (state) => state.setItemsLocation
  );
  const itemsLocation = useItemsLocationStore((state) => state.itemsLocation);
  const setAudienceSelected = useAudienceSelectedStore(
    (state) => state.setAudienceSelected
  );
  const audienceSelected = useAudienceSelectedStore(
    (state) => state.audienceSelected
  );
  const setTopic = useTopicStore((state) => state.setTopic);
  const topic = useTopicStore((state) => state.topic);
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
          setHasBankDetails(docSnapShot.data().hasBankDetails);
          setBsbNumber(docSnapShot.data().bankDetails?.bsbNumber);
          setAccountNumber(docSnapShot.data().bankDetails?.accountNumber);
          setAccountName(docSnapShot.data().bankDetails?.accountName);
          setItemsLocation(itemsLocation || "Public");
          setTopic(topic || "All topics");
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
