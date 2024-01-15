import { signOut, useSession } from "next-auth/react";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const useDeleteUserAccount = () => {
  const { data: session } = useSession();
  const deleteUserSubcollections = async (userId: string) => {
    // Delete savedItems
    const savedItemsRef = collection(doc(db, "users", userId), "savedItems");
    const savedItemsSnapshot = await getDocs(savedItemsRef);
    savedItemsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Delete soldItems
    const soldItemsRef = collection(doc(db, "users", userId), "soldItems");
    const soldItemsSnapshot = await getDocs(soldItemsRef);
    soldItemsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  const deleteUserAccounts = async (userId: string) => {
    const accountsQuery = query(
      collection(db, "accounts"),
      where("userId", "==", userId)
    );
    const accountsSnapshot = await getDocs(accountsQuery);
    for (const doc of accountsSnapshot.docs) {
      await deleteDoc(doc.ref);
    }
  };

  const deleteUserPosts = async (userId: string) => {
    const postsQuery = query(
      collection(db, "posts"),
      where("authorId", "==", userId)
    );
    const postsSnapshot = await getDocs(postsQuery);
    postsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  const deleteUserChats = async (userId: string) => {
    const chatsRef = collection(db, "chats");
    const chatsSnapshot = await getDocs(chatsRef);
    for (const chatDoc of chatsSnapshot.docs) {
      const chatId = chatDoc.id;
      const chatParticipants = chatId.split("-");

      if (chatParticipants.includes(userId)) {
        const messagesRef = collection(db, "chats", chatId, "messages");
        const messagesSnapshot = await getDocs(messagesRef);
        for (const messageDoc of messagesSnapshot.docs) {
          await deleteDoc(messageDoc.ref);
        }

        await deleteDoc(chatDoc.ref);
      }
    }
  };

  //Delete user questions
  const deleteUserQuestions = async (userId: string) => {
    const questionsRef = collection(db, "questions");
    const questionsSnapshot = await getDocs(questionsRef);
    for (const questionDoc of questionsSnapshot.docs) {
      const questionAuthorId = questionDoc.data().authorId;
      if (questionAuthorId === userId) {
        await deleteDoc(questionDoc.ref);
      }
    }
  };

  const deleteUserComments = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userComments = userSnap.data().comments;

      if (userComments && userComments.length > 0) {
        for (const commentId of userComments) {
          const commentRef = doc(db, "comments", commentId);
          await deleteDoc(commentRef);
          console.log("Comment deleted successfully");
        }
      }
    }
  };

  const handleDeleteUserAccount = async () => {
    if (!session?.user?.id) return;

    try {
      await deleteUserSubcollections(session.user.id);
      await deleteUserPosts(session.user.id);
      await deleteUserChats(session.user.id);
      await deleteUserAccounts(session.user.id);
      await deleteDoc(doc(db, "users", session.user.id));
      await deleteUserQuestions(session.user.id);
      await deleteUserComments(session.user.id);

      console.log("User account and associated data deleted successfully");

      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error deleting user account: ", error);
    }
  };

  return { handleDeleteUserAccount };
};

export default useDeleteUserAccount;
