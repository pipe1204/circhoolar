import React from "react";
import { Input } from "./ui/Input";
import { Icons } from "./Icons";

const SearchBar = () => {
  return (
    <div className="flex flex-row items-center">
      <Icons.search className="mr-2" />
      <Input placeholder="Search answers" />
    </div>
  );
};

export default SearchBar;
