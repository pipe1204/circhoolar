import * as React from "react";

interface EmailTemplateProps {
  email: string;
  name: string;
  text: string;
}

export const SupportEmailTemplate = ({
  email,
  name,
  text,
}: EmailTemplateProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>New support email</h4>
    <p>From: {email}</p>
    <p>Name: {name}</p>
    <p>Person being reported: {text}</p>
  </div>
);
