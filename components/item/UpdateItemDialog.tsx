"use client";

import React, { useEffect, useState } from "react";
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
import { useUserNameStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { postRef } from "@/lib/converters/Post";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Icons } from "../Icons";
import { Post } from "@/types/Types";

type Inputs = z.infer<typeof postItemSchema>;
type Image = z.infer<typeof imageSchema>;

interface UpdateItemDialogProps {
  itemId: string;
}

const UpdateItemDialog = ({ itemId }: UpdateItemDialogProps) => {
  const { data: session } = useSession();
  const userName = useUserNameStore((state) => state.userName);

  const isBrowser = typeof window !== "undefined";
  const [priceType, setPriceType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState(true);
  const [item, setItem] = useState<Post | null>(null);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(postItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "", // Set an initial value for price
    },
  });

  useEffect(() => {
    fetchItemData(itemId);
  }, [itemId]);

  const fetchItemData = async (itemId: string) => {
    if (itemId) {
      try {
        const docRef = doc(postRef, itemId); // Use the postRef with your converter
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem(docSnap.data() as Post);
          setFiles(docSnap.data()?.images);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  const Imageform = useForm<Image>({
    resolver: zodResolver(imageSchema),
  });

  //Clearing inputs when dialog is closed
  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    if (item && session?.user?.id) {
      form.setValue("title", item.title);
      form.setValue("description", item.description);
      form.setValue("condition", item.condition);
      form.setValue("category", item.category);
      form.setValue("sellingmethod", item.sellingmethod);
      form.setValue("price", item.price.toString());
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    fetchItemData(itemId);
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

  //Uploading files to CLoudinary and Firebase
  async function onSubmit(data: Inputs) {
    setLoading(true);

    if (
      data.title === item?.title &&
      data.description === item?.description &&
      data.condition === item?.condition &&
      data.category === item?.category &&
      data.sellingmethod === item?.sellingmethod &&
      data.price === item?.price.toString() &&
      files.length === 0
    ) {
      setLoading(false);
      setIsOpen(false);
      return;
    } else {
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

          // Upload the post to Firestore
          const docRef = doc(postRef, itemId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            await updateDoc(docRef, {
              title: data.title,
              description: data.description,
              condition: data.condition,
              category: data.category,
              sellingmethod: data.sellingmethod,
              price: data.price,
              images: uploadedImageUrls,
              updatedAt: serverTimestamp(),
            });
            setLoading(false);
            setIsOpen(false);
            fetchItemData(itemId);
          }
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } else {
        const docRef = doc(postRef, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, {
            title: data.title,
            description: data.description,
            condition: data.condition,
            category: data.category,
            sellingmethod: data.sellingmethod,
            price: data.price,
            updatedAt: serverTimestamp(),
          });
          setLoading(false);
          setIsOpen(false);
          fetchItemData(itemId);
        }
        setLoading(false);
        setError("Please upload an image");
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="link" className="w-full text-dark-purple">
          <Icons.edit size={15} className="mr-2" />
          Edit post
        </Button>
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
                  <div key={index}>
                    <p className=" text-paragraph-color text-sm font-semibold overflow-auto">
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
                  >
                    {loading ? "Uploading..." : "Update details"}
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

export default UpdateItemDialog;
