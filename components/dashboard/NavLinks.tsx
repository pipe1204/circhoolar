"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const SidebarLinks = [
  {
    title: "DISCOVER",
    links: [
      { name: "Discover", href: "/dashboard", icon: <Icons.compass /> },
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: <Icons.chart />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <Icons.message />,
      },
      {
        name: "Donated items",
        href: "/dashboard/donated-items",
        icon: <Icons.heart />,
      },
    ],
  },
  {
    title: "SAVED ITEMS",
    links: [
      {
        name: "My Posts",
        href: "/dashboard/posts",
        icon: <Icons.user />,
      },
      {
        name: "Saved items",
        href: "/dashboard/saved-items",
        icon: <Icons.star />,
      },
    ],
  },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {SidebarLinks.map((link) => {
        return (
          <div key={link.title}>
            <h1 className="text-paragraph-color font-semibold text-sm p-3">
              {link.title}
            </h1>
            {link.links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    pathName === link.href &&
                    "bg-lightest-purple text-dark-purple"
                  } flex h-[48px] grow items-center justify-center my-2 gap-2 rounded-md p-3 text-sm text-dark-purple font-medium hover:bg-lightest-purple hover:text-dark-purple md:flex-none md:justify-start md:p-2 md:px-3`}
                >
                  {link.icon}
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
