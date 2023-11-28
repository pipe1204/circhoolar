"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { postItemSchema } from "@/lib/validations/auth";
import { Icons } from "../Icons";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

type Inputs = z.infer<typeof postItemSchema>;

const PostItemDialog = () => {
  const [isPending, startTransition] = React.useTransition();
  const [errorCode, setErrorCode] = React.useState("");
  const [priceType, setPriceType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(postItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "", // Set an initial value for price
      images: "",
    },
  });

  const handlePriceTypeChange = (value: string) => {
    setPriceType(value);
    if (value === "Free") {
      form.setValue("price", "0"); // Set a default value for price when "Free" is selected
    }
  };

  async function onSubmit(data: Inputs) {
    console.log(data);
    setIsOpen(false);

    form.reset({
      title: "",
      description: "",
      price: "",
      sellingmethod: "Free",
      condition: "Great condition",
      category: "",
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Post an item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-light-white text-center">
            Create a new post
          </DialogTitle>
          <DialogDescription className="text-light-white text-center">
            Donate or sell a new item on to the community
          </DialogDescription>
        </DialogHeader>
        <div className=" max-h-96 overflow-y-auto">
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">
                      Upload images (If more than one image, Select all images
                      at once)
                    </label>
                    <FormControl>
                      <Input id="picture" type="file" {...field} multiple />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">Title</label>
                    <FormControl>
                      <Input placeholder="Brown shoes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">
                      Description (Optional)
                    </label>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about the item"
                        className="resize-none text-light-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-light-white">
                      Item condition
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Great condition"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Great condition
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Good condition"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Good condition
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Fair condition"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Fair condition
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-light-white">
                      Item category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-light-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="toddler">
                          Infant & Toddler
                        </SelectItem>
                        <SelectItem value="school">School supplies</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellingmethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-light-white">Price</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handlePriceTypeChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Free"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Free
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Cost"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Cost
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    {priceType === "Cost" && (
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <label className="text-light-white text-sx">
                              Price
                            </label>
                            <FormControl>
                              <Input placeholder="$10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
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
                  Post
                  <span className="sr-only">Sign in</span>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostItemDialog;
