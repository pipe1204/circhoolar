import React from "react";
import { Card } from "../ui/Card";
import { Separator } from "../ui/separator";

const TopicHeader = () => {
  return (
    <section>
      <Card className="text-light-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Special Needs Education</h1>
        <Separator className="text-light-white my-2" />
        <p className="text-sm text-gray-500">
          Resources and support for parents of children with special needs,
          including educational accommodations and therapies.
        </p>
      </Card>
    </section>
  );
};

export default TopicHeader;
