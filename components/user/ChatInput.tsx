"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useUserData } from "@/hooks/useUserData";
import { useSubmitChatMessage } from "@/hooks/useSubmitChatMessage";
import { Icons } from "../Icons";
import { useForm } from "react-hook-form";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const isBrowser = typeof window !== "undefined";
  const [messageImage, setMessageImage] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [fileObject, setFileObject] = useState<File>();

  const inputUser = useUserData();
  const { form, onSubmit } = useSubmitChatMessage(
    chatId,
    session,
    inputUser,
    fileObject
  );

  const { register, handleSubmit } = useForm();

  function resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    callback: (resizedImage: File) => void
  ) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Unable to get canvas context");
        }

        const desiredMaxWidth = 1200;
        const desiredMaxHeight = 1200;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > desiredMaxWidth) {
            height *= desiredMaxWidth / width;
            width = desiredMaxWidth;
          }
        } else {
          if (height > desiredMaxHeight) {
            width *= desiredMaxHeight / height;
            height = desiredMaxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              throw new Error("Unable to get canvas blob");
            }

            const resizedImage = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            callback(resizedImage);
          },
          "image/jpeg",
          0.98
        );
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        throw new Error("FileReader did not load the file correctly");
      }
    };
    reader.readAsDataURL(file);
  }

  const onImageSubmit = async (data: any) => {
    if (isBrowser && data.image.length > 0) {
      const image = data.image[0];

      resizeImage(image, 800, 600, async (resizedImage: File) => {
        setMessageImage(resizedImage.name);
        setFileObject(resizedImage);

        const fileInput = document.getElementById(
          "file_input"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      });
    }
  };

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          className="w-full flex items-center space-x-4 p-2 rounded-xl max-w-4xl mx-auto bg-light-white border border-light-white-500"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Start the conversation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="cursor-pointer"
            onClick={() => document.getElementById("file_input")?.click()}
          >
            <Icons.paperclip size={20} />
            <input
              type="file"
              id="file_input"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  onImageSubmit({ image: files });
                }
              }}
            />
          </div>
          <Button variant={"default"} className="text-light-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
