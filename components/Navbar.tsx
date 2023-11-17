import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import Image from "next/image";
import { Button } from "@/components/Button";

const Navbar = () => {
  const session = false;
  return (
    <div className="">
      <nav className="w-11/12 max-w-[61.25rem] bg-white rounded-full mx-auto flex justify-between items-center relative py-[5px] px-6 xl:px-8">
        <Image src={"/Logo-dark.png"} alt="Logo" width={130} height={50} />
        <div className="gap-10">
          <Link href={"/"}></Link>
          <ul className="xl:flex hidden text-md font-semibold text-dark-purple gap-7">
            {NavLinks.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="px-2 py-2 hover:bg-lightest-purple rounded-full transition-all"
              >
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flexCenter gap-4">
          {session ? (
            <>
              Photo
              <Link href={"/create-post"}>Create a Post</Link>
            </>
          ) : (
            <div className="w-full">
              <Button
                type="button"
                variant="default"
                className="hidden xl:inline-block"
              >
                Sign in
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="ml-4 hidden xl:inline-block"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
        <div className="flex w-full xl:w-0 xl:hidden justify-end items-end">
          <div className="flex justify-center items-center w-[50px] h-[50px] xl:hidden rounded-full bg-lightest-purple">
            Icon
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
