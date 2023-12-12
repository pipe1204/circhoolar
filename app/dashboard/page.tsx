"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import React from "react";
import Masonry from "react-masonry-css";
import {
  useCategoriesStore,
  useSchoolCodeStore,
  useSelectedSchoolStore,
} from "@/store/store";
import useMainPosts from "@/hooks/useMainPosts";
import useSchoolCodeVerification from "@/hooks/useSchoolVerificationCode";

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const selectedSchool = useSelectedSchoolStore(
    (state) => state.selectedSchool
  );
  const categories = useCategoriesStore((state) => state.categories);

  const { posts, loading, error } = useMainPosts(selectedSchool, categories);
  const { validCode, errorCode, handleCheckCode } = useSchoolCodeVerification();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  return (
    <section className="p-2">
      {schoolCode !== null ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
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
                updatingPost={false}
                isItemSold={false}
              />
            </div>
          ))}
        </Masonry>
      ) : (
        <div className="w-full xl:w-3/4 mx-auto mt-20">
          <div className="w-full xl:w-1/2 mx-auto">
            <h1 className="text-2xl text-center font-semibold mb-4 text-dark-purple">
              Please enter your full name and school code below to get started
            </h1>
          </div>
          <div className="w-3/4 xl:w-1/3 mx-auto">
            <SchoolCodeForm
              checkCode={handleCheckCode}
              errorMessage={errorCode}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
