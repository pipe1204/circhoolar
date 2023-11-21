import Image from "next/image";
import React from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";

const DashboardNavbar = () => {
  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <Button variant={"outlineLight"} className="hover:text-light-white">
            Create a post
          </Button>
          <div className="hidden xl:flex gap-x-8 items-center">
            <Icons.bell className="text-light-white" size={20} />
            <div className="w-9 h-9 mr-2 rounded-full overflow-hidden relative cursor-pointer">
              <Image
                src={"/person6.jpg"}
                alt="avatar"
                width={100}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
