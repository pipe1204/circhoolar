import { type Metadata } from "next";
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
import AuthProviders from "@/components/AuthProviders";

export const metadata: Metadata = {
  //   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
};

const Signup = () => {
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <Card className="w-11/12 xl:w-1/3 mx-auto mt-40">
        <Link
          aria-label="Home"
          href="/"
          className="mx-auto flex justify-center mt-4"
        >
          <Image src="/Logo-light.png" alt="Logo" width={180} height={50} />
        </Link>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-light-white">Sign up</CardTitle>
          <CardDescription className="text-paragraph-color">
            Sign up with Gmail
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AuthProviders />
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
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-light-white">
            <span className="mr-1 hidden sm:inline-block">
              Already have an account?
            </span>
            <Link
              aria-label="Sign in"
              href="/signin"
              className="text-light-white underline-offset-4 transition-colors hover:text-paragraph-color hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Signup;
