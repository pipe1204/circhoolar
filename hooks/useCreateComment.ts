import { number } from "zod";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Question } from "@/types/Types";
import { questionRef } from "@/lib/converters/Questions";
import { commentRef } from "@/lib/converters/Comments";

const useCreateAndDeleteComment = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

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
      await updateDoc(docRef, {
        numberOfComments: docSnap.data().numberOfComments + 1,
      });
    }
    setLoading(false);
    setCommentText("");
  };

  return { onCreateComment, loading };
};

export default useCreateAndDeleteComment;
