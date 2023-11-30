import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/Card";
import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";

interface CardItemProps {
  id: string;
  author: string;
  title: string;
  description: string;
  image: string;
  avatar: string;
  price: string | number;
  sellingmethod: string;
  condition?: string;
  conditionColor?: string;
}

const CardSampleCarousel = ({
  id,
  title,
  image,
  avatar,
  author,
  price,
  sellingmethod,
  condition,
  conditionColor,
}: CardItemProps) => {
  console.log(price);
  return (
    <Card className="bg-light-white w-full border border-light-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full flex-grow bg-light-white p-2">
        <div className="absolute flex justify-center items-center top-4 right-4 bg-accent px-2 rounded-full shadow-md">
          <span className="text-dark text-[8px] xl:text-[10px] font-semibold">
            {sellingmethod === "Free" ? sellingmethod : `$${price}`}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 xl:bottom-6 xl:left-6 flex justify-start items-center">
          <div className=" w-6 h-6 xl:w-7 xl:h-7 mr-2 rounded-full overflow-hidden relative">
            <Image
              src={avatar}
              alt={title}
              width={100}
              height={80}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className=" bg-accent rounded-md shadow-sm px-[4px] xl:px-[6px] py-[1px] xl:py-[1px]">
            <h3 className="text-[8px] xl:text-xs text-dark font-semibold">
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
      <div className="relative mt-2">
        <div className="absolute px-4 inset-0 flex items-center">
          <span className="w-full border-t border-background" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <CardTitle
            className="bg-background px-2 text-center text-light-white text-[8px] xl:text-[12px]"
            as="h3"
          >
            {title}
          </CardTitle>
        </div>
      </div>
      <CardContent>
        <div className="mb-2 xl:mb-4 flex flex-row justify-start items-center">
          <div
            className={`w-2 h-2 rounded-full bg-${conditionColor} mr-2`}
          ></div>
          <h1 className="text-[10px] xl:text-xs text-background font-semibold">
            {condition}
          </h1>
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-center w-full xl:w-3/4 mx-auto">
          <div className="w-full">
            <Link href={`dashboard/${id}`}>
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full text-light-white bg-dark-purple hover:bg-title-color hover:text-light-white"
              >
                View
              </Button>
            </Link>
          </div>
          <div className="w-full">
            <Button
              variant={"outlineLight"}
              size={"sm"}
              className="w-full bg-light-white hover:text-light-white"
            >
              Wishlist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSampleCarousel;
