import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Separator } from "../ui/separator";

const Question = () => {
  return (
    <Card className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md p-4 mt-2">
      <CardDescription className="text-right">
        Posted by Anonymous 3 days ago
      </CardDescription>
      <div className="cursor-pointer">
        <CardHeader>
          <CardTitle>This is a question</CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <CardDescription>
            This is the description or the answer to the questions people
            usually ask on the community page
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex flex-row gap-x-4">
          <p>likes</p>
          <p>Replies</p>
          <p>Save</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Question;
