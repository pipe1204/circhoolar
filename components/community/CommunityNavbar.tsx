"use client";
import React from "react";
import { Icons } from "../Icons";
import { usePathname } from "next/navigation";
import { topics } from "@/constants";
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
import { useAudienceSelectedStore, useTopicStore } from "@/store/store";
import PostQuestionDialog from "./PostQuestionDialog";
import { Button } from "../ui/Button";

type topicInputs = z.infer<typeof topicSchema>;

const CommunityNavbar = () => {
  const setTopic = useTopicStore((state) => state.setTopic);
  const topic = useTopicStore((state) => state.topic);
  const audienceSelected = useAudienceSelectedStore(
    (state) => state.audienceSelected
  );
  const setAudienceSelected = useAudienceSelectedStore(
    (state) => state.setAudienceSelected
  );

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
              <PostQuestionDialog />
            </div>
          )}
        </div>
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
        </div>
      </div>
    </nav>
  );
};

export default CommunityNavbar;
