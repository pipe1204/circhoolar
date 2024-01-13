"use client";

import Billboard from "@/components/Billboard";
import CardItem from "@/components/item/CardItem";
import useSavedPosts from "@/hooks/useSavedPosts";
import React from "react";
import Masonry from "react-masonry-css";

const page = () => {
  const { savedItems, removeItemFromState } = useSavedPosts();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  const defaultImage = "/Logo-dark.jpg";
  return (
    <section className="p-2 mb-28 xl:mb-0">
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
