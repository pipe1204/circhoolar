import React from "react";
import { Button } from "./Button";
import MovingCard from "./MovingCard";
import Link from "next/link";

interface FooterComponentProps {
  buttonLabel: string;
  box: boolean;
}

const FooterComponent = ({ buttonLabel, box }: FooterComponentProps) => {
  return (
    <section className="bg-fusia w-full">
      <div className="py-20 w-9/11 xl:w-11/12 h-full flex flex-col justify-center items-center mx-auto">
        <h1 className="text-4xl xl:text-6xl font-bold text-white text-center">
          Where Educational Communities thrive through sharing and
          sustainability
        </h1>
        <Link href={"/api/auth/signin"}>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="font-semibold text-2xl text-white my-8 rounded-full py-8"
          >
            {buttonLabel}
          </Button>
        </Link>
        <div className="w-full h-full mx-auto">
          {box && (
            <MovingCard
              backgroundColor="white"
              width="11/12"
              image="/Dashboard.png"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
