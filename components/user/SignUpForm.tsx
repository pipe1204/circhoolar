"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { authSignUpSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "@/components/ui/Input";
import { Icons } from "@/components/Icons";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "../ui/PasswordInput";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type Inputs = z.infer<typeof authSignUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (error) setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        if (userCredential?.user.uid !== undefined) {
          const userId = userCredential?.user.uid;
          const userEmail = userCredential?.user.email || "";

          const userDocRef = doc(db, "users", userId);
          setDoc(userDocRef, {
            id: userId,
            email: userEmail,
            name: "",
            image: "",
            schoolCode: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            posts: [],
            hasBankDetails: false,
            bankDetails: {
              bsbNumber: "",
              accountNumber: "",
              accountName: "",
            },
            likedQuestions: [],
            likedComments: [],
          })
            .then(() => {
              console.log("User document created successfully");
            })
            .catch((error) => {
              console.error("Error creating user document:", error);
              setError("Failed to create user profile. Please try again.");
            });
        }
      })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast({
            title: "We can't sign you up right now.",
            description:
              "The email used to sign up is already in use. Please try again with a different email address.",
            duration: 5000,
          });
          setError(""); // Clear any existing errors
        } else {
          // Handle other errors
          console.error("Error signing up:", error);
          setError("An error occurred during sign up. Please try again.");
        }
      });

    if (userError?.code === "auth/email-already-in-use") {
      toast({
        title: "We can't sign you up right now.",
        description:
          "The email used to sign up is already in use. Please try again with a different email address.",
        duration: 5000,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 w-full xl:w-2/3 mx-auto"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-white">Email</FormLabel>
              <FormControl>
                <Input placeholder="jhon-doe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-white">Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-white">
                Confirm Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading}>
          {loading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign up
          <span className="sr-only">Sign up</span>
        </Button>
        {error && <p className="text-red font-normal text-center">{error}</p>}
      </form>
    </Form>
  );
}
