"use client";

import { Icons } from "@/components/Icons";
import ImageGallery from "@/components/item/ImageGallery";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { postRef } from "@/lib/converters/Post";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "@/types/Types";

const page = () => {
  const [item, setItem] = useState<Post>();
  const params = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      if (params.id && typeof params.id === "string") {
        try {
          const docRef = doc(postRef, params.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setItem(docSnap.data() as Post);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      }
    };
    fetchItemData();
  }, [params.id]);

  const itemCondition = (condition: string | undefined) => {
    let conditionColor;
    switch (condition) {
      case "Great condition":
        conditionColor = "green";
        break;
      case "Good condition":
        conditionColor = "blue";
        break;
      case "Fair condition":
        conditionColor = "orange";
        break;
      default:
        conditionColor = "white";
    }

    return conditionColor;
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 xl:px-8">
        <div className="grid gap-8 xl:grid-cols-2">
          <ImageGallery images={item?.images} />
          <div className="xl:py-8">
            <div className="mb-2 xl:mb-3">
              <span className="mb-0.5 inline-block text-title-color">
                {item?.category}
              </span>
              <h2 className="text-2xl font-bold text-background xl:text-3xl">
                {item?.title}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-1 xl:mb-10">
              <div
                className={`w-2 h-2 rounded-full bg-${itemCondition(
                  item?.condition || "green"
                )} mr-2`}
              ></div>
              <h1 className="text-[12px] xl:text-sm text-background font-semibold">
                {item?.condition}
              </h1>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-dark-purple text-lg font-bold">
                  {item?.sellingmethod === "Free" ? "Free" : `$${item?.price}`}
                </span>
              </div>
              <span className="text-xs text-gray">
                {item?.sellingmethod === "Free"
                  ? "Voluntary donation to school for initiatives or charity of their choice"
                  : ""}
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
              {item?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
