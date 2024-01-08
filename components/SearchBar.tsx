import React from "react";
import { Icons } from "./Icons";
import { Card } from "./ui/Card";
import { Separator } from "./ui/separator";

const SearchBar = () => {
  return (
    <section>
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-full rounded-md border border-input bg-light-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <Icons.search className="mr-2 text-sm " />
          <input
            placeholder="Search questions"
            className="w-full px-3 py-2 rounded-md bg-light-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div>
        <Card className="bg-light-white border border-gray-50 shadow-sm rounded-md p-4 mt-2">
          <h1 className=" text-dark font-bold text-lg">
            This is a very very very long long long long question question
          </h1>
          <Separator className="text-dark my-2" />
          <p className="text-sm text-dark font-normal">
            This is a very long long long long answer answer long long long long
            answer answer
          </p>
        </Card>
      </div>
    </section>
  );
};

export default SearchBar;
