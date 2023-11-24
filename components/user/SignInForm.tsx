"use client";

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
import { authSignInSchema } from "@/lib/validations/auth";

type Inputs = z.infer<typeof authSignInSchema>;

const SignInForm = () => {
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            variant={"outlineLight"}
            type="submit"
            className="hover:text-white w-full text-center"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
