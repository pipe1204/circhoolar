"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="">
      <nav className="w-11/12 max-w-[61rem] bg-white rounded-[8px] shadow-xl mx-auto flex-col xl:flex-row justify-between items-center relative py-[5px] px-6 xl:px-8">
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
            <Image src={"/Logo-dark.png"} alt="Logo" width={130} height={50} />
          </Link>
          {!session && (
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
          )}

          <div className="flexCenter gap-4">
            {session ? (
              <div className="hidden xl:flex xl:gap-x-8">
                <Link href={"/dashboard"}>
                  <Button
                    variant={"outlineLight"}
                    className="hover:text-light-white"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="w-full">
                <Link href={"/api/auth/signin"}>
                  <Button
                    type="button"
                    variant="default"
                    className="hidden xl:inline-block"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="xl:hidden flex justify-end items-center">
            {session ? (
              <Link href={"/dashboard"}>
                <Button
                  variant={"outlineLight"}
                  className="hover:text-light-white"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
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
            )}
          </div>
        </div>

        <div
          className={`flex flex-col xl:hidden transition-all ease-in-out duration-700 ${
            isMenuOpen ? "max-h-screen py-4" : "max-h-0"
          } overflow-hidden`}
        >
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
          <div className="w-1/2 flex flex-col py-4">
            <Link href={"/api/auth/signin"}>
              <Button
                type="button"
                variant="default"
                className="inline-block w-full mb-2"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
