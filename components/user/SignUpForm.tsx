"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PasswordInput } from "../Password-input";
import { authSignUpSchema } from "@/lib/validations/auth";
import { Icons } from "../Icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof authSignUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await signup(data.email, data.password);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        console.log("Error trying to sign up", error);
      }
    });
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-white">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jhon Doe"
                  {...field}
                  className="text-light-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-white">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="jhondoe@gmail.com"
                  {...field}
                  className="text-light-white"
                />
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
                <PasswordInput
                  placeholder="**********"
                  {...field}
                  className="text-light-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            disabled={isPending}
            variant={"outlineLight"}
            type="submit"
            className="hover:text-white w-full text-center"
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
