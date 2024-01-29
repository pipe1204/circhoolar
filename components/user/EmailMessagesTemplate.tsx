import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export const EmailMessagesTemplate = ({ name }: EmailTemplateProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>Hi, {name}! 👋🏼</h4>
    <p>
      Great news! You've sparked some interest in the Circhoolar community. 🚀
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      There are unread messages waiting for you. They might be inquiries about
      your items or potential offers!
    </p>
    <p style={{ fontSize: "16px", lineHeight: "1.5", marginTop: "20px" }}>
      Don't keep them waiting! Check your messages now and connect with other
      Circhoolar users.
    </p>
    <a
      href="https://www.circhoolar.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to Messages
    </a>
    <p>Regards,</p>
    <p>The Circhoolar Team</p>
  </div>
);
