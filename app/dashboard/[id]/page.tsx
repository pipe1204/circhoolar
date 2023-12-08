"use client";

import ImageGallery from "@/components/item/ImageGallery";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { postRef } from "@/lib/converters/Post";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Post } from "@/types/Types";
import ChatButton from "@/components/user/ChatButton";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import { Icons } from "@/components/Icons";

const page = () => {
  const [item, setItem] = useState<Post>();
  const [isSaved, setIsSaved] = useState(false);
  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      if (params.id && typeof params.id === "string") {
        try {
          const docRef = doc(postRef, params.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setItem(docSnap.data() as Post);

            if (session?.user?.id) {
              const savedItemRef = doc(
                userRef(session.user.id),
                "savedItems",
                params.id
              );
              const savedItemSnap = await getDoc(savedItemRef);
              setIsSaved(savedItemSnap.exists());
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      }
    };
    fetchItemData();
  }, [params.id, session?.user?.id]);

  const handleWishlistClick = async () => {
    if (session?.user?.id && item) {
      const savedItemRef = doc(userRef(session.user.id), "savedItems", item.id);
      if (isSaved) {
        // Remove from wishlist
        await deleteDoc(savedItemRef);
        setIsSaved(false);
      } else {
        // Add to wishlist
        await setDoc(savedItemRef, { ...item });
        setIsSaved(true);
      }
    }
  };

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
                    onClick={handleWishlistClick}
                    variant={"outlineLight"}
                    className={`w-full hover:bg-transparent `}
                  >
                    <Icons.heart
                      fill={`${isSaved ? "dark-purple" : "none"}`}
                      size={18}
                      className="mr-2 text-dark-purple"
                    />
                    {isSaved ? "Saved" : "Wishlist"}
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
              <div className="w-full mx-auto">
                <ChatButton
                  itemId={item?.id}
                  authorId={item?.authorId}
                  avatar={item?.avatar}
                />
              </div>
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
