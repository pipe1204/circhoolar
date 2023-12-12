import { useEffect, useState } from "react";
import { Post } from "@/types/Types";
import { collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";

interface SavedItem {
    docId: string;
    postData: Post;
  }

const useSavedPosts = () => {
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSavedItems = async () => {
      if (session?.user?.id) {
        const savedItemsRef = collection(
          userRef(session.user.id),
          "savedItems"
        );
        const querySnapshot = await getDocs(savedItemsRef);
        const items = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          postData: doc.data() as Post,
        }));
        setSavedItems(items);
      }
    };
    fetchSavedItems();
  }, [session?.user?.id]);

  const removeItemFromState = (itemId: string) => {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.docId !== itemId)
    );
  };
  return { savedItems, removeItemFromState };
}

export default useSavedPosts;
