import { authOptions } from "@/auth";
import { getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";

import React from "react";

const ChatList = () => {
  const { data: session } = useSession();

  //   const chatsSnapshot = await getDocs(chatMembersCollectionGroupRef(session?.user?.id))
  return <div className="col-span-2 bg-white rounded-md">ChatList</div>;
};

export default ChatList;
