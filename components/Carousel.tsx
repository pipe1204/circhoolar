import Image from "next/image";
import React from "react";

const Carousel = () => {
  const logos = [
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    <Image
      src={"/Logo-light.png"}
      alt="Circhoolar Logo"
      width={180}
      height={50}
      className="mx-4"
    />,
    // ... other logos
  ];

  const duplicatedLogos = [...logos, ...logos];
  return (
    <div className="w-full flex flex-row py-10 justify-center items-center">
      <div className=" w-[40%] xl:w-[10%] text-white h-full">
        <h1 className="font-semibold text-xl">Schools</h1>
      </div>
      <div className="flex overflow-hidden w-[90%] text-white h-full border-l-2 border-white text-6xl px-8">
        <div className="carousel">
          {duplicatedLogos.map((logo, index) => (
            <React.Fragment key={index}>{logo}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
