import React from "react";
import { Card } from "./ui/Card";
import CardItem from "./item/CardItem";
import {
  homepageCardsColumn1,
  homepageCardsColumn2,
  homepageCardsColumn3,
} from "@/constants";

const CardCarousel = () => {
  return (
    <Card className="w-11/12 h-[600px] mx-auto my-20 flex justify-around gap-x-12 py-8 px-8 overflow-hidden">
      <div className="w-[25%] hidden xl:flex flex-col gap-y-8 vertical-carousel-up">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn1.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn1.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
      </div>
      <div className="w-[80%] xl:w-[25%] flex flex-col gap-y-8 vertical-carousel-down">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
      </div>
      <div className="w-[25%] hidden xl:flex flex-col gap-y-8 vertical-carousel-up">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn3.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn3.map((card) => (
            <CardItem
              key={card.id}
              author={card.author}
              title={card.title}
              description={card.description}
              image={card.image}
              avatarImage={card.avatarImage}
              value={card.value}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CardCarousel;
