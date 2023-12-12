import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { postRef } from '@/lib/converters/Post';
import { Post } from '@/types/Types';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

const usePostDetails = (chatId: string) => {
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [isSold, setIsSold] = useState<boolean | undefined>(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (session?.user?.id) {
        const itemId = chatId.split("-").pop();
        const docRef = doc(postRef, itemId);
        const docSnap = await getDoc(docRef);
        setPost(docSnap.data() as Post);
        setIsSold(docSnap.data()?.isSold);
      }
    };

    fetchPostDetails();
  }, [chatId, session?.user?.id]);

  const toggleSoldStatus = async () => {
    if (post?.id) {
      const docRef = doc(postRef, post.id);
      await updateDoc(docRef, { isSold: !isSold });
      setIsSold(!isSold);
    }
  };

  return { post, isSold, toggleSoldStatus };
};

export default usePostDetails;