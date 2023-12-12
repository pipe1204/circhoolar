import { useEffect, useState } from "react";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";
import { query, where, onSnapshot } from "firebase/firestore";

const useMainPosts = (
  selectedSchool: string | null,
  categories: string[] | null
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    let postsQuery;

    if (selectedSchool === "All" || !selectedSchool) {
      postsQuery = query(postRef, where("isSold", "==", false));
    } else {
      postsQuery = query(
        postRef,
        where("schoolCode", "==", selectedSchool),
        where("isSold", "==", false)
      );
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
  }, [selectedSchool, categories]);

  return { posts, loading, error };
};

export default useMainPosts;
