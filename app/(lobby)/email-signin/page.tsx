import { type Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SignInForm } from "@/components/user/SignInForm";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  //   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function SignInPage() {
  return (
    <section className="w-full xl:w-1/2 mx-auto flex-start flex-col paddings my-16">
      <Card className="">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-2xl text-light-white">Sign in</CardTitle>
          <CardDescription className=" text-light-white-200">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <Link href={"/api/auth/signin"} className="mx-auto">
            <Button variant={"outline"} size={"lg"}>
              <Icons.google className="h-3 w-3 mr-2" />
              Social Login
            </Button>
          </Link>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs  uppercase">
              <span className="bg-background text-light-white px-2">
                Or continue with your email
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block text-light-white">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href="/email-signup"
              className=" text-light-white underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-sm text-light-white underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
