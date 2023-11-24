"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/Icons";
import SignInForm from "@/components/user/SignInForm";

const Signin = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <Card className="w-9/12 xl:w-1/3 mx-auto my-10">
        <Link
          aria-label="Home"
          href="/"
          className="mx-auto flex justify-center mt-4"
        >
          <Image src="/Logo-light.png" alt="Logo" width={180} height={50} />
        </Link>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-light-white">Sign in</CardTitle>
          <CardDescription className="text-paragraph-color">
            Sign in with Gmail
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant={"outline"}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="text-light-white"
          >
            <Icons.google className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
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
          {/* <SignInForm /> */}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-light-white">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-light-white underline-offset-4 transition-colors hover:text-paragraph-color hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-sm text-light-white underline-offset-4 transition-colors hover:text-paragraph-color hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Signin;
