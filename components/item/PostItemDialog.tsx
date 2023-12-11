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
import { useSchoolCodeStore, useUserNameStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { postRef } from "@/lib/converters/Post";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Icons } from "../Icons";

type Inputs = z.infer<typeof postItemSchema>;
type Image = z.infer<typeof imageSchema>;

const PostItemDialog = () => {
  const { data: session } = useSession();
  const userName = useUserNameStore((state) => state.userName);
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);

  const isBrowser = typeof window !== "undefined";
  const [priceType, setPriceType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState(true);

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
      setPriceType("Free");
      setImageSelected(true);

      // Reset file input
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    // Reset form fields
    form.reset();
    Imageform.reset();

    // Clear the file names and images state
    setFiles([]);
    setPriceType("Free");
    setImageSelected(true);

    // Reset file input
    const fileInput = document.getElementById("file_input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
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
      if (data.image.length > 0) {
        const image = data.image[0];
        setFiles([...files, image.name]);
        setFileObjects((currentFiles) => [...currentFiles, image]);

        const fileInput = document.getElementById(
          "file_input"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
        setImageSelected(false);
      }
    }
  };

  const onDeleteFile = (index: number) => () => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setImageSelected(true);
    }
    console.log(files);

    const newFileObjects = [...fileObjects];
    newFileObjects.splice(index, 1);
    setFileObjects(newFileObjects);
  };

  //Uploading files to CLoudinary and Firebase
  async function onSubmit(data: Inputs) {
    setLoading(true);

    if (fileObjects.length > 0) {
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

        // Here, `uploadedImageUrls` contains the URLs of all uploaded images.
        // You can proceed with other operations, like updating Firebase.

        const randomNumber = Math.floor(Math.random() * 10000);
        const post = {
          id: `${data.title}-${randomNumber}`,
          title: data.title,
          description: data.description,
          price: data.sellingmethod === "Free" ? 0 : data.price,
          sellingmethod: data.sellingmethod,
          condition: data.condition,
          category: data.category,
          images:
            uploadedImageUrls.length > 0
              ? uploadedImageUrls
              : [
                  "https://res.cloudinary.com/circhoo/image/upload/v1701302694/Circhoolar-dark_bcrnqm.png",
                ],
          authorId: session?.user?.id ?? "Unknown",
          author: session?.user?.name ?? userName ?? "Unknown",
          avatar: session?.user?.image ?? "https://github.com/shadcn.png",
          schoolCode: schoolCode || "Unknown",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          isSold: false,
        };

        try {
          const docRef = await addDoc(postRef, post);
          console.log("Post created successfully with ID:", docRef.id);
        } catch (error) {
          console.error("Error creating post:", error);
        }
        setLoading(false);
        setIsOpen(false);
        setPriceType("Free");
        setFiles([]);
        setFileObjects([]);
        setImageSelected(true);
        form.reset({
          title: "",
          description: "",
          price: "",
          sellingmethod: "Free",
          condition: "Great condition",
          category: "",
        });
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    } else {
      setLoading(false);
      setError("Please upload an image");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Post an item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <div className="w-full flex xl:hidden justify-end mb-2">
            <Icons.close
              className="text-light-white text-right"
              onClick={handleCloseDialog}
            />
          </div>
          <DialogTitle className="text-light-white text-center">
            Create a new post
          </DialogTitle>
          <DialogDescription className="text-light-white text-center">
            Donate or sell an item to the community
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[450px] xl:max-h-[500px] overflow-y-auto">
          <form
            className="grid gap-4 mb-4"
            onSubmit={handleSubmit(onImageSubmit)}
          >
            <label className="text-light-white text-sx">
              Upload image (Required)
            </label>
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
                  <div key={index} className="flex justify-between">
                    <p className=" text-paragraph-color text-sm font-semibold">
                      {file}
                    </p>
                    <Icons.close
                      className="text-paragraph-color cursor-pointer"
                      onClick={onDeleteFile(index)}
                    />
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
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Toys">Toys</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Infant & Toddler">
                          Infant & Toddler
                        </SelectItem>
                        <SelectItem value="School supplies">
                          School supplies
                        </SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Sporting goods">
                          Sportin goods
                        </SelectItem>
                        <SelectItem value="Home and Garden">
                          Home and Garden
                        </SelectItem>
                        <SelectItem value="Vehicles">Vehicles</SelectItem>
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
                <div className="w-full flex flex-col justify-center items-center my-10">
                  <Button
                    variant={"outline"}
                    className="text-light-white bg-background w-9/12"
                    disabled={imageSelected}
                  >
                    {loading ? "Uploading..." : "Post"}
                  </Button>
                  {imageSelected && (
                    <p className="text-red text-sm mt-2">
                      Please upload an image
                    </p>
                  )}
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
