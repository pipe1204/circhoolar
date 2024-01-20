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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { codeRef } from "@/lib/converters/SchoolCode";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { Icons } from "../Icons";
import { userRef } from "@/lib/converters/User";
import { Button } from "../ui/Button";
import { Notification } from "@/types/Types";

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
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      const inputUserRef = userRef(session.user.id);
      const unsubscribe = onSnapshot(inputUserRef, (doc) => {
        const hasUnreadNotifications = doc
          .data()
          ?.notifications.some((notification) => notification.unread);
        setUnreadNotifications(hasUnreadNotifications || null);
        setNotifications(doc.data()?.notifications || []);
      });
      return () => unsubscribe();
    }
  }, [commentCount, likeCommentCount]);

  console.log(notifications);

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

  const removeNotifications = async () => {
    if (!session?.user?.id) return;
    const inputUserRef = userRef(session.user.id);
    const userDocSnapshot = await getDoc(inputUserRef);
    if (userDocSnapshot.exists()) {
      await updateDoc(inputUserRef, {
        notifications: [],
      });
      setNotifications([]);
      setUnreadNotifications(false);
    }
  };

  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-2 xl:mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <div className="flex gap-x-4 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <div className="w-8 h-8 flex justify-center items-center relative cursor-pointer">
                  {unreadNotifications && (
                    <div className="w-3 h-3 rounded-full bg-red absolute top-0 right-1 pulse-animation"></div>
                  )}
                  <Icons.bell
                    className="text-light-white"
                    size={24}
                    fill="white"
                  />
                </div>
              </SheetTrigger>
              {notifications.length > 0 ? (
                <SheetContent side={"right"} className=" overflow-y-auto">
                  <SheetHeader className="mt-8">
                    <SheetTitle className="text-center text-xl">
                      You have{" "}
                      {notifications.length === 1
                        ? "1 new notification"
                        : `${notifications.length} new notifications`}
                    </SheetTitle>
                    <SheetDescription className="text-center">
                      There is some activity. Please see below
                    </SheetDescription>
                    <ul className="flex flex-col px-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="bg-light-white p-2 xl:p-4 rounded-md my-2"
                        >
                          <li className="text-dark font-medium text-sm">
                            {notification.text}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </SheetHeader>
                  <div className="flex justify-end mb-8">
                    <Button
                      onClick={removeNotifications}
                      className="mt-4 w-full xl:w-1/2"
                    >
                      Clear notifications
                    </Button>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              ) : (
                <SheetContent side={"right"}>
                  <SheetHeader className="mt-8">
                    <SheetTitle className="text-center text-xl">
                      You don't have notifications at this time
                    </SheetTitle>
                    <SheetDescription className="text-center">
                      There is not new activity at this time. Maybe check later.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" className="mt-4">
                        Close
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              )}
            </Sheet>

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
