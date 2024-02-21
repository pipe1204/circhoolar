import * as React from "react";

interface NewUserSignUpEmailProps {
  email: string;
  name: string;
  code: string;
}

export const NewUserSignUpEmailTemplate = ({
  email,
  name,
  code,
}: NewUserSignUpEmailProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>New User sign up</h4>
    <p>User Email: {email}</p>
    <p>User Name: {name}</p>
    <p>Educational Centre Code: {code}</p>
  </div>
);
