"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import { CardTitle } from "../ui/Card";
import { usePathname } from "next/navigation";
import { categoryFilters } from "@/constants";

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
      case "saved-items":
        icon = <Icons.star className="text-dark-purple" />;
        categoryName = "Saved items";
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

  return (
    <nav className="bg-light-white flex justify-between items-center border border-light-white-500 shadow-md w-full h-16">
      <div className="flex justify-between items-center mx-10 w-full">
        <div className="flex gap-x-2 items-center">
          {icon}
          <CardTitle className="text-dark-purple text-md">
            {categoryName}
          </CardTitle>
        </div>
        {categoryName === "Discover" && (
          <div className="">
            <button
              onClick={toggleDropdown}
              className="flex gap-x-2 items-center rounded-md border-[1px] border-light-white-400 px-8 py-[4px] bg-light-white shadow-sm cursor-pointer"
            >
              <Icons.backpack className="text-dark-purple" size={20} />
              <h1 className="text-dark-purple text-md font-semibold">
                Category
              </h1>
            </button>
            {isDropdownOpen && (
              <div className="bg-light-white px-3 shadow-md rounded-md mt-2 absolute">
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

        <div className="bg-lightest-purple flex items-center gap-x-2 px-8 py-2 rounded-md">
          <h1 className="text-dark-purple font-semibold text-md text-center">
            South Yarra Primary
          </h1>
          <Icons.chevronDown
            className="text-dark-purple cursor-pointer"
            size={18}
          />
        </div>
      </div>
    </nav>
  );
};

export default PageNavbar;
