"use client";

import ImageGallery from "@/components/item/ImageGallery";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { postRef } from "@/lib/converters/Post";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { Post } from "@/types/Types";
import ChatButton from "@/components/user/ChatButton";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import { Icons } from "@/components/Icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { claimItem } from "@/lib/validations/auth";
import { z } from "zod";
import Link from "next/link";
import { chatsRef } from "@/lib/converters/ChatMembers";
import { db } from "@/firebase";
import { toast } from "@/components/ui/use-toast";

type ClaimItem = z.infer<typeof claimItem>;
interface Buyer {
  name: string;
  email: string;
  image: string;
}

const page = () => {
  const [item, setItem] = useState<Post>();
  const [isSaved, setIsSaved] = useState(false);
  const [buyer, setBuyer] = useState<Buyer>();
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const form = useForm<ClaimItem>({
    resolver: zodResolver(claimItem),
    defaultValues: {
      claim: "",
    },
  });

  useEffect(() => {
    if (session?.user?.id) {
      const buyerRef = userRef(session?.user?.id || "");
      const unsubscribe = onSnapshot(buyerRef, (doc) => {
        setBuyer(doc.data());
      });
      return () => unsubscribe();
    }
  });

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

  const handleClaimOption = async (value: string) => {
    if (!session?.user?.id || !item?.id || !item.authorId) return;

    if (value === "Collect") {
      console.log("Yes its collect");
      const q = query(
        chatsRef,
        where("itemId", "==", item.id),
        where("members", "array-contains", session.user.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({
          title: "Contacting author...",
          description: "Hold on tight. Taking you there now.",
          duration: 3000,
        });
        setTimeout(() => {
          const existingChat = querySnapshot.docs[0].data();
          router.push(`/dashboard/messages/${existingChat.chatId}`);
        }, 3000);
      } else {
        toast({
          title: "Contacting author...",
          description: "Please wait while we create the chat room.",
          duration: 3000,
        });
        const chatId = session.user.id + "-" + item.authorId + "-" + item.id;
        await setDoc(doc(db, "chats", chatId), {
          itemId: item.id,
          avatar: item.avatar,
          members: [session.user.id, item.authorId],
          createdAt: serverTimestamp(),
          chatId: chatId,
        });

        const messageRef = doc(collection(db, "chats", chatId, "messages"));
        await setDoc(messageRef, {
          text: `Hi ${item.author}! I am interested in the ${item.title}`,
          timestamp: serverTimestamp(),
          user: {
            name: buyer?.name,
            email: session.user.email,
            id: session.user.id,
            image: buyer?.image,
          },
        });

        console.log("User has not a conversation");
        router.push(`/dashboard/messages/${chatId}`);
      }
    } else {
      console.log("The option is: ", value);
      {
        /**Crate logic for donation */
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
    <div className="my-10">
      <div className="mx-auto max-w-screen-xl px-4 xl:px-8">
        <div className="flex flex-col w-full xl:flex-row gap-8">
          <div className="flex-shrink-0 xl:w-1/2">
            <ImageGallery images={item?.images} />
          </div>
          <div className="flex-grow w-full xl:w-1/2 xl:py-4">
            {item?.authorId !== session?.user?.id && (
              <div className="mb-4">
                <p className="text-sm">
                  This item is from:{" "}
                  <span className="text-dark-purple italic font-semibold">
                    {item?.schoolName}
                  </span>
                </p>
              </div>
            )}
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
            {item?.authorId !== session?.user?.id ? (
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
                    {item?.sellingmethod === "Free" ? (
                      <Form {...form}>
                        <form className="grid gap-4">
                          <FormField
                            control={form.control}
                            name="claim"
                            render={({ field, fieldState: { error } }) => (
                              <FormItem>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    handleClaimOption(value);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="text-light-white">
                                      <Icons.shrub size={18} />
                                      <SelectValue placeholder="Claim" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Donate">
                                      Donate
                                    </SelectItem>
                                    <SelectItem value="Collect">
                                      Collect
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    ) : (
                      <Button
                        variant={"outlineLight"}
                        className="text-background hover:text-light-white w-full"
                      >
                        Buy now
                      </Button>
                    )}
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
            ) : (
              <p className="text-dark-purple text-sm">
                To edit your post go to{" "}
                <Link
                  href={"/dashboard/posts"}
                  className=" underline text-background italic hover:text-dark-purple"
                >
                  My posts page
                </Link>
              </p>
            )}
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
