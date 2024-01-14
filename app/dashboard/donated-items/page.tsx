"use client";

import Billboard from "@/components/Billboard";
import CardItem from "@/components/item/CardItem";
import useDonatedPosts from "@/hooks/useDonatedPosts";
import React from "react";
import Masonry from "react-masonry-css";

const page = () => {
  const { soldItems } = useDonatedPosts();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  const defaultImage = "/Logo-dark.jpg";
  return (
    <section className="p-2 pb-28 xl:pb-10">
      {soldItems.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {soldItems.map((item) => (
            <div key={item.id}>
              <CardItem
                id={item.id}
                authorId={item.authorId}
                author={item.author}
                title={item.title}
                description={item.description}
                image={item.images?.length > 0 ? item.images[0] : defaultImage}
                avatar={item.avatar}
                price={item.price}
                sellingmethod={item.sellingmethod}
                condition={item.condition}
                category={item.category}
                isAlreadySaved={false}
                updatingPost={false}
                isItemSold={true}
              />
            </div>
          ))}
        </Masonry>
      ) : (
        <Billboard text="You haven't sold or donated any items yet" />
      )}
    </section>
  );
};

export default page;
