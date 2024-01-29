"use client";

import React, { use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useUserNameStore } from "@/store/store";

const UserButton = ({ session }: { session: Session | null }) => {
  const userName = useUserNameStore((state) => state.userName);
  const profileIamge = useUserNameStore((state) => state.profileImage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session?.user?.name || userName}
          image={profileIamge || session?.user?.image || null}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuLabel>
          {userName ? userName : session?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/dashboard/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            Account settings
          </DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/optout-email"}>
          <DropdownMenuItem className="cursor-pointer">
            Notifications
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
