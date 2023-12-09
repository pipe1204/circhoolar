"use client";

import Billboard from "@/components/Billboard";
import CardItem from "@/components/item/CardItem";
import { userRef } from "@/lib/converters/User";
import { Post } from "@/types/Types";
import { collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

interface SavedItem {
  docId: string;
  postData: Post;
}

const page = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSavedItems = async () => {
      if (session?.user?.id) {
        const savedItemsRef = collection(
          userRef(session.user.id),
          "savedItems"
        );
        const querySnapshot = await getDocs(savedItemsRef);
        const items = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          postData: doc.data() as Post,
        }));
        setSavedItems(items);
      }
    };
    fetchSavedItems();
  }, [session?.user?.id]);

  const removeItemFromState = (itemId: string) => {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.docId !== itemId)
    );
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  const defaultImage = "/Logo-dark.jpg";
  return (
    <section className="p-2">
      {savedItems.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {savedItems?.map((post) => (
            <div key={post.postData.id}>
              <CardItem
                id={post.docId}
                authorId={post.postData.authorId}
                author={post.postData.author}
                title={post.postData.title}
                description={post.postData.description}
                image={
                  post.postData.images?.length > 0
                    ? post.postData.images[0]
                    : defaultImage
                }
                avatar={post.postData.avatar}
                price={post.postData.price}
                sellingmethod={post.postData.sellingmethod}
                condition={post.postData.condition}
                category={post.postData.category}
                isAlreadySaved={true}
                onRemoveFromWishlist={removeItemFromState}
                updatingPost={false}
                isItemSold={false}
              />
            </div>
          ))}
        </Masonry>
      ) : (
        <Billboard text="You don't have any saved items at the moment" />
      )}
    </section>
  );
};

export default page;
