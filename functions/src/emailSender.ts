import { emailMessagesTemplate } from "./../../lib/emailMessageTemplate";

import { Resend } from "resend"; // Ensure Resend is available in Cloud Functions

export const sendEmailForUnreadMessages = async (
  email: string,
  name: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const response = await resend.emails.send({
    from: "Circhoolar <info@circhoolar.com>",
    to: [email],
    subject: "💌 You've Got New Messages on Circhoolar!",
    // Assuming EmailMessagesTemplate is a React component that returns HTML
    react: emailMessagesTemplate(name),
  });

  console.log("Email send status:", response);
};
