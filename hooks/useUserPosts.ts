import { useEffect, useState } from "react";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";
import { query, where, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";

const useUserPosts = () => {
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (session?.user?.id) {
          const postsQuery = query(
            postRef,
            where("authorId", "==", session?.user?.id)
          );
    
          const unsubscribe = onSnapshot(
            postsQuery,
            (querySnapshot) => {
              const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
              setMyPosts(fetchedPosts);
            },
            (error) => {
              console.error("Error fetching posts:", error);
            }
          );
    
          return () => unsubscribe(); // Clean up the listener when the component unmounts
        }
      }, []);
      return { myPosts };
}

export default useUserPosts;