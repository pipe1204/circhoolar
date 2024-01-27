import {
  useIsUnreadMessagesEmailSentStore,
  useTotalUnreadMessagesStore,
} from "../store/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const [emailTimer, setEmailTimer] = useState<NodeJS.Timeout | number | null>(
    null
  );

  useEffect(() => {
    console.log("Start:", totalUnreadMessages, isUnreadMessagesEmailSent);
    const sendEmail = async () => {
      const requestBody = JSON.stringify({
        email: session?.user?.email,
        name: session?.user?.name,
      });

      console.log("Sending Request:", requestBody);
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
      if (emailTimer !== null) {
        clearTimeout(emailTimer as NodeJS.Timeout);
      }
      console.log(
        "Calling the send email:",
        totalUnreadMessages,
        isUnreadMessagesEmailSent
      );
      setEmailTimer(
        setTimeout(() => {
          sendEmail();
          console.log(
            "Just sent the email:",
            totalUnreadMessages,
            isUnreadMessagesEmailSent
          );
          setIsUnreadMessagesEmailSent(true);
        }, 300000)
      );
    }

    if (totalUnreadMessages && totalUnreadMessages === 0) {
      console.log(
        "Setting back to 0:",
        totalUnreadMessages,
        isUnreadMessagesEmailSent
      );
      setIsUnreadMessagesEmailSent(false);
    }

    return () => {
      if (emailTimer !== null) {
        clearTimeout(emailTimer as NodeJS.Timeout);
      }
    };
  }, [totalUnreadMessages]);
};

export default useMessagesEmailNotifications;
