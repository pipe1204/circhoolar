"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import { usePathname } from "next/navigation";
import { topics } from "@/constants";
import NavLinks from "../dashboard/NavLinks";
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
import { useCategoriesStore, useSelectedSchoolStore } from "@/store/store";
import { Button } from "../ui/Button";

const PostItemDialog = dynamic(() => import("../item/PostItemDialog"), {
  ssr: false,
});
type topicInputs = z.infer<typeof topicSchema>;

const CommunityNavbar = () => {
  const setSelectedSchool = useSelectedSchoolStore(
    (state) => state.setSelectedSchool
  );

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
  const [topic, setTopic] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTopicChange = (category: string) => {
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
          lastSegment === "community" ? "justify-start" : "justify-start"
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
        <div>
          {pathname === "/dashboard/community" && (
            <div className="hidden xl:flex">
              <Button>Ask a question</Button>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-2 ml-4 xl:ml-0 mt-4 xl:mt-0 mb-4 xl:mb-0 px-2 py-2 rounded-md">
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
                          return <SelectItem value={topic}>{topic}</SelectItem>;
                        })}
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
    </nav>
  );
};

export default CommunityNavbar;
