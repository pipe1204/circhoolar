import { Comment } from "@/types/Types";
import { useSession } from "next-auth/react";

const useSendReportAbuseEmail = () => {
  const { data: session } = useSession();
  const sendReportAbuseEmail = async (comment: Comment, behaviour: string) => {
    const requestBody = JSON.stringify({
      abuserName: comment.author,
      abuserEmail: comment.authorEmail,
      abuserUserId: comment.commentId,
      comment: comment.text,
      reporterEmail: session?.user?.email,
      reporterName: session?.user?.name,
      behaviour: behaviour,
    });

    const response = await fetch("/api/report-abuse", {
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

  return sendReportAbuseEmail;
};

export default useSendReportAbuseEmail;
