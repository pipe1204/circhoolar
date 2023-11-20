"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const session = false;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="">
      <nav className="w-11/12 max-w-[61rem] bg-white rounded-[8px] shadow-xl mx-auto flex-col xl:flex-row justify-between items-center relative py-[5px] px-6 xl:px-8">
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={"/"} onClick={handleMenuClick}>
            <Image src={"/Logo-dark.png"} alt="Logo" width={130} height={50} />
          </Link>

          <div className="gap-10">
            <ul className="xl:flex hidden text-md font-semibold text-dark-purple gap-7">
              {NavLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className={`px-4 py-2 ${
                    pathname === link.href ? "bg-lightest-purple" : ""
                  } hover:bg-lightest-purple rounded-full transition-colors duration-300 ease-in-out`}
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
                <Link href={"/signin"}>
                  <Button
                    type="button"
                    variant="default"
                    className="hidden xl:inline-block"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button
                    type="button"
                    variant="secondary"
                    className="ml-4 hidden xl:inline-block"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="xl:hidden flex justify-end items-center">
            <button
              onClick={handleMenuClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lightest-purple"
            >
              {isMenuOpen ? (
                <Icons.close className="text-primary-purple" />
              ) : (
                <Icons.menu className="text-primary-purple" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col xl:hidden transition-all ease-in-out duration-700 ${
            isMenuOpen ? "max-h-screen py-4" : "max-h-0"
          } overflow-hidden`}
        >
          {/* Mobile Menu Items */}
          {NavLinks.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="px-4 py-2 text-md font-semibold text-dark-purple hover:bg-lightest-purple rounded-full transition-colors duration-300 ease-in-out"
              onClick={handleMenuClick}
            >
              {link.text}
            </Link>
          ))}
          <div className="w-full flex flex-col py-10">
            <Link href={"/signin"}>
              <Button
                type="button"
                variant="default"
                className="inline-block w-full mb-8"
              >
                Sign in
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button
                type="button"
                variant="secondary"
                className="inline-block w-full"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
