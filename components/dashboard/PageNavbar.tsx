"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import { usePathname } from "next/navigation";
import { categoryFilters, topics } from "@/constants";
import NavLinks from "./NavLinks";
import dynamic from "next/dynamic";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { schoolSchema, topicSchema } from "@/lib/validations/auth";
import { useCategoriesStore, useTopicStore } from "@/store/store";
import PostQuestionDialog from "../community/PostQuestionDialog";

const PostItemDialog = dynamic(() => import("../item/PostItemDialog"), {
  ssr: false,
});
type topicInputs = z.infer<typeof topicSchema>;

const PageNavbar = () => {
  const setTopic = useTopicStore((state) => state.setTopic);

  const setCategories = useCategoriesStore((state) => state.setCategories);

  const topicForm = useForm<topicInputs>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      topicSelected: "",
    },
  });

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment =
    pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "";

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCategoryDetails = (category: string) => {
    let icon;
    let categoryName;
    switch (category.toLowerCase()) {
      case "dashboard":
        icon = <Icons.compass className="text-dark-purple" />;
        categoryName = "discover";
        break;
      case "community":
        icon = <Icons.folderHeart className="text-dark-purple" />;
        categoryName = "community";
        break;
      case "messages":
        icon = <Icons.message className="text-dark-purple" />;
        categoryName = "Messages";
        break;
      case "donated-items":
        icon = <Icons.heart className="text-dark-purple" />;
        categoryName = "Donated items";
        break;
      case "wishlist":
        icon = <Icons.heart className="text-dark-purple" />;
        categoryName = "Wishlist";
        break;
      default:
        icon = null; // default icon or null
        categoryName = capitalizeFirstLetter(category);
    }
    return { icon, categoryName };
  };

  const { icon, categoryName } = getCategoryDetails(lastSegment);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = {
        ...prev,
        [category]: !prev[category],
      };

      // Update the global categories state
      const selected = Object.entries(updatedCategories)
        .filter(([_, isSelected]) => isSelected)
        .map(([category]) => category);
      setCategories(selected);

      return updatedCategories;
    });
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light-white flex justify-between items-center border border-light-white-500 shadow-md w-full h-16">
      <div
        className={`flex ${
          lastSegment === "dashboard" ? "justify-start" : "justify-start"
        } xl:justify-between items-center mx-6 xl:mx-10 w-full`}
      >
        <div className="xl:hidden flex justify-end items-center">
          <button
            onClick={handleMenuClick}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-lightest-purple"
          >
            {isMenuOpen ? (
              <Icons.close className="text-primary-purple" />
            ) : (
              <Icons.menu className="text-primary-purple" />
            )}
          </button>
        </div>
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-10 overflow-y-auto`}
        >
          <div className="flex flex-col w-full justify-between items-start">
            <div className="absolute top-4 right-2">
              <button
                onClick={handleMenuClick}
                className="flex mr-4 items-center justify-center w-10 h-10 rounded-full bg-lightest-purple"
              >
                <Icons.close className="text-primary-purple" />
              </button>
            </div>
            <div className="mt-4 xl:mt-0">
              <NavLinks onClick={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
        <div className="hidden xl:flex">
          {pathname === "/dashboard" && (
            <div>
              <PostItemDialog />
            </div>
          )}
        </div>
        {categoryName === "discover" && (
          <div className="flex flex-row justify-between items-center ml-2 xl:ml-0">
            <button
              onClick={toggleDropdown}
              className="flex gap-x-2 items-center rounded-md border-[1px] border-light-white-400 px-2 xl:px-8 py-[4px] bg-light-white shadow-sm cursor-pointer"
            >
              <Icons.backpack className="text-dark-purple" size={20} />
              <h1 className="text-dark-purple text-md font-semibold">
                Categories
              </h1>
            </button>
            {isDropdownOpen && (
              <div className="bg-light-white px-3 shadow-md rounded-md mt-2 absolute top-28 z-10">
                {categoryFilters.map((category) => (
                  <label
                    key={category}
                    className="flex items-center p-2 text-dark-purple text-sm font-semibold cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedCategories[category]}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            )}
            <div className="flex xl:hidden ml-8 xl:ml-0">
              <PostItemDialog />
            </div>
          </div>
        )}
        {categoryName === "community" && (
          <div className="w-full flex flex-row justify-between items-center gap-x-2 ml-2 xl:ml-0 mt-4 xl:mt-0 mb-4 xl:mb-0 px-2 py-2 rounded-md">
            <Form {...topicForm}>
              <form className="grid gap-4">
                <FormField
                  control={topicForm.control}
                  name="topicSelected"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setTopic(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-light-white">
                            <SelectValue placeholder="Choose a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="All">All topics</SelectItem>
                          {topics.map((topic) => {
                            return (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <PostQuestionDialog />
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageNavbar;
