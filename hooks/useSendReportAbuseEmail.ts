import { Comment } from "@/types/Types";
import { useToast } from "../components/ui/use-toast";
import { useSession } from "next-auth/react";

const useSendReportAbuseEmail = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
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
      toast({
        title: "We got your message!",
        description:
          "Thank you for keeping an eye in the community and for caring about the safety of others.",
        duration: 3000,
      });
    }
  };

  return sendReportAbuseEmail;
};

export default useSendReportAbuseEmail;
