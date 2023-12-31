import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type UserAvatarProps = {
  name: string | null;
  image: string | null;
  className?: string;
};

const UserAvatar = ({ name, image, className }: UserAvatarProps) => {
  return (
    <Avatar
      className={cn("bg-light-white text-dark-purple relative", className)}
    >
      {image ? (
        <Image
          src={image || "/Logo-light.png"}
          alt={name || "Logo"}
          width={40}
          height={40}
          referrerPolicy="no-referrer"
          className="rounded-full border border-dark-purple object-cover"
        />
      ) : (
        <AvatarFallback className="bg-light-white text-dark-purple border border-gray-50 text-lg">
          {name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
