"use client";

import Image from "next/image";
import React from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";
import UserButton from "../ui/UserButton";
import { useSession } from "next-auth/react";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <Button variant={"outlineLight"} className="hover:text-light-white">
            Create a post
          </Button>
          <div className="hidden xl:flex gap-x-4 items-center">
            <Icons.bell className="text-light-white" size={20} />
            <UserButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
