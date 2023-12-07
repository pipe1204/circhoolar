import Image from "next/image";
import React from "react";
import { Icons } from "../Icons";
import { useRouter } from "next/navigation";
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

type ChatDataProps = {
  author: string;
  avatar: string;
  title: string;
  createdAt: string;
  onDelete?: () => void;
  chatId?: string;
};

const ChatListRows = ({
  author,
  avatar,
  title,
  createdAt,
  chatId,
  onDelete,
}: ChatDataProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full bg-light-white rounded-lg xl:rounded-xl shadow-sm p-2 xl:p-4 mb-4">
      <div
        className="flex cursor-pointer"
        onClick={() => router.push(`/dashboard/messages/${chatId}`)}
      >
        <div className="relative w-10 h-10 xl:h-12 xl:w-12 rounded-full mr-2 xl:mr-4 overflow-hidden">
          <Image
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-dark-purple font-semibold text-sm xl:text-md">
            {author}
          </h1>
          <p className="text-xs xl:text-sm text-gray">Message</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex flex-col mr-4">
          <h1 className="text-gray font-semibold text-sm">{title}</h1>
          <p className="text-gray text-sm">{createdAt}</p>
        </div>
        <div className="flex justify-center items-center rounded-full w-5 h-5 border border-red">
          <AlertDialog>
            <AlertDialogTrigger className="text-red flex justify-center items-center text-sm">
              <Icons.close className="text-red cursor-pointer" size={15} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-light-white">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this conversation and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-red text-light-white"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ChatListRows;
