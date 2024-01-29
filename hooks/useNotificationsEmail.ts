import {
  useIsUnreadNotificationsEmailSentStore,
  useNotificationsStore,
  useUnreadNotificationsStore,
} from "../store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useNotificationsEmail = () => {
  const { data: session } = useSession();
  const notifications = useNotificationsStore((state) => state.notifications);
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

  useEffect(() => {
    console.log(
      "start the useEffect",
      unreadNotifications,
      isUnreadNotificationsEmailSent
    );

    if (
      unreadNotifications &&
      notifications &&
      notifications?.length >= 2 &&
      !isUnreadNotificationsEmailSent
    ) {
      console.log(
        "Sending email",
        unreadNotifications,
        isUnreadNotificationsEmailSent
      );
      sendEmail();
      setIsUnreadNotificationsEmailSent(true);
    }

    if (!unreadNotifications) {
      setIsUnreadNotificationsEmailSent(false);
      console.log(
        "Notifications checked",
        unreadNotifications,
        isUnreadNotificationsEmailSent
      );
    }
  }, [unreadNotifications, notifications, isUnreadNotificationsEmailSent]);
};

export default useNotificationsEmail;
