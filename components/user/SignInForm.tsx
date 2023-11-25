"use client";

import React from "react";
import { CardContent } from "../ui/Card";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import { signIn } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
  type: string;
}

interface SignInFormProps {
  providers: Record<string, Provider>;
  csrfToken: string;
}

const SignInForm = ({ providers, csrfToken }: SignInFormProps) => {
  return (
    <CardContent className="grid gap-4">
      {Object.values(providers).map((provider) => {
        if (provider.name === "Email") {
          return null;
        }
        return (
          <div key={provider.name}>
            <Button
              variant={"outline"}
              onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
              className="text-light-white"
            >
              <Icons.google className="w-4 h-4 mr-2" />
              Continue with {provider.name}
            </Button>
          </div>
        );
      })}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-paragraph-color" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-paragraph-color">
            Or continue with your personal email
          </span>
        </div>
      </div>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="email" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
    </CardContent>
  );
};

export default SignInForm;
