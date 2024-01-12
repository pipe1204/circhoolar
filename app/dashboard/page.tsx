"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  useCategoriesStore,
  useItemsLocationStore,
  useSchoolCodeStore,
  useSelectedSchoolStore,
} from "@/store/store";
import useMainPosts from "@/hooks/useMainPosts";
import useSchoolCodeVerification from "@/hooks/useSchoolVerificationCode";
import Billboard from "@/components/Billboard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { communityQuestionsAudience } from "@/lib/validations/auth";
import { z } from "zod";

type Inputs = z.infer<typeof communityQuestionsAudience>;

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const selectedSchool = useSelectedSchoolStore(
    (state) => state.selectedSchool
  );
  const categories = useCategoriesStore((state) => state.categories);
  const setItemsLocation = useItemsLocationStore(
    (state) => state.setItemsLocation
  );
  const itemsLocation = useItemsLocationStore((state) => state.itemsLocation);

  useEffect(() => {
    setItemsLocation("Public");
  }, []);

  const { posts } = useMainPosts(selectedSchool, categories, itemsLocation);
  const { errorCode, handleCheckCode } = useSchoolCodeVerification();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  const form = useForm<Inputs>({
    resolver: zodResolver(communityQuestionsAudience),
    defaultValues: {
      audience: "Public",
    },
  });

  if (schoolCode !== null && posts.length === 0) {
    return (
      <section className="p-2">
        <Billboard text="There are no posts at the moment" />
      </section>
    );
  }

  return (
    <section className="p-2">
      {schoolCode !== null ? (
        <div>
          <div className="">
            <Form {...form}>
              <form className="grid gap-4 ">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setItemsLocation(value);
                          }}
                          defaultValue={field.value}
                          className="flex flex-row justify-between gap-x-4 p-4 mb-4 rounded-md bg-card-color w-[84%] xl:w-[55%] fixed z-10"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="Public"
                                className="border border-light-white text-light-white"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-light-white">
                              All schools
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="Private"
                                className="border border-light-white text-light-white"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-light-white">
                              My school community
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="Own"
                                className="border border-light-white text-light-white"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-light-white">
                              My items
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid mt-20 xl:mt-16"
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
        </div>
      )}
    </section>
  );
};

export default page;
