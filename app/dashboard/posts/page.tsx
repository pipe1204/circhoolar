"use client";

import Billboard from "@/components/Billboard";
import CardItem from "@/components/item/CardItem";
import { postRef } from "@/lib/converters/Post";
import { useSchoolCodeStore } from "@/store/store";
import { Post } from "@/types/Types";
import { onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";

const page = () => {
  const { data: session } = useSession();
  const code = useSchoolCodeStore((state) => state.schoolCode);
  const [myPosts, setMyPosts] = React.useState<Post[]>([]);
  useEffect(() => {
    if (session?.user?.id) {
      const postsQuery = query(
        postRef,
        where("authorId", "==", session?.user?.id)
      );

      const unsubscribe = onSnapshot(
        postsQuery,
        (querySnapshot) => {
          const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
          setMyPosts(fetchedPosts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );

      return () => unsubscribe(); // Clean up the listener when the component unmounts
    }
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };
  return (
    <section className="p-2">
      {code !== undefined || null ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {myPosts.map((post) => (
            <div key={post.id}>
              <CardItem
                id={post.id}
                authorId={post.authorId}
                author={post.author}
                title={post.title}
                description={post.description}
                image={post.images[0]}
                avatar={post.avatar}
                price={post.price}
                sellingmethod={post.sellingmethod}
                condition={post.condition}
                category={post.category}
                isAlreadySaved={false}
                updatingPost={true}
                isItemSold={false}
              />
            </div>
          ))}
        </Masonry>
      ) : (
        <Billboard text="Please enter your school code on the Discovery page" />
      )}
    </section>
  );
};

export default page;
