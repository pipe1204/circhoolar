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
import { Question } from "@/types/Types";
import { Timestamp } from "firebase/firestore";
import { Icons } from "../Icons";
import useFormatedDate from "@/hooks/useFormatedDate";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/Button";

interface QuestionProps {
  question: Question;
}

const Question = ({ question }: QuestionProps) => {
  const timeDifference = useFormatedDate(question.createdAt);
  const { data: session } = useSession();
  const [position, setPosition] = React.useState("bottom");

  return (
    <Card className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md p-4 mt-2">
      {session?.user?.name === question.author ? (
        <div className="flex flex-row gap-x-4 justify-end items-center">
          <CardDescription className="text-right">
            Posted by you {timeDifference}
          </CardDescription>
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size={"icon"}>
                  Edit
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-center">
                  Edit your Question
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-row justify-around">
                  <Button variant="link" size={"icon"} className="text-dark">
                    Edit
                  </Button>
                  <Button variant="link" size={"icon"} className="text-red">
                    Delete
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <CardDescription className="text-right">
          Posted by{" "}
          {question.identity === "Real name" ? question.author : "Anonymous"}{" "}
          {timeDifference}
        </CardDescription>
      )}
      <div className="cursor-pointer">
        <CardHeader className="p-3">
          <CardTitle className="text-background text-xl xl:text-2xl font-semibold">
            {question.title}
          </CardTitle>
        </CardHeader>
        <Separator className="mb-2" />
        <CardContent>
          <CardDescription>{question.description}</CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex flex-row gap-x-8">
          <div className="flex flex-row items-center gap-x-2">
            <Icons.heart className="text-gray-100 cursor-pointer" />
            <CardDescription>Like</CardDescription>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Icons.message className="text-gray-100 cursor-pointer" />
            <CardDescription>Comment</CardDescription>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Question;
