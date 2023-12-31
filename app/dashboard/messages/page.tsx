"use client";

import React from "react";
import ChatList from "@/components/user/ChatList";

const page = () => {
  return (
    <section className="h-full w-full flex rounded-md mx-auto">
      <ChatList />
    </section>
  );
};

export default page;
