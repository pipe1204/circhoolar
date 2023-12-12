import React from "react";
import { Button } from "../ui/Button";
import { Icons } from "../Icons";
import useCreateOrNavigateChat from "@/hooks/useCreateOrNavigateChat";

interface ChatButtonProps {
  itemId: string | undefined;
  authorId: string | undefined;
  avatar: string | undefined;
}

const ChatButton = ({ itemId, authorId, avatar }: ChatButtonProps) => {
  const { createOrNavigateToChat, loading } = useCreateOrNavigateChat();

  const handleChatButtonClick = () => {
    if (itemId && authorId && avatar) {
      createOrNavigateToChat(itemId, authorId, avatar);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Button
        variant={"secondary"}
        onClick={handleChatButtonClick}
        className="w-4/5"
      >
        <Icons.message className="text-light-white mr-2" size={18} />
        {loading ? "Loading..." : "Ask a question"}
      </Button>
    </div>
  );
};

export default ChatButton;
