import React, { useState, MouseEvent } from "react";
import { Card } from "./Card";

type MovingCardProps = {
  width?: string;
  backgroundColor?: string;
  height?: string;
};

const MovingCard: React.FC<MovingCardProps> = ({
  width,
  backgroundColor,
  height,
}) => {
  const [style, setStyle] = useState<{
    transform?: string;
    boxShadow?: string;
  }>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.

    // Calculate the effect based on mouse position
    const xEffect = (x - rect.width / 2) / 20; // Increased movement
    const yEffect = (y - rect.height / 2) / 20; // Increased movement

    setStyle({
      transform: `translate(${xEffect}px, ${yEffect}px)`,
      boxShadow: `${xEffect * 2}px ${yEffect * 2}px 15px rgba(0,0,0,0.1)`,
    });
  };

  return (
    <Card
      className={`bg-${backgroundColor} rounded-[24px] w-${width} h-[200px] xl:h-[600px] mx-auto my-8`}
      style={{
        ...style,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setStyle({})}
    ></Card>
  );
};

export default MovingCard;
