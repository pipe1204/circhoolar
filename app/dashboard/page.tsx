"use client";

import { SchoolCodeForm } from "@/components/SchoolCodeForm";
import CardItem from "@/components/item/CardItem";
import { homepageCardsColumn2 } from "@/constants";
import React from "react";
import Masonry from "react-masonry-css";
import * as firebase from "firebase-admin";

const page = () => {
  const [validCode, setValidCode] = React.useState(false);
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

  const checkCode = async (code: string) => {
    // console.log(code);
    // const referralRef = firestore().collection("referralCodes").doc(code);
    // const docSnap = await referralRef.get();
    // if (docSnap.exists) {
    //   setValidCode(true);
    // } else {
    //   setValidCode(false);
    // }
  };

  const code = false;
  return (
    <section className="p-2">
      {validCode ? (
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
          <div className="w-full">
            <h1 className="text-2xl text-center font-semibold mb-4 text-dark-purple">
              Please enter your school code below to get started
            </h1>
          </div>
          <div className="w-3/4 xl:w-1/3 mx-auto">
            <SchoolCodeForm checkCode={checkCode} />
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
