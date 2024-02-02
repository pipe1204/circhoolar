"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  useAudienceSelectedStore,
  useCategoriesStore,
  useItemsLocationStore,
  useSchoolCodeStore,
  useSelectedSchoolStore,
} from "@/store/store";
import useMainPosts from "@/hooks/useMainPosts";
import useSchoolCodeVerification from "@/hooks/useSchoolVerificationCode";
import Billboard from "@/components/Billboard";
import { CardDescription, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const selectedSchool = useSelectedSchoolStore(
    (state) => state.selectedSchool
  );
  const categories = useCategoriesStore((state) => state.categories);
  const itemsLocation = useItemsLocationStore((state) => state.itemsLocation);

  const { posts } = useMainPosts(selectedSchool, categories, itemsLocation);
  const { errorCode, handleCheckCode } = useSchoolCodeVerification();

  const setAudienceSelected = useAudienceSelectedStore(
    (state) => state.setAudienceSelected
  );

  useEffect(() => {
    setAudienceSelected("Public");
  }, []);

  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  let audienceTitle;
  switch (itemsLocation) {
    case "Public":
      audienceTitle = "All communities";
      break;
    case "Private":
      audienceTitle = "My community";
      break;
    case "Own":
      audienceTitle = "My items";
      break;
    default:
      break;
  }

  if (schoolCode !== null && posts.length === 0) {
    return (
      <section className="p-2">
        <Billboard text="There are no posts at the moment" />
      </section>
    );
  }

  return (
    <section className="p-2 mb-28 xl:mb-0">
      {schoolCode !== null ? (
        <div>
          <div className="relative mb-8">
            <div className="absolute px-4 inset-0 flex items-center">
              <span className="w-full border-t border-primary-purple" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <CardTitle className="bg-primary-purple w-3/4 xl:w-1/2 px-2 py-[3px] text-center text-light-white text-lg xl:text-xl rounded-md">
                {audienceTitle}
              </CardTitle>
            </div>
          </div>
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
                  updatingPost={itemsLocation === "Own" ? true : false}
                  isItemSold={false}
                />
              </div>
            ))}
          </Masonry>
        </div>
      ) : (
        <div className="w-full xl:w-3/4 mx-auto mt-20">
          <div className="w-full xl:w-1/2 mx-auto">
            <h1 className="text-2xl text-center font-semibold mb-4 text-dark-purple">
              Please enter your full name and school code below to get started
            </h1>
          </div>
          <div className="w-5/6 xl:w-1/3 mx-auto">
            <SchoolCodeForm
              checkCode={handleCheckCode}
              errorMessage={errorCode}
            />
          </div>
          <div className="text-center mt-6 w-full xl:w-1/2 mx-auto">
            <CardDescription className="text-md">
              If you don't have a school code, please contact your school
              administrator to get one; or refer your school at{" "}
              <Link
                className="text-primary-purple"
                href={"https://www.circhoolar.com/schools"}
              >
                https://www.circhoolar.com/schools
              </Link>{" "}
              to join Circhoolar.
            </CardDescription>
            <CardDescription className="text-md mt-6">
              Alternatively, email us at{" "}
              <span className="text-primary-purple">
                schools@circhoolar.com
              </span>{" "}
              to get in touch with your school.
            </CardDescription>
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
