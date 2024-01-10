import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

const useFormatedDate = (createdAt: Timestamp | null) => {
  const [timeDifference, setTimeDifference] = useState<string>("");

  useEffect(() => {
    const formatTimeDifference = () => {
      if (createdAt) {
        const currentDate = new Date();
        const createdDate = createdAt.toDate() as Date;
        const timeDiff = currentDate.getTime() - createdDate.getTime();
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        const daysDiff = Math.floor(hoursDiff / 24);

        if (hoursDiff < 1) {
          setTimeDifference("just now");
        } else if (hoursDiff === 1) {
          setTimeDifference("1 hour ago");
        } else if (hoursDiff < 24) {
          setTimeDifference(`${hoursDiff} hours ago`);
        } else if (daysDiff === 1) {
          setTimeDifference("1 day ago");
        } else {
          setTimeDifference(`${daysDiff} days ago`);
        }
      } else {
        setTimeDifference("");
      }
    };

    formatTimeDifference();
  }, [createdAt]);

  return timeDifference;
};

export default useFormatedDate;
