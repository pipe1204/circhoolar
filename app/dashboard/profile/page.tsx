"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useDeleteUserAccount from "@/hooks/useDeleteUserAccount";
import useImageUpload from "@/hooks/useImageUpload";
import useProfileEdit from "@/hooks/useProfileEdit";
import { profileSchema } from "@/lib/validations/auth";
import {
  useSchoolCodeStore,
  useSchoolNameStore,
  useUserNameStore,
} from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof profileSchema>;

const page = () => {
  const { data: session } = useSession();
  const profileIamge = useUserNameStore((state) => state.profileImage);
  const userName = useUserNameStore((state) => state.userName) || "";
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode) || "";
  const schoolName = useSchoolNameStore((state) => state.schoolName) || "";

  const { register, handleSubmit } = useForm();
  const {
    files,
    fileObjects,
    isLoading: isImageLoading,
    imageSelected,
    onImageUpload,
    onDeleteFile,
    onImageSubmit,
  } = useImageUpload();
  const {
    editProfile,
    error,
    isLoading: isProfileLoading,
    hideEditProfile,
    handleEditProfile,
    handleCancelEditProfile,
    handleProfileSubmit,
  } = useProfileEdit();
  const { handleDeleteUserAccount } = useDeleteUserAccount();

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userName,
      email: session?.user?.email || "",
      schoolCode: schoolCode,
      schoolName: schoolName,
    },
  });

  useEffect(() => {
    if (userName) {
      form.setValue("name", userName);
      form.setValue("email", session?.user?.email || "");
      form.setValue("schoolCode", schoolCode);
      form.setValue("schoolName", schoolName);
    }
  }, [userName, form, schoolName, schoolCode]);

  return (
    <section className="bg-light-white w-11/12 xl:w-3/4 mx-auto my-8 p-10 shadow-md rounded-lg flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden relative">
          <Image
            src={profileIamge || "https://github.com/shadcn.png"}
            alt={"Profile image"}
            width={150}
            height={150}
            className="absolute inset-0 object-cover w-full h-full"
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
          {isImageLoading ? "Uploading..." : "Update profile image"}
        </Button>
      </div>
      <div className="w-full xl:w-1/2 mt-8">
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={(...args) =>
              void form.handleSubmit(handleProfileSubmit)(...args)
            }
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
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sx text-dark-purple">
                    School name
                  </label>
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
              {isProfileLoading ? "Loading..." : "Edit profile"}
            </Button>
            {error && <p className="text-red text-center">{error}</p>}
          </form>
        </Form>
      </div>
      <div className="mt-8">
        <AlertDialog>
          <AlertDialogTrigger className="text-red flex justify-center items-center text-sm">
            <Icons.trash size={15} className="mr-2" />
            Delete account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-light-white">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                your information and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUserAccount}
                className="bg-red text-light-white"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default page;
