import { useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import { useSession } from "next-auth/react";
import {
  useUserNameStore,
  useSchoolCodeStore,
  useSchoolNameStore,
  useBankDetailsStore,
  useHasOptOutNotificationsStore,
} from "@/store/store";
import { z } from "zod";
import { notificationsSchema, profileSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof profileSchema>;
type notificationsInputs = z.infer<typeof notificationsSchema>;

const useProfileEdit = () => {
  const [editProfile, setEditProfile] = useState(true);
  const [editPreferences, setEditPreferences] = useState(true);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideEditProfile, setHideEditProfile] = useState(false);
  const [hideEditPreferences, setHideEditPreferences] = useState(false);

  const { data: session } = useSession();
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);
  const userName = useUserNameStore((state) => state.userName) || "";
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode) || "";
  const schoolName = useSchoolNameStore((state) => state.schoolName) || "";
  const bsbNumber = useBankDetailsStore((state) => state.bsbNumber) || "";
  const accountNumber =
    useBankDetailsStore((state) => state.accountNumber) || "";
  const accountName = useBankDetailsStore((state) => state.accountName) || "";
  const setBsbNumber = useBankDetailsStore((state) => state.setBsbNumber);
  const setAccountNumber = useBankDetailsStore(
    (state) => state.setAccountNumber
  );
  const setAccountName = useBankDetailsStore((state) => state.setAccountName);
  const hasOptOutNotifications = useHasOptOutNotificationsStore(
    (state) => state.hasOptOutNotifications || ""
  );
  const setHasOptOutNotifications = useHasOptOutNotificationsStore(
    (state) => state.setHasOptOutNotifications
  );

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userName,
      email: session?.user?.email || "",
      schoolCode: schoolCode,
      schoolName: schoolName,
      bsbNumber: bsbNumber,
      accountNumber: accountNumber,
      accountName: accountName,
    },
  });

  const notificationForm = useForm<notificationsInputs>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      optout: hasOptOutNotifications,
    },
  });

  const handleEditProfile = () => {
    setEditProfile(false);
    setHideEditProfile(true);
  };

  const handleEditPreferences = () => {
    setEditPreferences(false);
    setHideEditPreferences(true);
  };

  const handleCancelEditProfile = () => {
    setEditProfile(true);
    setHideEditProfile(false);
    setError("");
    form.setValue("name", userName);
    form.setValue("schoolCode", schoolCode);
  };

  const handleCancelEditreferences = () => {
    notificationForm.setValue("optout", hasOptOutNotifications);
    setEditPreferences(true);
    setHideEditPreferences(false);
  };

  const handleProfileSubmit = async (data: any) => {
    setIsLoading(true);

    if (
      data.name === userName &&
      data.schoolCode === schoolCode &&
      data.bsbNumber === bsbNumber &&
      data.accountNumber === accountNumber &&
      data.accountName === accountName
    ) {
      setHideEditProfile(false);
      setIsLoading(false);
      setEditProfile(true);
    } else {
      const userDocRef = userRef(session?.user?.id || "");

      // Check if the school code exists in the 'schools' collection
      const schoolDocRef = doc(codeRef, data.schoolCode);
      const schoolDocSnapshot = await getDoc(schoolDocRef);

      if (schoolDocSnapshot.exists()) {
        // School code is valid, update user's profile
        await updateDoc(userDocRef, {
          name: data.name,
          schoolCode: data.schoolCode,
          bankDetails: {
            bsbNumber: data.bsbNumber,
            accountNumber: data.accountNumber,
            accountName: data.accountName,
          },
          hasBankDetails: true,
        });

        setUserName(data.name);
        setSchoolCode(data.schoolCode);
        setSchoolName(schoolDocSnapshot.data()?.name);
        setBsbNumber(data.bsbNumber);
        setAccountNumber(data.accountNumber);
        setAccountName(data.accountName);
        setEditProfile(true);
        setHideEditProfile(false);
        setIsLoading(false);

        console.log("Profile updated successfully");
      } else {
        setError("Invalid school code");
        form.setValue("schoolCode", schoolCode);
        setIsLoading(false);
        console.error("Invalid school code");
      }
    }
  };

  const handlePreferencesSubmit = async (data: any) => {
    setIsLoading(true);

    if (data.optout === hasOptOutNotifications) {
      setHideEditPreferences(false);
      setIsLoading(false);
      setEditPreferences(true);
    } else {
      const userDocRef = userRef(session?.user?.id || "");

      await updateDoc(userDocRef, {
        hasOptOutNotifications: data.optout === "Yes" ? true : false,
      });

      setHasOptOutNotifications(data.optout);
      setEditPreferences(true);
      setHideEditPreferences(false);
      setIsLoading(false);

      console.log("Preferences updated successfully");
    }
  };

  return {
    form,
    notificationForm,
    editProfile,
    error,
    isLoading,
    hideEditProfile,
    editPreferences,
    hideEditPreferences,
    handleEditProfile,
    handleCancelEditProfile,
    handleProfileSubmit,
    handlePreferencesSubmit,
    handleCancelEditreferences,
    handleEditPreferences,
  };
};

export default useProfileEdit;
