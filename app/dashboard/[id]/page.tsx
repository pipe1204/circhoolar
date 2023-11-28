import { Icons } from "@/components/Icons";
import ImageGallery from "@/components/item/ImageGallery";
import { Button } from "@/components/ui/Button";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const images = [
    { id: "1", image: "/card1.jpg" },
    { id: "2", image: "/card5.jpg" },
    { id: "3", image: "/card9.jpg" },
    { id: "4", image: "/card8.jpg" },
  ];
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 xl:px-8">
        <div className="grid gap-8 xl:grid-cols-2">
          <ImageGallery images={images} />
          <div className="xl:py-8">
            <div className="mb-2 xl:mb-3">
              <span className="mb-0.5 inline-block text-title-color">
                Category name
              </span>
              <h2 className="text-2xl font-bold text-background xl:text-3xl">
                Product Name
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-1 xl:mb-10">
              <div className={`w-2 h-2 rounded-full bg-green mr-2`}></div>
              <h1 className="text-[12px] xl:text-sm text-background font-semibold">
                Great condition
              </h1>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-dark-purple text-lg font-bold">Free</span>
              </div>
              <span className="text-xs text-gray">
                Voluntary donation to school for initiatives or charity of their
                choice
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full xl:w-3/4">
              <div className="flex justify-around gap-2.5 w-full mb-2">
                <div className="w-1/2">
                  <Button
                    variant={"outlineLight"}
                    className="w-full hover:text-light-white"
                  >
                    Add to wishlist
                  </Button>
                </div>
                <div className="w-1/2">
                  <Button
                    variant={"outlineLight"}
                    className="text-background hover:text-light-white w-full"
                  >
                    Claim
                  </Button>
                </div>
              </div>
              <Button variant={"secondary"}>
                <Icons.message className="text-light-white mr-2" size={18} />
                Ask a question
              </Button>
            </div>
            <p className="mt-12 text-base text-gray tracking-wide">
              We wanted to let you know about a change to our fees on orders
              from grocers, bottle shops, convenience stores and other retail
              categories in Australia & New Zealand. From Tuesday 5th December
              where the cost of the items in the basket is less than $10 we’re
              introducing a Small Order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
