import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { Donation } from "@/types/Types";

const useFetchSchoolDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const fetchDonations = async (schoolCode: string) => {
    if (schoolCode) {
      const schoolCodeDocRef = doc(codeRef, schoolCode);
      const schoolCodeDocSnap = await getDoc(schoolCodeDocRef);
      if (schoolCodeDocSnap.exists()) {
        setDonations(schoolCodeDocSnap.data().donations);
      }
    }
  };
  return { donations, fetchDonations };
};

export default useFetchSchoolDonations;
