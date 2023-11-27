"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import { CardTitle } from "../ui/Card";
import { usePathname } from "next/navigation";
import { categoryFilters } from "@/constants";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { Button } from "../ui/Button";

const PageNavbar = () => {
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
      case "analytics":
        icon = <Icons.chart className="text-dark-purple" />;
        categoryName = "Analytics";
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
        icon = <Icons.star className="text-dark-purple" />;
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
            <div className="flex flex-row justify-between items-center my-6 px-4 gap-x-6">
              <Button variant={"outline"} className="text-light-white">
                Add an Item
              </Button>
            </div>
            <div className="bg-lightest-purple flex flex-row items-center gap-x-2 ml-2 xl:ml-0 mb-4 px-4 py-2 rounded-md">
              <h1 className="text-dark-purple font-semibold text-md text-center">
                South Yarra Primary
              </h1>
              <Icons.chevronDown
                className="text-dark-purple cursor-pointer"
                size={18}
              />
            </div>
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
        <div className="bg-lightest-purple hidden xl:flex items-center gap-x-2 px-20 py-2 rounded-md">
          <h1 className="text-dark-purple font-semibold text-md text-center">
            South Yarra Primary
          </h1>
          <Icons.chevronDown
            className="text-dark-purple cursor-pointer"
            size={18}
          />
        </div>
        <div>
          <Button
            variant={"outlineLight"}
            className="hidden xl:flex hover:text-light-white"
          >
            Add an Item
          </Button>
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
