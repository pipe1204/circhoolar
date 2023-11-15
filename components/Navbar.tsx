import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import Image from "next/image";

const Navbar = () => {
  const session = {};
  return (
    <div className="">
      <nav className="w-11/12 max-w-[61.25rem] bg-white rounded-full mx-auto flex justify-between items-center relative py-[5px] px-4">
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
              UserPhoto
              <Link href={"/create-post"}>Create a post</Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
