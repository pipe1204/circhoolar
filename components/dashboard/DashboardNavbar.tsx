"use client";

import Image from "next/image";
import React, { use, useEffect } from "react";
import UserButton from "../ui/UserButton";
import { useSession } from "next-auth/react";
import { useSchoolCodeStore } from "@/store/store";
import { codeRef } from "@/lib/converters/SchoolCode";
import { doc, getDoc } from "firebase/firestore";

const DashboardNavbar = () => {
  const { data: session } = useSession();
  const code = useSchoolCodeStore((state) => state.schoolCode);

  const [schoolName, setSchoolName] = React.useState("");

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      const docRef = codeRef(code as string);
      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          console.log(docSnapshot.data());
          setSchoolName(docSnapshot.data().name);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (code) {
      fetchData(); // Call the async function
    }
  }, [code]);

  return (
    <nav className="bg-dark-purple w-full h-16">
      <div className="flex justify-between items-center mx-2 xl:mx-8">
        <Image src={"/Logo-light.png"} alt={"Logo"} width={130} height={50} />
        <div className="flex gap-x-8 items-center">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-light-white text-xs xl:text-lg font-semibold">
              {schoolName}
            </h1>
            <UserButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
