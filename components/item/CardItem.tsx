"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/Card";
import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { userRef } from "@/lib/converters/User";
import { db } from "@/firebase";
import { Icons } from "../Icons";
import { usePathname } from "next/navigation";
import UpdateItemDialog from "./UpdateItemDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { postRef } from "@/lib/converters/Post";
import { set } from "zod";
import useCheckItemStatus from "@/hooks/useCheckItemStatus";

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
  updatingPost?: boolean;
  isItemSold?: boolean;
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
  updatingPost,
  isItemSold,
  onRemoveFromWishlist,
}: CardItemProps) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const { isSaved, isAlreadySold, setIsSaved, setIsAlreadySold } =
    useCheckItemStatus(id, isAlreadySaved);

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

  const handleDeleteFromFirebase =
    (itemId: string, images: string | string[]) => async () => {
      if (!session?.user?.id) return;

      const postRef = doc(db, "posts", itemId);
      await deleteDoc(postRef);
      await removePostFromSavedItems(itemId);

      // const imageUrls = Array.isArray(images) ? images : [images];

      // try {
      //   // Delete each image
      //   for (const imageUrl of imageUrls) {
      //     const match = imageUrl.match(/circhoolar_items_upload\/(.+)\.jpg/);

      //     if (match && match.length >= 2) {
      //       const publicId = match[1];
      //       await fetch("/api/deleteImage", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({ publicId }),
      //       });
      //     } else {
      //       console.error("Invalid image URL format:", imageUrl);
      //     }
      //   }

      //   // Delete the post from Firebase after all images have been processed
      //   const postRef = doc(db, "posts", itemId);
      //   await deleteDoc(postRef);
      //   await removePostFromSavedItems(itemId);
      // } catch (error) {
      //   console.error("Error deleting post or images:", error);
      // }
    };

  const removePostFromSavedItems = async (postId: string) => {
    const usersRef = collection(db, "users");
    const allUsersSnapshot = await getDocs(usersRef);

    allUsersSnapshot.forEach(async (userDoc) => {
      const savedItemsRef = collection(userRef(userDoc.id), "savedItems");
      const q = query(savedItemsRef, where("id", "==", postId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    });
  };

  const handleSoldItem = async () => {
    const docRef = doc(postRef, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        isSold: !docSnap.data().isSold,
      });
      setIsAlreadySold(!docSnap.data().isSold);
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
            className="bg-background w-1/2 px-2 py-[3px] text-center text-light-white text-[8px] xl:text-[12px] rounded-sm"
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
        <div className="absolute w-5/6 bottom-4 left-4 xl:bottom-6 xl:left-6 flex justify-start items-center">
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
        {!isItemSold && (
          <div>
            {updatingPost ? (
              <div className="flex flex-col gap-y-2 justify-center items-center w-full xl:w-3/4 mx-auto">
                <div className="w-full">
                  <UpdateItemDialog itemId={id} />
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="text-red flex justify-center items-center text-sm">
                    <Icons.trash size={15} className="mr-2" />
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-light-white">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteFromFirebase(id, image)}
                        className="bg-red text-light-white"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="w-full text-sm mt-2 text-background underline"
                  onClick={handleSoldItem}
                >
                  {isAlreadySold ? "Back available" : "Mark as sold"}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-y-2 justify-center items-center w-full xl:w-3/4 mx-auto">
                <div className="w-full">
                  <Link href={`/dashboard/${id}`}>
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
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardItem;
