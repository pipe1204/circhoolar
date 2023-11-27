"use client";

import CardItem from "@/components/item/CardItem";
import { homepageCardsColumn2 } from "@/constants";
import React from "react";
import Masonry from "react-masonry-css";

const page = () => {
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
  return (
    <section className="p-2">
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
    </section>
  );
};

export default page;
