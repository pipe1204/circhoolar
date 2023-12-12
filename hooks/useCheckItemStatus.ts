import { set } from 'zod';
import { postRef } from '@/lib/converters/Post';
import { userRef } from '@/lib/converters/User';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { use, useEffect, useState } from 'react';
import React from 'react';

const useCheckItemStatus = (id: string, isAlreadySaved: boolean) => {
    const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(isAlreadySaved);
  const [isAlreadySold, setIsAlreadySold] = useState<boolean | undefined>(
    false
  );

    useEffect(() => {
        const checkSavedStatus = async () => {
          if (session?.user?.id) {
            const userID = session.user.id;
            const savedItemRef = doc(userRef(userID), "savedItems", id);
            const docSnap = await getDoc(savedItemRef);
            setIsSaved(docSnap.exists());
          }
        };

        const checkSoldStatus = async () => {
            if (session?.user?.id) {
              const docRef = doc(postRef, id);
              const docSnap = await getDoc(docRef);
              setIsAlreadySold(docSnap.data()?.isSold);
            }
          };
        checkSavedStatus();
        checkSoldStatus();
      }, [id, session?.user?.id]);
      return { isSaved, isAlreadySold, setIsSaved, setIsAlreadySold };
}

export default useCheckItemStatus