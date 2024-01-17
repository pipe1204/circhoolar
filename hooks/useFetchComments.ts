import { useState, useEffect } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { Comment } from "@/types/Types";
import { commentRef, sortedCommentsRef } from "@/lib/converters/Comments";
import { useCommentCountStore, useLikeCommentCountStore } from "@/store/store";
import { singleCommentRef } from "@/lib/converters/Comments";
import { db } from "@/firebase";

const useFetchComments = (questionId?: string) => {
  const commentCount = useCommentCountStore((state) => state.commentCount);
  const likeCommentCount = useLikeCommentCountStore(
    (state) => state.likeCommentCount
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [userComments, setUserComments] = useState<Comment[]>([]);

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

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const userCommentsRef = collection(db, "comments");
        const userCommentsSnapshot = await getDocs(userCommentsRef);
        const userComments = userCommentsSnapshot.docs.map(
          (doc) => doc.data() as Comment
        );
        setUserComments(userComments);
      } catch (error) {
        console.log(
          "There was an error trying to fetch user comments: ",
          error
        );
      }
    };

    fetchUserComments();
  }, []);

  const fetchSingleComment = async (commentId: string) => {
    try {
      const commentInputRef = singleCommentRef(commentId);
      const docSnap = await getDoc(commentInputRef);

      if (docSnap.exists()) {
        const comment = docSnap.data();
        return comment;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (err) {
      console.error("Error fetching comment:", err);
    }
  };

  return {
    comments,
    userComments,
    fetchLoading,
    fetchSingleComment,
  };
};

export default useFetchComments;
