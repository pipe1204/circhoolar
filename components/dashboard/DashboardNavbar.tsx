import Image from "next/image";
import React from "react";

const DashboardNavbar = () => {
  return (
    <nav className="bg-light-white w-full h-14">
      <div className="flex justify-between mx-8">
        <Image src={"/Logo-dark.png"} alt={"Logo"} width={130} height={50} />
        <div>Image</div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
