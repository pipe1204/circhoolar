import * as React from "react";

interface EmailTemplateProps {
  email: string;
  name: string;
  provider: string;
  text: string;
}

export const EducationalProviderContactEmailTemplate = ({
  email,
  name,
  provider,
  text,
}: EmailTemplateProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>New Educational centre contact form</h4>
    <p>From: {email}</p>
    <p>Name: {name}</p>
    <p>Educational Centre Name: {provider}</p>
    <p>Message: {text}</p>
  </div>
);
