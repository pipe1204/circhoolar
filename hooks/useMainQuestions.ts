import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Question } from "@/types/Types";
import { query, where, onSnapshot } from "firebase/firestore";
import { questionRef } from "@/lib/converters/Questions";
import { useSchoolCodeStore } from "@/store/store";
import { useSession } from "next-auth/react";

const useMainQuestions = (
  topic: string | null,
  audienceSelected: string | null
) => {
  const { data: session } = useSession();
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    let questionQuery;

    if (audienceSelected === "Public") {
      questionQuery = query(
        questionRef,
        where("audience", "==", audienceSelected)
      );
    } else if (audienceSelected === "Own") {
      questionQuery = query(
        questionRef,
        where("author", "==", session?.user?.name)
      );
    } else {
      questionQuery = query(questionRef, where("schoolCode", "==", schoolCode));
    }

    if (topic && topic !== "All topics") {
      questionQuery = query(questionQuery, where("topic", "==", topic));
    }

    const unsubscribe = onSnapshot(
      questionQuery,
      (querySnapshot) => {
        const fetchedQuestions = querySnapshot.docs.map(
          (doc) => doc.data() as Question
        );
        setQuestions(fetchedQuestions);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching questions:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [audienceSelected, topic]);

  return { questions, loading, error };
};

export default useMainQuestions;
