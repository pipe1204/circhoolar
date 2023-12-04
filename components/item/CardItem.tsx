"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { userRef } from "@/lib/converters/User";
import { db } from "@/firebase";
import { set } from "react-hook-form";
import { Icons } from "../Icons";

interface CardItemProps {
  id: string;
  authorId?: string;
  author: string;
  title: string;
  description: string;
  image: string;
  avatar: string;
  price: string | number;
  sellingmethod: string;
  condition: string;
  category: string;
  isAlreadySaved: boolean;
  onRemoveFromWishlist?: (itemId: string) => void;
}

const CardItem = ({
  id,
  title,
  image,
  avatar,
  author,
  price,
  sellingmethod,
  condition,
  authorId,
  category,
  isAlreadySaved,
  onRemoveFromWishlist,
}: CardItemProps) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(isAlreadySaved);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!isAlreadySaved && session?.user?.id) {
        const userID = session.user.id;
        const savedItemRef = doc(userRef(userID), "savedItems", id);
        const docSnap = await getDoc(savedItemRef);
        setIsSaved(docSnap.exists());
      }
    };
    checkSavedStatus();
  }, [id, session?.user?.id]);

  const handleWishlistClick = async () => {
    if (session?.user?.id) {
      const savedItemRef = doc(userRef(session.user.id), "savedItems", id);
      const postRef = doc(db, "posts", id);
      if (isSaved) {
        await deleteDoc(savedItemRef);
        setIsSaved(false);
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(id);
        }
      } else {
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          await setDoc(savedItemRef, {
            id: postData.id,
            title: postData.title,
            images: postData.images,
            authorId: postData.authorId,
            category: postData.category,
            author: postData.author,
            price: postData.price,
            sellingmethod: postData.sellingmethod,
            condition: postData.condition,
            avatar: postData.avatar,
          });
          setIsSaved(true);
        } else {
          console.log("No such document!");
        }
      }
    }
  };

  const itemCondition = ({ condition }: { condition: string }) => {
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
    <Card className="bg-light-white w-full border border-light-white shadow-md rounded-lg overflow-hidden">
      <div className="relative mb-2 mt-4">
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

      <div className="flex flex-row justify-start items-center p-2">
        <div
          className={`w-2 h-2 rounded-full bg-${itemCondition({
            condition,
          })} mr-2`}
        ></div>
        <h1 className="text-[10px] xl:text-xs text-background font-semibold">
          {condition}
        </h1>
      </div>
      <CardContent>
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
              onClick={handleWishlistClick}
              variant={"outlineLight"}
              size={"sm"}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;
