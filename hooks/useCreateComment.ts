import { number } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Comment, Question } from "@/types/Types";
import { questionRef } from "@/lib/converters/Questions";
import { commentRef } from "@/lib/converters/Comments";
import { useCommentCountStore } from "@/store/store";

const useCreateAndDeleteComment = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const setCommentCount = useCommentCountStore(
    (state) => state.setCommentCount
  );

  const onCreateComment = async (
    commentText: string,
    question: Question,
    setCommentText: (value: string) => void,
    commenterIdentity: string | null
  ) => {
    if (!session?.user?.id || !commentText) return;

    const randomNumber = Math.floor(Math.random() * 10000);
    const commentId = session?.user.id + "-" + question.id + "-" + randomNumber;
    const newComment = {
      id: commentId,
      commentId: commentId,
      authorId: session.user.id,
      author: session.user.name,
      commenterIdentity:
        commenterIdentity === "Name" ? session.user.name : "Anonymous",
      questionId: question.id,
      questionTitle: question.title,
      text: commentText,
      createdAt: serverTimestamp(),
      numberOfLikes: 0,
      likedBy: [] as string[],
    };
    try {
      const docRef = await addDoc(commentRef, newComment);
      console.log("Comment created successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error creating post:", error);
    }

    const docRef = doc(questionRef, question.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentComments = docSnap.data().numberOfComments + 1;
      await updateDoc(docRef, {
        numberOfComments: currentComments,
        comments: arrayUnion(commentId),
      });
      setCommentCount(currentComments);
    }
    setLoading(false);
    setCommentText("");
  };

  const onDeleteComment = async (comment: Comment, question: Question) => {
    if (session?.user?.id) {
      try {
        const commentDocRef = doc(db, "comments", comment.id);
        await deleteDoc(commentDocRef);
        console.log("Comment deleted successfully");
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
      const docRef = doc(questionRef, question.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentComments = docSnap.data().numberOfComments - 1;
        await updateDoc(docRef, {
          numberOfComments: currentComments,
          comments: arrayRemove(comment.commentId),
        });
        setCommentCount(currentComments);
      }
    }
  };

  return { onCreateComment, onDeleteComment, loading };
};

export default useCreateAndDeleteComment;
