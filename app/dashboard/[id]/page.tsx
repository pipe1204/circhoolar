"use client";

import ImageGallery from "@/components/item/ImageGallery";
import { Button } from "@/components/ui/Button";
import React, { use, useEffect, useState } from "react";
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
import { CardDescription } from "@/components/ui/Card";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { useSchoolCodeStore } from "@/store/store";

type ClaimItem = z.infer<typeof claimItem>;
interface Buyer {
  name: string;
  email: string;
  image: string;
}

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const [item, setItem] = useState<Post>();
  const [isSaved, setIsSaved] = useState(false);
  const [buyer, setBuyer] = useState<Buyer>();
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const ShareMessage = `Check this item on Circhoolar, The Schools Community Hub!`;

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

        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
          console.log("No such chat document!");
          return;
        }

        const members = chatDoc.data().members;
        const receiverId = members.find(
          (memberId: string) => memberId !== session.user.id
        );

        if (!receiverId) {
          console.log("Receiver not found");
          return;
        }

        // Fetch receiver's data from the "users" collection
        const receiverRef = doc(db, "users", receiverId);
        const receiverDoc = await getDoc(receiverRef);

        if (!receiverDoc.exists()) {
          console.log("No such user document for receiver!");
          return;
        }

        const receiverData = receiverDoc.data();

        const messageRef = doc(collection(db, "chats", chatId, "messages"));
        await setDoc(messageRef, {
          text: `Hi ${item.author}! I'd love to get the ${item.title}. When can I collect it?`,
          isRead: false,
          timestamp: serverTimestamp(),
          sender: {
            name: session?.user?.name,
            email: session?.user?.email,
            id: session?.user?.id,
            image:
              session?.user?.image ||
              "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
          },
          receiver: {
            name: receiverData.name,
            email: receiverData.email,
            id: receiverId,
            image:
              receiverData.image ||
              "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
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

  const handleBuyOption = async () => {
    if (!session?.user?.id || !item?.id || !item.authorId) return;

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

      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        console.log("No such chat document!");
        return;
      }

      const members = chatDoc.data().members;
      const receiverId = members.find(
        (memberId: string) => memberId !== session.user.id
      );

      if (!receiverId) {
        console.log("Receiver not found");
        return;
      }

      // Fetch receiver's data from the "users" collection
      const receiverRef = doc(db, "users", receiverId);
      const receiverDoc = await getDoc(receiverRef);

      if (!receiverDoc.exists()) {
        console.log("No such user document for receiver!");
        return;
      }

      const receiverData = receiverDoc.data();

      const messageRef = doc(collection(db, "chats", chatId, "messages"));
      await setDoc(messageRef, {
        text: `Hi ${item.author}! I am interested in buying the ${item.title}`,
        isRead: false,
        timestamp: serverTimestamp(),
        sender: {
          name: session?.user?.name,
          email: session?.user?.email,
          id: session?.user?.id,
          image:
            session?.user?.image ||
            "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
        },
        receiver: {
          name: receiverData.name,
          email: receiverData.email,
          id: receiverId,
          image:
            receiverData.image ||
            "https://res.cloudinary.com/circhoo/image/upload/v1706651643/Circhoolar_Icon_rfim4h.png",
        },
      });

      console.log("User has not a conversation");
      router.push(`/dashboard/messages/${chatId}`);
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
    <div className="mb-20">
      <div className="mx-auto max-w-screen-xl px-4 xl:px-8">
        <Link href="/dashboard" passHref>
          <Button variant={"link"} size={"lg"} className="mb-8 px-0">
            <Icons.ArrowLeft size={15} className="mr-2" />
            Back
          </Button>
        </Link>
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
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold text-background xl:text-3xl mr-2 xl:mr-4">
                  {item?.title}
                </h2>
                <div className="flex flex-row items-center gap-x-2 cursor-pointer">
                  <WhatsappShareButton url={shareUrl} title={ShareMessage}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <TwitterShareButton url={shareUrl} title={ShareMessage}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <CardDescription>Share item</CardDescription>
                </div>
              </div>
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
              <span className="text-sm text-gray">
                {item?.sellingmethod === "Free"
                  ? "Voluntary donation to school for initiatives or charity of their choice"
                  : ""}
              </span>
            </div>
            {schoolCode === null ? (
              <p className="text-dark-purple italic font-semibold">
                To buy or claim this item, please join your school community hub
                or create a new account at{" "}
                <Link
                  href={"/dashboard"}
                  className=" underline hover:text-paragraph-color"
                >
                  here
                </Link>
              </p>
            ) : (
              <div>
                {item?.authorId !== session?.user?.id ? (
                  <div className="flex justify-around w-full mb-2">
                    <div className="w-3/4">
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
                    <div className="w-full">
                      <ChatButton
                        itemId={item?.id}
                        authorId={item?.authorId}
                        avatar={item?.avatar}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="text-dark-purple text-sm">
                      To edit your post go to{" "}
                      <Link
                        href={"/dashboard"}
                        className="underline text-background italic hover:text-dark-purple"
                      >
                        My items page on the main menu
                      </Link>
                    </p>
                    <p className="mt-4 text-sm font-semibold text-title-color">
                      To let other parents buy your items through a secure
                      payment gateway, add your bank details{" "}
                      <a
                        href="/dashboard/profile"
                        className="underline text-background italic hover:text-dark-purple"
                      >
                        here
                      </a>{" "}
                    </p>
                  </div>
                )}
              </div>
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
