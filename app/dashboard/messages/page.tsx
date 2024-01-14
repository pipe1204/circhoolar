"use client";

import React from "react";
import ChatList from "@/components/user/ChatList";

const page = () => {
  return (
    <section className="h-full w-full flex rounded-md mx-auto pb-28 xl:pb-10">
      <ChatList />
    </section>
  );
};

export default page;
