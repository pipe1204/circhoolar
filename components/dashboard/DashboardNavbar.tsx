"use client";

import Image from "next/image";
import React from "react";
import UserButton from "../ui/UserButton";
import { useSession } from "next-auth/react";

const DashboardNavbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <div className="flex gap-x-4 items-center">
            <UserButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
