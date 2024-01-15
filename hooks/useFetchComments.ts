import { useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { Comment } from "@/types/Types";
import { sortedCommentsRef } from "@/lib/converters/Comments";
import { useCommentCountStore, useLikeCommentCountStore } from "@/store/store";

const useFetchComments = (questionId: string) => {
  const commentCount = useCommentCountStore((state) => state.commentCount);
  const likeCommentCount = useLikeCommentCountStore(
    (state) => state.likeCommentCount
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setFetchLoading(true);
      if (!questionId) return;
      try {
        // Update the query to order by timestamp
        const q = sortedCommentsRef(questionId);
        const commentsSnapshot = await getDocs(q);
        const fetchedComments = commentsSnapshot.docs.map(
          (doc) => doc.data() as Comment
        );
        setComments(fetchedComments);
        setFetchLoading(false);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [questionId, commentCount, likeCommentCount]);

  return { comments, fetchLoading };
};

export default useFetchComments;
