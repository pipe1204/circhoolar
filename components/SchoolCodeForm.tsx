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
import { CardDescription } from "./ui/Card";

type Inputs = z.infer<typeof authSchoolCodeSchema>;

export function SchoolCodeForm({
  checkCode,
  errorMessage,
}: {
  checkCode: (code: string, name: string) => void;
  errorMessage: string;
}) {
  const [loading, setLoading] = React.useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchoolCodeSchema),
    defaultValues: {
      schoolCode: "",
      name: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setLoading(true);
    setTimeout(() => {
      checkCode(data.schoolCode, data.name);
      setLoading(false);
    }, 3000);
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray text-sx">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <CardDescription className="text-center">
          By signing up, you agree to abide by our community guidelines, which
          include respecting all members and educational centres, refraining
          from bullying, and engaging in constructive conversations.
        </CardDescription>
        <Button variant={"outline"} className="text-light-white">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
