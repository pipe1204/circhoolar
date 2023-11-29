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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { postItemSchema, imageSchema } from "@/lib/validations/auth";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner";

type Inputs = z.infer<typeof postItemSchema>;
type Image = z.infer<typeof imageSchema>;

const PostItemDialog = () => {
  const isBrowser = typeof window !== "undefined";
  const [errorCode, setErrorCode] = React.useState("");
  const [priceType, setPriceType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(postItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "", // Set an initial value for price
    },
  });

  const Imageform = useForm<Image>({
    resolver: zodResolver(imageSchema),
  });

  //Clearing inputs when dialog is closed
  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    if (!isOpen) {
      // Reset form fields
      form.reset();
      Imageform.reset();

      // Clear the file names and images state
      setFiles([]);
      setImages([]);
      setPriceType("Free");

      // Reset file input
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const handlePriceTypeChange = (value: string) => {
    setPriceType(value);
    if (value === "Free") {
      form.setValue("price", "0"); // Set a default value for price when "Free" is selected
    }
  };

  //Uploading image files to UI for users to see
  const { register, handleSubmit } = useForm();

  const onImageSubmit = async (data: any) => {
    if (isBrowser) {
      const image = data.image[0];
      setFiles([...files, image.name]);
      setFileObjects((currentFiles) => [...currentFiles, image]);

      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  //Uploading files to CLoudinary and Firebase
  async function onSubmit(data: Inputs) {
    setLoading(true);
    console.log(data);

    try {
      const uploadedImageUrls = await Promise.all(
        fileObjects.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "circhoolar");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/circhoo/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        })
      );

      setImages(uploadedImageUrls);
      setLoading(false);

      // Here, `uploadedImageUrls` contains the URLs of all uploaded images.
      // You can proceed with other operations, like updating Firebase.
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setIsOpen(false);
    setPriceType("Free");
    setImages([]);
    setFiles([]);
    setFileObjects([]);
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
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Post an item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-light-white text-center">
            Create a new post
          </DialogTitle>
          <DialogDescription className="text-light-white text-center">
            Donate or sell an item to the community
          </DialogDescription>
        </DialogHeader>
        <div className=" max-h-96 overflow-y-auto">
          <form
            className="grid gap-4 mb-4"
            onSubmit={handleSubmit(onImageSubmit)}
          >
            <label className="text-light-white text-sx">Upload image</label>
            <input
              {...register("image")}
              className="w-full rounded-md border border-light-white text-light-white bg-background py-2 px-3"
              id="file_input"
              type="file"
            />
            <Button
              type="submit"
              variant={"outlineLight"}
              className="text-background hover:text-light-white"
            >
              Upload file
            </Button>
          </form>
          <div className="mb-4">
            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <div key={index}>
                    <p className=" text-paragraph-color text-sm font-semibold">
                      {file}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
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
                <div className="w-full flex flex-col justify-center items-center my-4">
                  <Button
                    variant={"outlineLight"}
                    className="text-light-white bg-background"
                  >
                    {loading ? <LoadingSpinner /> : "Post"}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostItemDialog;
