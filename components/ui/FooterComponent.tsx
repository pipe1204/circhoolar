import React from "react";
import { Button } from "./Button";
import MovingCard from "./MovingCard";

interface FooterComponentProps {
  buttonLabel: string;
}

const FooterComponent = ({ buttonLabel }: FooterComponentProps) => {
  return (
    <section className="bg-fusia w-full">
      <div className="py-20 w-9/11 xl:w-4/5 flex flex-col justify-center items-center mx-auto">
        <h1 className="text-4xl xl:text-6xl font-bold text-white text-center">
          Where school communities thrive through sharing and sustainability
        </h1>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="font-semibold text-2xl text-white my-8 rounded-full py-8"
        >
          {buttonLabel}
        </Button>
        <div className="w-4/5 mx-auto">
          <MovingCard backgroundColor="white" width="9/12" />
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
