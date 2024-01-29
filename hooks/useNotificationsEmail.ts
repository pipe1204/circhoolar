import {
  useIsUnreadNotificationsEmailSentStore,
  useTotalUnreadMessagesStore,
  useUnreadNotificationsStore,
} from "../store/store";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const useNotificationsEmail = () => {
  const { data: session } = useSession();
  const unreadNotifications = useUnreadNotificationsStore(
    (state) => state.unreadNotifications
  );

  const isUnreadNotificationsEmailSent = useIsUnreadNotificationsEmailSentStore(
    (state) => state.isUnreadNotificationsEmailSent
  );
  const setIsUnreadNotificationsEmailSent =
    useIsUnreadNotificationsEmailSentStore(
      (state) => state.setIsUnreadNotificationsEmailSent
    );

  const emailTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log(
      "start the useEffect",
      unreadNotifications,
      isUnreadNotificationsEmailSent
    );
    const sendEmail = async () => {
      const requestBody = JSON.stringify({
        email: session?.user?.email,
        name: session?.user?.name,
      });

      const response = await fetch("/api/emailNotifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.status === 200) {
        console.log("Email sent");
      }
    };

    if (unreadNotifications && !isUnreadNotificationsEmailSent) {
      // Start or restart the timer
      if (emailTimerRef.current !== null) {
        clearTimeout(emailTimerRef.current);
      }
      console.log(
        "Calling timeout to send email",
        unreadNotifications,
        isUnreadNotificationsEmailSent
      );
      emailTimerRef.current = setTimeout(() => {
        sendEmail();
        setIsUnreadNotificationsEmailSent(true);
        console.log(
          "Sending email",
          unreadNotifications,
          isUnreadNotificationsEmailSent
        );
      }, 850000);
    }

    if (!unreadNotifications && emailTimerRef.current !== null) {
      clearTimeout(emailTimerRef.current);
      emailTimerRef.current = null;
      setIsUnreadNotificationsEmailSent(false);
      console.log(
        "Notifications checked",
        unreadNotifications,
        isUnreadNotificationsEmailSent
      );
    }

    return () => {
      if (emailTimerRef.current !== null) {
        clearTimeout(emailTimerRef.current);
      }
    };
  }, [unreadNotifications, isUnreadNotificationsEmailSent]);
};

export default useNotificationsEmail;
