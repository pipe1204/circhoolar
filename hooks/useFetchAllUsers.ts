import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDocs } from "firebase/firestore";
import { usersRef } from "@/lib/converters/User";
import { User } from "@/types/Types";

const useFetchAllUsers = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(usersRef);
        const usersList = querySnapshot.docs.map((doc) => doc.data() as User);
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchAllUsers();
    }
  }, [session?.user?.id]);

  return { users, loading, error };
};

export default useFetchAllUsers;
