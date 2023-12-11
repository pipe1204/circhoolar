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
import useWindowSize from "@/hooks/useWindowSize";

type ChatDataProps = {
  author: string;
  avatar: string;
  title: string;
  createdAt: string;
  onDelete?: () => void;
  chatId?: string;
  lastMessage?: string;
  unreadCount?: number;
};

const ChatListRows = ({
  author,
  avatar,
  title,
  createdAt,
  chatId,
  onDelete,
  lastMessage,
  unreadCount = 0,
}: ChatDataProps) => {
  const router = useRouter();
  const { width } = useWindowSize();

  const truncateMessage = (message: string | undefined) => {
    if (typeof width === "undefined" || typeof message === "undefined") {
      return null;
    }
    let maxLength = 50;

    if (width < 768) maxLength = 20;
    else if (width < 1024) maxLength = 40;

    return message.length > maxLength
      ? message?.substring(0, maxLength - 3) + "..."
      : message;
  };

  const truncateTitle = (title: string | undefined) => {
    if (typeof width === "undefined" || typeof title === "undefined") {
      return null;
    }
    let maxLength = 30;

    if (width < 768) maxLength = 10;
    else if (width < 1024) maxLength = 20;

    return title.length > maxLength
      ? title?.substring(0, maxLength - 3) + "..."
      : title;
  };

  console.log(lastMessage);

  return (
    <div className="relative flex justify-between w-full bg-light-white rounded-lg xl:rounded-xl shadow-sm px-2 py-4 xl:p-4 mb-4 mt-4">
      {unreadCount > 0 && (
        <div className="w-5 h-5 bg-red rounded-full flex justify-center items-center absolute top-[-8px]">
          <span className="text-light-white font-semibold text-xs">
            {unreadCount}
          </span>
        </div>
      )}
      <div
        className="w-full flex justify-between cursor-pointer"
        onClick={() => router.push(`/dashboard/messages/${chatId}`)}
      >
        <div className="flex">
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
            <p className="text-xs xl:text-sm text-gray">
              {lastMessage && lastMessage.length > 0
                ? truncateMessage(lastMessage)
                : "Start the conversation..."}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex flex-col items-end mr-4">
            <h1 className="text-gray text-right font-semibold text-sm">
              {truncateTitle(title)}
            </h1>
            <p className="text-gray text-sm">{createdAt}</p>
          </div>
        </div>
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
                This action cannot be undone. This will permanently delete this
                conversation and remove your data from our servers.
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
  );
};

export default ChatListRows;
