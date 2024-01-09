import React from "react";
import { Icons } from "./Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Separator } from "./ui/separator";

const SearchBar = () => {
  return (
    <section>
      <div className="flex flex-row items-center">
        <div className="xl:fixed w-full xl:w-[29%] xl:mt-8 flex h-10 rounded-md border border-input bg-light-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <Icons.search className="mr-2 text-sm " />
          <input
            placeholder="Search previous questions"
            className="w-full px-3 py-2 rounded-md bg-light-white  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div>
        <Card className="bg-light-white border border-gray-50 shadow-sm rounded-md p-4 mt-2 xl:mt-10 hover:shadow-md hover:border-paragraph-color cursor-pointer">
          <CardHeader>
            <CardTitle>
              This is a very very very long long long long question question
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <CardDescription>
              This is a very long long long long answer answer long long long
              long answer answer
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchBar;
