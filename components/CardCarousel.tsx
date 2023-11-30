import React from "react";
import { Card } from "./ui/Card";
import CardItem from "./item/CardItem";
import {
  homepageCardsColumn1,
  homepageCardsColumn2,
  homepageCardsColumn3,
} from "@/constants";

const CardCarousel = () => {
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
    <Card
      className="w-11/12 h-[600px] mx-auto my-20 flex justify-around gap-x-12 py-8 px-8 overflow-hidden cursor-not-allowed"
      style={{ pointerEvents: "none" }}
    >
      <div className="w-[25%] hidden xl:flex flex-col gap-y-8 vertical-carousel-up">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn1.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%] xl:w-[25%] flex flex-col gap-y-8 vertical-carousel-down">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn1.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[25%] hidden xl:flex flex-col gap-y-8 vertical-carousel-up">
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-8">
          {homepageCardsColumn2.map((card) => (
            <div key={card.id}>
              <CardItem
                id={card.id}
                author={card.author}
                title={card.title}
                description={card.description}
                image={card.image}
                avatar={card.avatarImage}
                price={card.value}
                sellingmethod={card.sellingmethod}
                conditionColor={itemCondition({ condition: card.condition })}
                condition={card.condition}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CardCarousel;
