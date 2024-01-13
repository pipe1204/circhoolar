import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import CommentInput from "./CommentInput";
import { Question } from "@/types/Types";
import useCreateAndDeleteComment from "@/hooks/useCreateComment";
import { useCommenterIdentityStore } from "@/store/store";
import { set } from "zod";
import CommentItem from "./CommentItem";
import useFetchComments from "@/hooks/useFetchComments";
import useFormatedDate from "@/hooks/useFormatedDate";

interface CommentsProps {
  question: Question;
}

const Comments = ({ question }: CommentsProps) => {
  const commenterIdentity = useCommenterIdentityStore(
    (state) => state.commenterIdentity
  );
  const setCommenterIdentity = useCommenterIdentityStore(
    (state) => state.setCommenterIdentity
  );
  const [commentText, setCommentText] = React.useState("");
  const { onCreateComment } = useCreateAndDeleteComment();

  const handleClickComment = (commentText: string) => {
    if (commentText.length > 0) {
      onCreateComment(commentText, question, setCommentText, commenterIdentity);
    }
  };

  const { comments } = useFetchComments(question?.id);

  useEffect(() => {
    setCommenterIdentity("Name");
  }, [commentText]);

  const onDeleteComment = () => {};

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
            onDeleteComment={onDeleteComment}
            loadingDeleteComment={false}
          />
        ))}
      </Card>
    </section>
  );
};

export default Comments;
