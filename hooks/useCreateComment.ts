import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Question } from "@/types/Types";
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
      authorId: session.user.id,
      author: session.user.name,
      commenterIdentity:
        commenterIdentity === "Name" ? session.user.name : "Anonymous",
      questionId: question.id,
      questionTitle: question.title,
      text: commentText,
      createdAt: serverTimestamp(),
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
      await updateDoc(docRef, { numberOfComments: currentComments });
      setCommentCount(currentComments);
    }
    setLoading(false);
    setCommentText("");
  };

  return { onCreateComment, loading };
};

export default useCreateAndDeleteComment;
