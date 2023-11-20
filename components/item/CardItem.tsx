import React from "react";
import { Card, CardFooter, CardTitle } from "../ui/Card";
import Image from "next/image";
import { Button } from "../ui/Button";

interface CardItemProps {
  author: string;
  title: string;
  description: string;
  image: string;
  avatarImage: string;
  value: string;
}

const CardItem = ({
  title,
  image,
  avatarImage,
  author,
  value,
}: CardItemProps) => {
  return (
    <Card
      className="bg-light-white w-full rounded-lg overflow-hidden cursor-not-allowed"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative mt-2">
        <div className="absolute px-4 inset-0 flex items-center">
          <span className="w-full border-t border-paragraph-color" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <CardTitle
            className="bg-background px-2 text-center text-light-white text-md"
            as="h3"
          >
            {title}
          </CardTitle>
        </div>
      </div>
      <div className="relative w-full flex-grow bg-light-white p-4">
        <div className="absolute flex justify-center items-center top-6 right-6 bg-dark-purple px-4 rounded-full shadow-md">
          <span className="text-light-white text-[8px] xl:text-[10px] font-semibold">
            {value}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 flex justify-start items-center">
          <div className="w-7 h-7 mr-2 rounded-full overflow-hidden relative">
            <Image
              src={avatarImage}
              alt={title}
              width={100}
              height={80}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className=" bg-primary-purple rounded-md shadow-sm px-[4px] xl:px-[6px] py-[1px] xl:py-[3px]">
            <h3 className="text-[8px] xl:text-xs text-light-white font-semibold">
              {author}
            </h3>
          </div>
        </div>
        <Image
          src={image}
          alt={title}
          width={100}
          height={80}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      <CardFooter className="flex flex-col gap-y-2 justify-center items-center">
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-full text-light-white"
        >
          View
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-full bg-light-white"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
