import { Comment } from "@/types/Types";
import React from "react";

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: string) => void;
  loadingDeleteComment: boolean;
}

const CommentItem = ({
  comment,
  onDeleteComment,
  loadingDeleteComment,
}: CommentItemProps) => {
  return <div>Item</div>;
};

export default CommentItem;
