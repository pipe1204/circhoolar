"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import {
  getDoc,
  updateDoc,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import {
  useSchoolCodeStore,
  useSelectedSchoolStore,
  useUserNameStore,
} from "@/store/store";
import { Post } from "@/types/Types";
import { postRef } from "@/lib/converters/Post";

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const selectedSchool = useSelectedSchoolStore(
    (state) => state.selectedSchool
  );
  const setSelectedSchool = useSelectedSchoolStore(
    (state) => state.setSelectedSchool
  );

  const [validCode, setValidCode] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    let postsQuery;

    // Check if schoolCode is 'All' or not set, then fetch all posts
    if (selectedSchool === "All" || !selectedSchool) {
      postsQuery = query(postRef);
    } else {
      // Apply filter when a specific school code is selected
      postsQuery = query(postRef, where("schoolCode", "==", selectedSchool));
    }

    const unsubscribe = onSnapshot(
      postsQuery,
      (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      },
      (error) => {
        console.error("Error fetching posts:", error);
      }
    );

    return () => unsubscribe();
  }, [selectedSchool]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    // 500: 1,
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
    if (!code) {
      console.log("Code is undefined or empty");
      setValidCode(false);
      setErrorCode("Code is required");
      return;
    }

    const docRef = doc(codeRef, code);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setValidCode(true);
      setUserName(name);
      setSchoolCode(code);

      const userDocRef = userRef(userId);
      await updateDoc(userDocRef, { schoolCode: code, name: name });
    } else {
      console.log("No such document!");
      setValidCode(false);
      setErrorCode("Wrong code. Please try again.");
    }
  };

  return (
    <section className="p-2">
      {schoolCode !== null ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <div key={post.id}>
              <CardItem
                id={post.id}
                authorId={post.authorId}
                author={post.author}
                title={post.title}
                description={post.description}
                image={post.images[0]}
                avatar={post.avatar}
                price={post.price}
                sellingmethod={post.sellingmethod}
                condition={post.condition}
                category={post.category}
                isAlreadySaved={false}
                updatingPost={false}
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
