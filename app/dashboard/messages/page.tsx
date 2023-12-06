"use client";

import React from "react";
import ChatPage from "./[chatId]/page";
import ChatList from "@/components/user/ChatList";

const page = () => {
  return (
    <section className="h-full grid grid-cols-6 gap-x-4 rounded-md">
      <ChatList />
      <ChatPage />
    </section>
  );
};

export default page;
