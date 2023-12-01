"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import { profileSchema } from "@/lib/validations/auth";
import {
  useSchoolCodeStore,
  useSchoolNameStore,
  useUserNameStore,
} from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof profileSchema>;

const page = () => {
  const { data: session } = useSession();
  const profileIamge = useUserNameStore((state) => state.profileImage);
  const setProfileImage = useUserNameStore((state) => state.setProfileImage);
  const userName = useUserNameStore((state) => state.userName) || "";
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode) || "";
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);
  const isBrowser = typeof window !== "undefined";

  const { register, handleSubmit } = useForm();

  const [files, setFiles] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [imageSelected, setImageSelected] = useState(true);
  const [editProfile, setEditProfile] = useState(true);
  const [hideEditProfile, setHideEditProfile] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userName,
      email: session?.user?.email || "",
      schoolCode: schoolCode,
    },
  });

  useEffect(() => {
    if (userName) {
      form.setValue("name", userName);
      form.setValue("email", session?.user?.email || "");
      form.setValue("schoolCode", schoolCode);
    }
  }, [userName, form]);

  const onImageUpload = async (data: any) => {
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

  //Delete files
  const onDeleteFile = () => {
    setFiles([]);
    setFileObjects([]);
    setImageSelected(true);
  };

  //Uploading files to CLoudinary and Firebase
  async function onImageSubmit() {
    if (fileObjects.length > 0) {
      setIsLoading(true);
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

        //Updating Firebase.
        const userDocRef = userRef(session?.user?.id || "");
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          await updateDoc(userDocRef, { image: uploadedImageUrls[0] });
          setProfileImage(uploadedImageUrls[0]);
        } else {
          console.log("No such document!");
        }

        setFiles([]);
        setFileObjects([]);
        setImageSelected(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  }

  const handleEditProfile = () => {
    setEditProfile(false);
    setHideEditProfile(true);
  };

  const handleCancelEditProfile = () => {
    setEditProfile(true);
    setHideEditProfile(false);
    setError("");
  };

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    const userDocRef = userRef(session?.user?.id || "");

    // Check if the school code exists in the 'schools' collection
    const schoolDocRef = codeRef(data.schoolCode);
    const schoolDocSnapshot = await getDoc(schoolDocRef);

    if (schoolDocSnapshot.exists()) {
      // School code is valid, update user's profile
      await updateDoc(userDocRef, {
        name: data.name,
        schoolCode: data.schoolCode,
      });

      setUserName(data.name);
      setSchoolCode(data.schoolCode);
      setSchoolName(schoolDocSnapshot.data()?.name);
      setEditProfile(true);
      setIsLoading(false);

      console.log("Profile updated successfully");
    } else {
      setError("Invalid school code");
      form.setValue("schoolCode", schoolCode);
      setIsLoading(false);
      console.error("Invalid school code");
    }
  };

  return (
    <section className="bg-light-white w-11/12 xl:w-3/4 mx-auto my-8 p-10 shadow-md rounded-lg flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full overflow-hidden">
          <Image
            src={profileIamge || "https://github.com/shadcn.png"}
            alt={"Profile image"}
            width={150}
            height={150}
          />
        </div>
        <form
          className="grid gap-4 mb-4 w-full xl:w-3/4"
          onSubmit={handleSubmit(onImageUpload)}
        >
          <label className="text-light-white text-sx">
            Upload image (Required)
          </label>
          <input
            {...register("image")}
            className="w-full rounded-md border border-light-white text-light-white bg-gray py-2 px-3"
            id="file_input"
            type="file"
            disabled={!imageSelected}
          />
          {files.length > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-dark-purple text-sm">{files[0]}</p>
              <Icons.close
                className="text-dark-purple cursor-pointer"
                size={15}
                onClick={onDeleteFile}
              />
            </div>
          )}
          <Button
            type="submit"
            variant={"link"}
            className="text-dark-purple hover:text-lbackground"
          >
            Upload file
          </Button>
        </form>
        <Button
          variant={"outlineLight"}
          disabled={imageSelected}
          onClick={onImageSubmit}
          className="hover:text-light-white"
        >
          {isLoading ? "Uploading..." : "Update profile image"}
        </Button>
      </div>
      <div className="w-full xl:w-1/2 mt-8">
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sx text-dark-purple">Email</label>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="shadow-sm bg-light-white-100"
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sx text-dark-purple">Full name</label>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="shadow-sm bg-light-white-100"
                      disabled={editProfile}
                    />
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
                  <label className="text-sx text-dark-purple">
                    School code
                  </label>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="shadow-sm bg-light-white-100"
                      disabled={editProfile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!editProfile && (
              <div className="flex">
                <Button
                  variant={"link"}
                  className="text-dark-purple"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant={"link"}
                  className="text-red"
                  onClick={handleCancelEditProfile}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            )}
            <Button
              variant={"outlineLight"}
              className="hover:text-light-white"
              onClick={handleEditProfile}
              type="button"
              disabled={hideEditProfile}
            >
              {isLoading ? "Loading..." : "Edit profile"}
            </Button>
            {error && <p className="text-red text-center">{error}</p>}
          </form>
        </Form>
      </div>
      <div>{/**Delete account */}</div>
    </section>
  );
};

export default page;
