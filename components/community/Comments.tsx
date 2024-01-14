import React from "react";
import { Card } from "../ui/Card";
import CommentInput from "./CommentInput";
import { Question } from "@/types/Types";
import useCreateAndDeleteComment from "@/hooks/useCreateComment";
import { useCommenterIdentityStore } from "@/store/store";
import CommentItem from "./CommentItem";
import useFetchComments from "@/hooks/useFetchComments";

interface CommentsProps {
  question: Question;
}

const Comments = ({ question }: CommentsProps) => {
  const commenterIdentity = useCommenterIdentityStore(
    (state) => state.commenterIdentity
  );
  const [commentText, setCommentText] = React.useState("");
  const { onCreateComment, onDeleteComment } = useCreateAndDeleteComment();

  const handleClickComment = (commentText: string) => {
    if (commentText.length > 0) {
      onCreateComment(commentText, question, setCommentText, commenterIdentity);
    }
  };

  const handleDelete = (commentId: string) => {
    onDeleteComment(commentId, question);
  };

  const { comments } = useFetchComments(question?.id);

  return (
    <section>
      <Card className="bg-light-white border border-gray-50 shadow-sm rounded-md p-4 mt-2 mx-auto">
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          handleClickComment={handleClickComment}
        />
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            handleDelete={handleDelete}
          />
        ))}
      </Card>
    </section>
  );
};

export default Comments;
