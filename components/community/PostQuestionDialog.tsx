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
import { postQuestionSchema, imageSchema } from "@/lib/validations/auth";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import {
  useSchoolCodeStore,
  useSchoolNameStore,
  useUserNameStore,
} from "@/store/store";
import { useSession } from "next-auth/react";
import { questionRef } from "@/lib/converters/Questions";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Icons } from "../Icons";
import { topics } from "@/constants";

type Inputs = z.infer<typeof postQuestionSchema>;
type Image = z.infer<typeof imageSchema>;

const PostQuestionDialog = () => {
  const { data: session } = useSession();
  const userName = useUserNameStore((state) => state.userName);
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const schoolName = useSchoolNameStore((state) => state.schoolName);

  const isBrowser = typeof window !== "undefined";
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [error, setError] = useState("");
  const [imageUpload, setImageUpload] = useState("No image");

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(postQuestionSchema),
    defaultValues: {
      title: "",
      description: "",
      uploadImage: "No image",
      link: "",
      topic: "",
      audience: "Private",
      identity: "Real name",
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
    form.reset();
    Imageform.reset();
    setFiles([]);

    // Reset file input
    const fileInput = document.getElementById("file_input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleUploadImageToggle = (value: string) => {
    setImageUpload(value);
    if (value === "Upload image") {
      setImageSelected(true);
    } else {
      setImageSelected(false);
    }
  };

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

    const newFileObjects = [...fileObjects];
    newFileObjects.splice(index, 1);
    setFileObjects(newFileObjects);
  };

  //Uploading files to CLoudinary and Firebase
  async function onSubmit(data: Inputs) {
    setLoading(true);
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
      const randomNumber = Math.floor(Math.random() * 10000);
      const question = {
        id: `${data.title}-${randomNumber}`,
        title: data.title,
        description: data.description,
        topic: data.topic,
        audience: data.audience,
        identity: data.identity,
        link: data.link ?? "",
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : [],
        authorId: session?.user?.id ?? "Unknown",
        author: session?.user?.name ?? userName ?? "Unknown",
        avatar:
          session?.user?.image ??
          "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
        schoolCode: schoolCode || "Unknown",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        schoolName: schoolName,
        numberOfComments: 0,
        comments: [] as string[],
        numberOfLikes: 0,
        likedBy: [] as string[],
        commentedBy: [] as string[],
      };
      try {
        const docRef = await addDoc(questionRef, question);
        console.log("Question created successfully with ID:", docRef.id);
      } catch (error) {
        console.error("Error creating post:", error);
      }
      setLoading(false);
      setIsOpen(false);
      setFiles([]);
      setFileObjects([]);
      form.reset({
        title: "",
        description: "",
        link: "",
        topic: "",
        audience: "Private",
        identity: "Real name",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask</Button>
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
            Ask the community
          </DialogTitle>
          <DialogDescription className="text-light-white text-center">
            Let other parents help you with any questions or concerns you might
            have
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[450px] xl:max-h-[500px] overflow-y-auto">
          {imageUpload === "Upload image" && (
            <div>
              <form
                className="grid gap-4 mb-4"
                onSubmit={handleSubmit(onImageSubmit)}
              >
                <label className="text-light-white text-sx">
                  Image (Optional)
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
            </div>
          )}
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="uploadImage"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-light-white">
                      Upload an image (Optional)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleUploadImageToggle(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="No image"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            No image
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Upload image"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Upload image
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">Title</label>
                    <FormControl>
                      <Input
                        placeholder="How can I improve my toddler's language s
                        kills?"
                        {...field}
                      />
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
                      Text (Optional)
                    </label>
                    <FormControl>
                      <Textarea
                        placeholder="I am looking for tips and activities to boost my 2-year-old language development. What has worked for you and your child?"
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
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-light-white text-sx">
                      Add a link (Optional)
                    </label>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-light-white">Topics</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-light-white">
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {topics.map((topic) => {
                          return (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-light-white">
                      Select an Audience for your question
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
                              value="Private"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Private
                          </FormLabel>
                          <p className="text-xs text-light-white">
                            (Post only on your school community)
                          </p>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Public"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Public
                          </FormLabel>
                          <p className="text-xs text-light-white">
                            (Post on other school communities too)
                          </p>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-light-white">
                      Post this question as:
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
                              value="Real name"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Myself
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="Anonymous"
                              className="border border-light-white text-light-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-light-white">
                            Anonymous
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
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
                    {loading ? "Uploading..." : "Ask"}
                  </Button>
                  {error && (
                    <p className="text-red text-sm mt-2 text-center">{error}</p>
                  )}
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

export default PostQuestionDialog;
