"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import { usePathname } from "next/navigation";
import { categoryFilters } from "@/constants";
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
import { schoolSchema } from "@/lib/validations/auth";
import { useSchoolCodeStore } from "@/store/store";
import path from "path";
import { get } from "http";

const PostItemDialog = dynamic(() => import("../item/PostItemDialog"), {
  ssr: false,
});
type Inputs = z.infer<typeof schoolSchema>;

const PageNavbar = () => {
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);

  const form = useForm<Inputs>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolCode: "",
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
        categoryName = "Discover";
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
      case "posts":
        icon = <Icons.user className="text-dark-purple" />;
        categoryName = "My Posts";
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
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(lastSegment);

  return (
    <nav className="bg-light-white flex justify-between items-center border border-light-white-500 shadow-md w-full h-16">
      <div
        className={`flex ${
          lastSegment === "dashboard" ? "justify-between" : "justify-start"
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
        <div className="flex justify-center items-center ml-4 xl:ml-0">
          {lastSegment === "dashboard" ? "" : icon}
          <h1 className="text-dark-purple font-semibold text-lg ml-2">
            {lastSegment === "dashboard" ? "" : categoryName}
          </h1>
        </div>
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-64 bg-white shadow-md transition-transform duration-300 ease-in-out z-10`}
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
            <div className="mt-8 xl:mt-0">
              <NavLinks onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="hidden flex-row items-center gap-x-2 ml-2 xl:ml-0 mt-2 xl:mt-0 mb-4 px-2 py-2 rounded-md">
              <Form {...form}>
                <form className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="schoolCode"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSchoolCode(value);
                          }}
                          defaultValue={field.value}
                          disabled={true}
                        >
                          <FormControl>
                            <SelectTrigger className="text-light-white">
                              <SelectValue placeholder="Select a school" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CSYP3141">
                              South Yarra Primary
                            </SelectItem>
                            <SelectItem value="1234">Test</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div>
          {pathname === "/dashboard" && (
            <div className="flex">
              <PostItemDialog />
            </div>
          )}
        </div>
        <div className="hidden items-center gap-x-2 px-20 py-2 rounded-md">
          <Form {...form}>
            <form className="grid gap-4">
              <FormField
                control={form.control}
                name="schoolCode"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSchoolCode(value);
                      }}
                      defaultValue={field.value}
                      disabled={true}
                    >
                      <FormControl>
                        <SelectTrigger className="text-light-white">
                          <SelectValue placeholder="Select another school" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CSYP3141">
                          South Yarra Primary
                        </SelectItem>
                        <SelectItem value="1234">Test</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {categoryName === "Discover" && (
          <div className="">
            <button
              onClick={toggleDropdown}
              className="flex gap-x-2 items-center rounded-md border-[1px] border-light-white-400 px-2 xl:px-8 py-[4px] bg-light-white shadow-sm cursor-pointer"
            >
              <Icons.backpack className="text-dark-purple" size={20} />
              <h1 className="text-dark-purple text-md font-semibold">
                Category
              </h1>
            </button>
            {isDropdownOpen && (
              <div className="bg-light-white px-3 shadow-md rounded-md mt-2 absolute z-10">
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageNavbar;
