"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import { homepageCardsColumn2 } from "@/constants";
import React from "react";
import Masonry from "react-masonry-css";
import { getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { useSession } from "next-auth/react";
import { userRef } from "@/lib/converters/User";
import { useSchoolCodeStore, useUserNameStore } from "@/store/store";

const page = () => {
  const code = useSchoolCodeStore((state) => state.schoolCode);
  const setUserName = useUserNameStore((state) => state.setUserName);

  const [validCode, setValidCode] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState("");
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
      console.log("Document data:", docSnapshot.data());
      setValidCode(true);
      setUserName(name);

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
      {code !== undefined || null ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {homepageCardsColumn2.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatarImage={card.avatarImage}
                value={card.value}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
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
