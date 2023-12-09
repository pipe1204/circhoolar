import React from "react";

const Billboard = ({ text }: { text: string }) => {
  return (
    <div className="text-light-white text-center bg-background rounded-lg mt-8 xl:mt-0 p-4 xl:p-8 w-4/5 mx-auto">
      <h1 className="text-lg xl:text-xl font-semibold">{text}</h1>
    </div>
  );
};

export default Billboard;
