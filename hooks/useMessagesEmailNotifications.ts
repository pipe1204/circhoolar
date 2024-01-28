import {
  useIsUnreadMessagesEmailSentStore,
  useTotalUnreadMessagesStore,
} from "../store/store";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const useMessagesEmailNotifications = () => {
  const { data: session } = useSession();
  const totalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.totalUnreadMessages
  );

  const isUnreadMessagesEmailSent = useIsUnreadMessagesEmailSentStore(
    (state) => state.isUnreadMessagesEmailSent
  );
  const setIsUnreadMessagesEmailSent = useIsUnreadMessagesEmailSentStore(
    (state) => state.setIsUnreadMessagesEmailSent
  );

  const emailTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sendEmail = async () => {
      const requestBody = JSON.stringify({
        email: session?.user?.email,
        name: session?.user?.name,
      });

      const response = await fetch("/api/emailNotification", {
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

    if (
      totalUnreadMessages &&
      totalUnreadMessages >= 1 &&
      !isUnreadMessagesEmailSent
    ) {
      // Start or restart the timer
      if (emailTimerRef.current !== null) {
        clearTimeout(emailTimerRef.current);
      }
      console.log(
        "Calling the send email:",
        totalUnreadMessages,
        isUnreadMessagesEmailSent
      );
      emailTimerRef.current = setTimeout(() => {
        sendEmail();
        setIsUnreadMessagesEmailSent(true);
      }, 300000);
    }

    if (totalUnreadMessages === 0 && emailTimerRef.current !== null) {
      clearTimeout(emailTimerRef.current);
      emailTimerRef.current = null;
      setIsUnreadMessagesEmailSent(false);
    }

    return () => {
      if (emailTimerRef.current !== null) {
        clearTimeout(emailTimerRef.current);
      }
    };
  }, [totalUnreadMessages, isUnreadMessagesEmailSent]);
};

export default useMessagesEmailNotifications;
