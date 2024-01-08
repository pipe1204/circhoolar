import React from "react";
import { Card } from "../ui/Card";

const TopicHeader = () => {
  return (
    <section>
      <Card className="text-light-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Special Needs Education</h1>
        <p className="text-sm text-gray-500">
          This is the description for the topic header{" "}
        </p>
      </Card>
    </section>
  );
};

export default TopicHeader;
