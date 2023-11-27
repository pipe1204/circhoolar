"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { authSchoolCodeSchema } from "@/lib/validations/auth";
import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/Input";
import { Icons } from "./Icons";

type Inputs = z.infer<typeof authSchoolCodeSchema>;

export function SchoolCodeForm({
  checkCode,
  errorMessage,
}: {
  checkCode: (code: string) => void;
  errorMessage: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchoolCodeSchema),
    defaultValues: {
      schoolCode: "",
    },
  });

  async function onSubmit(data: Inputs) {
    checkCode(data.schoolCode);
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="schoolCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray text-sx">School Code</FormLabel>
              <FormControl>
                <Input placeholder="ABCD1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-red text-center text-sm">{errorMessage}</p>
        )}
        <Button
          disabled={isPending}
          variant={"outline"}
          className="text-light-white"
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
