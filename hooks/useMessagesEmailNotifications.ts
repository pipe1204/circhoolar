import {
  useIsUnreadMessagesEmailSentStore,
  useTotalUnreadMessagesStore,
} from "../store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

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

  const sendEmail = async () => {
    const requestBody = JSON.stringify({
      email: session?.user?.email,
      name: session?.user?.name,
    });

    const response = await fetch("/api/emailMessageNotification", {
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

  useEffect(() => {
    console.log(
      "start the useEffect",
      totalUnreadMessages,
      isUnreadMessagesEmailSent
    );

    if (
      totalUnreadMessages &&
      totalUnreadMessages > 1 &&
      !isUnreadMessagesEmailSent
    ) {
      console.log(
        "Sending email",
        totalUnreadMessages,
        isUnreadMessagesEmailSent
      );
      sendEmail();
      setIsUnreadMessagesEmailSent(true);
    }

    if (totalUnreadMessages === 0) {
      setIsUnreadMessagesEmailSent(false);
      console.log(
        "Messages checked",
        totalUnreadMessages,
        isUnreadMessagesEmailSent
      );
    }
  }, [totalUnreadMessages, isUnreadMessagesEmailSent]);
};

export default useMessagesEmailNotifications;
