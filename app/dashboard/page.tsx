"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import { homepageCardsColumn2 } from "@/constants";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  getDoc,
  updateDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import {
  useSchoolCodeStore,
  useSchoolNameStore,
  useUserNameStore,
} from "@/store/store";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";

const page = () => {
  const code = useSchoolCodeStore((state) => state.schoolCode);
  const setUserName = useUserNameStore((state) => state.setUserName);
  const schoolName = useSchoolNameStore((state) => state.schoolName);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);

  const [validCode, setValidCode] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    if (schoolName) {
      const postsQuery = query(postRef, where("schoolCode", "==", schoolName));

      const unsubscribe = onSnapshot(
        postsQuery,
        (querySnapshot) => {
          const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
          setPosts(fetchedPosts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );

      return () => unsubscribe(); // Clean up the listener when the component unmounts
    }
  }, [schoolName]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
  };

  const itemCondition = ({ condition }: { condition: string }) => {
    let conditionColor;
    switch (condition) {
      case "Great condition":
        conditionColor = "green";
        break;
      case "Good condition":
        conditionColor = "blue";
        break;
      case "Fair condition":
        conditionColor = "orange";
        break;
      default:
        conditionColor = "white";
    }

    return conditionColor;
  };

  const { data: session } = useSession();

  const handleCheckCode = async (code: string, name: string) => {
    if (session?.user?.id) {
      await checkCode(code, session.user.id, name);
    } else {
      console.log("User is not logged in.");
    }
  };

  const checkCode = async (code: string, userId: string, name: string) => {
    const docRef = codeRef(code);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setValidCode(true);
      setUserName(name);
      setSchoolName(code);

      const userDocRef = userRef(userId);
      await updateDoc(userDocRef, { schoolCode: code, name: name });

      // Create initial documents in the subcollections
      const savedItemsRef = doc(userDocRef, "savedItems", "initial");
      const soldItemsRef = doc(userDocRef, "soldItems", "initial");

      await setDoc(savedItemsRef, { initialized: true });
      await setDoc(soldItemsRef, { initialized: true });
    } else {
      console.log("No such document!");
      setValidCode(false);
      setErrorCode("Wrong code. Please try again.");
    }
  };

  return (
    <section className="p-2">
      {code !== undefined || null ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <div key={post.id}>
              <CardItem
                id={post.id}
                author={post.author}
                title={post.title}
                description={post.description}
                image={post.images[0]}
                avatar={post.avatar}
                price={post.price}
                sellingmethod={post.sellingmethod}
                conditionColor={itemCondition({ condition: post.condition })}
                condition={post.condition}
              />
            </div>
          ))}
        </Masonry>
      ) : (
        <div className="w-full xl:w-3/4 mx-auto mt-20">
          <div className="w-full xl:w-1/2 mx-auto">
            <h1 className="text-2xl text-center font-semibold mb-4 text-dark-purple">
              Please enter your full name and school code below to get started
            </h1>
          </div>
          <div className="w-3/4 xl:w-1/3 mx-auto">
            <SchoolCodeForm
              checkCode={handleCheckCode}
              errorMessage={errorCode}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
