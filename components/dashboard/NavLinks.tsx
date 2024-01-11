"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";
import { use } from "react";
import { useTotalUnreadMessagesStore } from "@/store/store";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const SidebarLinks = [
  {
    title: "DASHBOARD",
    links: [
      { name: "Discover", href: "/dashboard", icon: <Icons.compass /> },
      {
        name: "Community",
        href: "/dashboard/community",
        icon: <Icons.folderHeart />,
      },
      {
        name: "Messages",
        href: "/dashboard/messages",
        icon: <Icons.message />,
      },
      {
        name: "Activities",
        href: "/dashboard/activities",
        icon: <Icons.trophy />,
      },
      {
        name: "Tutors",
        href: "/dashboard/tutors",
        icon: <Icons.book />,
      },
    ],
  },
  {
    title: "PERSONAL",
    links: [
      {
        name: "Donated items",
        href: "/dashboard/donated-items",
        icon: <Icons.sprout />,
      },
      {
        name: "Wishlist",
        href: "/dashboard/wishlist",
        icon: <Icons.heart />,
      },
    ],
  },
];

interface NavLinksProps {
  onClick?: () => void;
}

export default function NavLinks({ onClick }: NavLinksProps) {
  const totalUnreadMessages = useTotalUnreadMessagesStore(
    (state) => state.totalUnreadMessages
  );
  const pathName = usePathname();

  return (
    <>
      {SidebarLinks.map((link) => {
        return (
          <div key={link.title} className="w-full">
            <h1 className="text-paragraph-color font-semibold text-sm p-3">
              {link.title}
            </h1>
            {link.links.map((link) => {
              const showUnreadMessagesIndicator =
                totalUnreadMessages !== null &&
                totalUnreadMessages > 0 &&
                link.name === "Messages";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClick}
                  className={`${
                    pathName === link.href &&
                    "bg-lightest-purple text-dark-purple"
                  } flex h-[48px] w-full grow items-center my-2 gap-2 rounded-md p-3 text-sm text-dark-purple font-medium hover:bg-lightest-purple hover:text-dark-purple md:flex-none justify-start md:p-2 md:px-3`}
                >
                  {link.icon}
                  <p className="block">{link.name}</p>
                  {showUnreadMessagesIndicator && (
                    <div className="w-5 h-5 bg-red rounded-full flex justify-center items-center">
                      <span className="text-light-white font-semibold text-xs">
                        {totalUnreadMessages}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
