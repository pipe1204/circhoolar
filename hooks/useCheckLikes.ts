import { useState } from "react";
import {
  useLikeCommentCountStore,
  useLikeQuestionCountStore,
} from "@/store/store";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Comment, Question } from "@/types/Types";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import { userRef } from "@/lib/converters/User";

const useCheckLikes = (question?: Question, comment?: Comment) => {
  const { data: session } = useSession();

  const [isQuestionLiked, setIsQuestionLiked] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  const setLikeQuestionCount = useLikeQuestionCountStore(
    (state) => state.setLikeQuestionCount
  );
  const setLikeCommentCount = useLikeCommentCountStore(
    (state) => state.setLikeCommentCount
  );

  const checkIfQuestionLiked = async () => {
    if (session?.user?.id) {
      const docRef = doc(db, "users", session.user.id);
      const docSnap = await getDoc(docRef);

      if (
        docSnap.exists() &&
        docSnap.data().likedQuestions?.includes(question?.id)
      ) {
        setIsQuestionLiked(true);
      } else {
        setIsQuestionLiked(false);
      }
    }
  };

  const checkIfCommentLiked = async () => {
    if (session?.user?.id) {
      const docRef = doc(db, "users", session.user.id);
      const docSnap = await getDoc(docRef);

      if (
        docSnap.exists() &&
        docSnap.data().likedComments?.includes(comment?.id)
      ) {
        setIsCommentLiked(true);
      } else {
        setIsCommentLiked(false);
      }
    }
  };

  const handleQuestionLikeCheck = async (questionId: string) => {
    if (session?.user?.id) {
      const docRef = doc(db, "users", session?.user?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        //Check if question is already liked and remove it from array
        if (userData?.likedQuestions?.includes(questionId)) {
          await updateDoc(docRef, {
            likedQuestions: arrayRemove(questionId),
          });
          setIsQuestionLiked(false);
          const questionRef = doc(db, "questions", questionId);
          const docSnap = await getDoc(questionRef);
          if (docSnap.exists()) {
            if (docSnap.data()?.numberOfLikes === 0) {
              setLikeQuestionCount(0);
            } else {
              const questionData = docSnap.data();
              const currentLikes = questionData?.numberOfLikes - 1;

              await updateDoc(questionRef, {
                numberOfLikes: currentLikes,
                likedBy: arrayRemove(session?.user?.name),
              });
              setLikeQuestionCount(currentLikes);
              console.log("Question removed from array");
            }
          }

          //Remove notification from author of question
          const docRefUser = userRef(docSnap.data()?.authorId);
          if (docSnap.data()?.authorId !== session.user.id) {
            await updateDoc(docRefUser, {
              notifications: arrayRemove({
                id: `${questionId}-${docSnap.data()?.authorId}-${
                  session.user.id
                }`,
                text: `${session.user.name} liked your post - ${question?.title}`,
                read: false,
              }),
            });
          }
        } else {
          await updateDoc(docRef, {
            likedQuestions: arrayUnion(questionId),
          });
          setIsQuestionLiked(true);
          const questionRef = doc(db, "questions", questionId);
          const docSnap = await getDoc(questionRef);
          if (docSnap.exists()) {
            const questionData = docSnap.data();
            const currentLikes = questionData?.numberOfLikes + 1;

            await updateDoc(questionRef, {
              numberOfLikes: currentLikes,
              likedBy: arrayUnion(session?.user?.name),
            });
            setLikeQuestionCount(currentLikes);
            console.log("Question added to array");
          }

          //Add notification to author of question
          const docRefUser = userRef(docSnap.data()?.authorId);
          if (docSnap.data()?.authorId !== session.user.id) {
            await updateDoc(docRefUser, {
              notifications: arrayUnion({
                id: `${questionId}-${docSnap.data()?.authorId}-${
                  session.user.id
                }`,
                text: `${session.user.name} liked your post - ${question?.title}`,
                read: false,
              }),
            });
          }
        }
      }
    }
  };

  const handleCommentLikeCheck = async (commentId: string) => {
    if (session?.user?.id) {
      const userDocRef = doc(db, "users", session.user.id);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const commentRef = doc(db, "comments", commentId);
        const commentDocSnap = await getDoc(commentRef);

        if (commentDocSnap.exists()) {
          if (commentDocSnap.data()?.numberOfLikes === 0) {
            setLikeCommentCount(0);
          }

          const commentData = commentDocSnap.data();
          let currentLikes = commentData.numberOfLikes;

          if (userData.likedComments?.includes(commentId)) {
            // If comment is already liked, unlike it
            await updateDoc(userDocRef, {
              likedComments: arrayRemove(commentId),
            });
            setIsCommentLiked(false);
            currentLikes--;

            //Remove notification from author of comment
            const docRefUser = userRef(commentData.authorId);
            if (commentData.authorId !== session.user.id) {
              await updateDoc(docRefUser, {
                notifications: arrayRemove({
                  id: `${commentId}-${commentData.authorId}-${session.user.id}`,
                  text: `${session.user.name} liked your comment`,
                  read: false,
                }),
              });
            }
          } else {
            // If comment is not liked, like it
            await updateDoc(userDocRef, {
              likedComments: arrayUnion(commentId),
            });
            setIsCommentLiked(true);
            currentLikes++;

            //Add notification to author of comment
            const docRefUser = userRef(commentData.authorId);
            if (commentData.authorId !== session.user.id) {
              await updateDoc(docRefUser, {
                notifications: arrayUnion({
                  id: `${commentId}-${commentData.authorId}-${session.user.id}`,
                  text: `${session.user.name} liked your comment`,
                  read: false,
                }),
              });
            }
          }

          // Update the comment's like count in Firestore
          await updateDoc(commentRef, {
            numberOfLikes: currentLikes,
            likedBy: userData.likedComments?.includes(commentId)
              ? arrayRemove(session.user.name)
              : arrayUnion(session.user.name),
          });

          // Update local state to reflect the new like count
          setLikeCommentCount(currentLikes);
        }
      }
    }
  };

  return {
    checkIfQuestionLiked,
    checkIfCommentLiked,
    handleQuestionLikeCheck,
    handleCommentLikeCheck,
    isQuestionLiked,
    isCommentLiked,
    setIsCommentLiked,
  };
};

export default useCheckLikes;
