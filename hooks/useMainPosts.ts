import { useEffect, useState } from "react";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";
import { query, where, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useSchoolCodeStore } from "@/store/store";

const useMainPosts = (
  selectedSchool: string | null,
  categories: string[] | null,
  itemsLocation: string | undefined
) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);

  useEffect(() => {
    setLoading(true);
    let postsQuery;

    if (itemsLocation === "Public" || !itemsLocation) {
      postsQuery = query(postRef, where("isSold", "==", false));
    } else if (schoolCode && itemsLocation && itemsLocation === "Private") {
      postsQuery = query(
        postRef,
        where("schoolCode", "==", schoolCode),
        where("isSold", "==", false)
      );
    } else {
      postsQuery = query(postRef, where("author", "==", session?.user?.name));
    }

    if (categories && categories.length > 0) {
      postsQuery = query(postsQuery, where("category", "in", categories));
    }

    const unsubscribe = onSnapshot(
      postsQuery,
      (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map(
          (doc) => doc.data() as Post
        );
        setPosts(fetchedPosts);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching posts:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [itemsLocation, categories]);

  return { posts, loading, error };
};

export default useMainPosts;
