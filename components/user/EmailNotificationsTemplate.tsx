import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export const EmailNotificationsTemplate = ({ name }: EmailTemplateProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>Hello, {name}! 😊</h4>
    <p>Your posts are creating a buzz in the Circhoolar community! 🎉</p>
    <p>
      You have new notifications on your posts. It's the perfect time to engage
      with your fellow Circhoolarians.
    </p>
    <p>Dive back into the conversation and see what others are saying.</p>
    <a
      href="https://www.circhoolar.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Notifications
    </a>
    <p>Regards,</p>
    <p>The Circhoolar Team</p>
  </div>
);
