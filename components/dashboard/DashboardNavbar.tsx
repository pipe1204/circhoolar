"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import UserButton from "../ui/UserButton";
import { useSession } from "next-auth/react";
import {
  useCommentCountStore,
  useLikeCommentCountStore,
  useSchoolCodeStore,
  useUnreadNotificationsStore,
} from "@/store/store";
import { codeRef } from "@/lib/converters/SchoolCode";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { Icons } from "../Icons";
import { userRef } from "@/lib/converters/User";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const unreadNotifications = useUnreadNotificationsStore(
    (state) => state.unreadNotifications
  );
  const setUnreadNotifications = useUnreadNotificationsStore(
    (state) => state.setUnreadNotifications
  );
  const commentCount = useCommentCountStore((state) => state.commentCount);
  const likeCommentCount = useLikeCommentCountStore(
    (state) => state.likeCommentCount
  );

  const [schoolName, setSchoolName] = React.useState("");

  useEffect(() => {
    if (session?.user?.id) {
      const inputUserRef = userRef(session.user.id);
      const unsubscribe = onSnapshot(inputUserRef, (doc) => {
        const hasUnreadNotifications = doc
          .data()
          ?.notifications.some((notification) => notification.unread);
        setUnreadNotifications(hasUnreadNotifications || null);
      });
      return () => unsubscribe();
    }
  }, [commentCount, likeCommentCount]);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      const docRef = doc(codeRef, schoolCode as string);
      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setSchoolName(docSnapshot.data().name);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (schoolCode) {
      fetchData(); // Call the async function
    }
  }, [schoolCode]);

  console.log(unreadNotifications);

  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-2 xl:mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <div className="flex gap-x-4 items-center">
            <div className="w-8 h-8 flex justify-center items-center relative cursor-pointer">
              {unreadNotifications && (
                <div className="w-3 h-3 rounded-full bg-red absolute top-0 right-1 pulse-animation"></div>
              )}
              <Icons.bell className="text-light-white" size={24} fill="white" />
            </div>
            <h1 className="text-light-white text-xs xl:text-lg font-semibold">
              {schoolName}
            </h1>
            <UserButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
