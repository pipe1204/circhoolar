"use client";

import Billboard from "@/components/Billboard";
import CardItem from "@/components/item/CardItem";
import useUserPosts from "@/hooks/useUserPosts";
import React from "react";
import Masonry from "react-masonry-css";

const page = () => {
  const { myPosts } = useUserPosts();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };
  return (
    <section className="p-2">
      {myPosts.length > 0 ? (
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
        <Billboard text="You haven't created any posts yet" />
      )}
    </section>
  );
};

export default page;
