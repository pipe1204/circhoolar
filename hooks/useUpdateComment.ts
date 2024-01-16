import { singleCommentRef } from "@/lib/converters/Comments";
import { serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

const useUpdateComment = () => {
  const { data: session } = useSession();
  const updateComment = async (
    commentId: string,
    newText: string,
    newIdentity: string
  ) => {
    const commentDocRef = singleCommentRef(commentId);
    try {
      await updateDoc(commentDocRef, {
        text: newText,
        commenterIdentity:
          newIdentity === "Name" ? session?.user?.name : "Anonymous",
        updatedAt: serverTimestamp(),
      });
      console.log("Comment updated successfully");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return { updateComment };
};

export default useUpdateComment;
