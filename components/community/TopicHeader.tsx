import React from "react";
import { Card } from "../ui/Card";
import { Separator } from "../ui/separator";
import { useTopicStore } from "@/store/store";
import { topicHeaders } from "@/constants";

const TopicHeader = () => {
  const topic = useTopicStore((state) => state.topic);
  const headerTopic = topicHeaders.find((t) => t.topic === topic);

  return (
    <section>
      <Card className="text-light-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold">
          {headerTopic?.topic === "All" ? "All Topics" : headerTopic?.topic}
        </h1>
        <Separator className="text-light-white my-2" />
        <p className="text-sm text-gray-500">{headerTopic?.description}</p>
      </Card>
    </section>
  );
};

export default TopicHeader;
