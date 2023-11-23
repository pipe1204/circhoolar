"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const pathname = usePathname();
  return (
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
  );
};

export default NavbarLinks;
