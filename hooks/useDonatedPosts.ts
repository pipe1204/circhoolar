import { useEffect, useState } from "react";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";
import { query, where, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";

const useDonatedPosts = () => {
    const [soldItems, setSoldItems] = useState<Post[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      const soldItemsQuery = query(
        postRef,
        where("authorId", "==", session.user.id),
        where("isSold", "==", true)
      );

      const unsubscribe = onSnapshot(soldItemsQuery, (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => {
          return { postId: doc.id, ...(doc.data() as Post) };
        });
        setSoldItems(items);
      });

      return () => unsubscribe();
    }
  }, [session?.user?.id]);
  return { soldItems };
}

export default useDonatedPosts;
