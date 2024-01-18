import { number, set } from "zod";
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
import {
  useCommentCountStore,
  useUnreadNotificationsStore,
} from "@/store/store";
import { userRef } from "@/lib/converters/User";

const useCreateAndDeleteComment = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const setCommentCount = useCommentCountStore(
    (state) => state.setCommentCount
  );
  const setUnreadNotifications = useUnreadNotificationsStore(
    (state) => state.setUnreadNotifications
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
        commentedBy: arrayUnion(
          commenterIdentity === "Name" ? session.user.name : "Anonymous"
        ),
      });
      setCommentCount(currentComments);
    }

    //Add notification to author of question
    const docRefUser = userRef(question.authorId);
    await updateDoc(docRefUser, {
      notifications: arrayUnion(
        `${
          commenterIdentity === "Name" ? session.user.name : "Anonymous"
        } commented on your post ${question.title}`
      ),
      unreadNotifications: true,
    });
    setLoading(false);
    setCommentText("");
  };

  const onDeleteComment = async (comment: Comment) => {
    if (session?.user?.id) {
      try {
        const commentDocRef = doc(db, "comments", comment.id);
        await deleteDoc(commentDocRef);
        console.log("Comment deleted successfully");
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
      const docRef = doc(questionRef, comment.questionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentComments = docSnap.data().numberOfComments - 1;
        await updateDoc(docRef, {
          numberOfComments: currentComments,
          comments: arrayRemove(comment.commentId),
          commentedBy: arrayRemove(comment.commenterIdentity),
        });
        setCommentCount(currentComments);

        //Remove notification from author of question
        const docRefUser = userRef(docSnap.data().authorId);
        await updateDoc(docRefUser, {
          notifications: arrayRemove(
            `${comment.commenterIdentity} commented on your post ${comment.questionTitle}`
          ),
          unreadNotifications: true,
        });
        const docSnapUser = await getDoc(docRefUser);
        if (docSnapUser.exists()) {
          if (docSnapUser.data().notifications.length === 0) {
            await updateDoc(docRefUser, {
              unreadNotifications: false,
            });
          }
        }
      }
    }
  };

  return { onCreateComment, onDeleteComment, loading };
};

export default useCreateAndDeleteComment;
