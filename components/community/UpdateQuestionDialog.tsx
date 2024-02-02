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
import { imageSchema, postQuestionSchema } from "@/lib/validations/auth";
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
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Icons } from "../Icons";
import { Question } from "@/types/Types";
import { questionRef } from "@/lib/converters/Questions";
import { topics } from "@/constants";

type Inputs = z.infer<typeof postQuestionSchema>;
type Image = z.infer<typeof imageSchema>;

interface UpdateItemDialogProps {
  itemId: string;
}

const UpdateQuestionDialog = ({ itemId }: UpdateItemDialogProps) => {
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
  const [question, setQuestion] = useState<Question | null>(null);
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

  useEffect(() => {
    fetchQuestionData(itemId);
  }, [itemId]);

  const fetchQuestionData = async (itemId: string) => {
    if (itemId) {
      try {
        const docRef = doc(questionRef, itemId); // Use the postRef with your converter
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuestion(docSnap.data() as Question);
          setFiles(docSnap.data()?.images);
          if (docSnap.data()?.images.length > 0) {
            setImageUpload("Upload image");
          } else {
            setImageUpload("No image");
          }
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

    if (question && session?.user?.id) {
      form.setValue("title", question.title);
      form.setValue("description", question.description);
      form.setValue("link", question.link);
      form.setValue("topic", question.topic);
      form.setValue("audience", question.audience);
      form.setValue("identity", question.identity);
      form.setValue(
        "uploadImage",
        imageUpload === "Upload image" ? "Upload image" : "No image"
      );
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    fetchQuestionData(itemId);
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
      data.title === question?.title &&
      data.description === question?.description &&
      data.topic === question?.topic &&
      data.link === question?.link &&
      data.audience === question?.audience &&
      data.identity === question?.identity.toString() &&
      files.length === 0
    ) {
      setLoading(false);
      setIsOpen(false);
      return;
    } else if (files.length > 0 && imageUpload === "No image") {
      const docRef = doc(questionRef, itemId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          title: data.title,
          description: data.description,
          link: data.link,
          topic: data.topic,
          audience: data.audience,
          identity: data.identity,
          updatedAt: serverTimestamp(),
          images: [],
        });
        setLoading(false);
        setIsOpen(false);
      }
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
          const docRef = doc(questionRef, itemId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            await updateDoc(docRef, {
              title: data.title,
              description: data.description,
              link: data.link,
              topic: data.topic,
              audience: data.audience,
              identity: data.identity,
              images: uploadedImageUrls,
              updatedAt: serverTimestamp(),
            });
            setLoading(false);
            setIsOpen(false);
            fetchQuestionData(itemId);
          }
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } else {
        const docRef = doc(questionRef, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, {
            title: data.title,
            description: data.description,
            link: data.link,
            topic: data.topic,
            audience: data.audience,
            identity: data.identity,
            updatedAt: serverTimestamp(),
          });
          setLoading(false);
          setIsOpen(false);
          fetchQuestionData(itemId);
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
          Edit
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
          {imageUpload === "Upload image" && (
            <div>
              <form
                className="grid gap-4 mb-4"
                onSubmit={handleSubmit(onImageSubmit)}
              >
                <label className="text-light-white text-sx">
                  Upload image (Optional)
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
                            (Post on other communities too)
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

export default UpdateQuestionDialog;
