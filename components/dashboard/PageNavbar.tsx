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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { schoolSchema, topicSchema } from "@/lib/validations/auth";
import {
  useAudienceSelectedStore,
  useCategoriesStore,
  useItemsLocationStore,
  useTopicStore,
} from "@/store/store";
import PostQuestionDialog from "../community/PostQuestionDialog";
import { Button } from "../ui/Button";

const PostItemDialog = dynamic(() => import("../item/PostItemDialog"), {
  ssr: false,
});
type topicInputs = z.infer<typeof topicSchema>;

const PageNavbar = () => {
  const setTopic = useTopicStore((state) => state.setTopic);
  const topic = useTopicStore((state) => state.topic);
  const setCategories = useCategoriesStore((state) => state.setCategories);

  const audienceSelected = useAudienceSelectedStore(
    (state) => state.audienceSelected
  );
  const setAudienceSelected = useAudienceSelectedStore(
    (state) => state.setAudienceSelected
  );

  const setItemsLocation = useItemsLocationStore(
    (state) => state.setItemsLocation
  );
  const itemsLocation = useItemsLocationStore((state) => state.itemsLocation);

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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light-white flex justify-between items-center border border-light-white-500 shadow-md w-full h-16">
      <div className="flex justify-between items-center mx-6 xl:mx-10 w-full">
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
        <div className="hidden xl:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-4">
                <Icons.compass className="mr-4" />
                Navigate
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Navigate</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={itemsLocation || undefined}
                onValueChange={setItemsLocation}
              >
                <DropdownMenuRadioItem value="Public">
                  All schools
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Private">
                  My school community
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Own">
                  My items
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden xl:flex">
          <button
            onClick={toggleDropdown}
            className="flex gap-x-2 items-center rounded-md border-[1px] border-light-white-400 px-2 xl:px-8 py-[4px] bg-light-white shadow-sm cursor-pointer"
          >
            <Icons.store className="text-dark-purple" size={20} />
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
        </div>

        {categoryName === "discover" && (
          <div className="w-full xl:w-0 xl:hidden flex flex-row justify-between items-center mx-6 xl:mx-0">
            <div className="flex xl:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="p-4">
                    <Icons.compass />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={itemsLocation || undefined}
                    onValueChange={setItemsLocation}
                  >
                    <DropdownMenuRadioItem value="Public">
                      All schools
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Private">
                      My school community
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Own">
                      My items
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex xl:hidden">
              <button
                onClick={toggleDropdown}
                className="flex items-center rounded-md border-[1px] border-light-white-400 px-4 py-2 xl:py-0 xl:px-8 bg-light-white shadow-sm cursor-pointer"
              >
                <Icons.store className="text-dark-purple" size={25} />
                <h1 className="text-dark-purple text-md font-semibold"></h1>
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
            </div>
            <div className="flex xl:hidden xl:ml-0">
              <PostItemDialog />
            </div>
          </div>
        )}
        {categoryName === "community" && (
          <div className="w-full xl:w-0 xl:hidden flex flex-row justify-between items-center mx-6 xl:mx-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-4">
                  <Icons.compass />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={audienceSelected || undefined}
                  onValueChange={setAudienceSelected}
                >
                  <DropdownMenuRadioItem value="Public">
                    All schools
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Private">
                    My school community
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Own">
                    My posts
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
                            <SelectValue placeholder={topic} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="All topics">All topics</SelectItem>
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
