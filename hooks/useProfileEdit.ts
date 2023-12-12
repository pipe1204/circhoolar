import { useState } from 'react';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { codeRef } from "@/lib/converters/SchoolCode";
import { userRef } from "@/lib/converters/User";
import { useSession } from 'next-auth/react';
import { useUserNameStore, useSchoolCodeStore, useSchoolNameStore } from '@/store/store';
import { z } from 'zod';
import { profileSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = z.infer<typeof profileSchema>;
const useProfileEdit = () => {
  const [editProfile, setEditProfile] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hideEditProfile, setHideEditProfile] = useState(false);
  const { data: session } = useSession();
  const setUserName = useUserNameStore((state) => state.setUserName);
  const setSchoolCode = useSchoolCodeStore((state) => state.setSchoolCode);
  const setSchoolName = useSchoolNameStore((state) => state.setSchoolName);
  const profileIamge = useUserNameStore((state) => state.profileImage);
  const userName = useUserNameStore((state) => state.userName) || "";
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode) || "";
  const schoolName = useSchoolNameStore((state) => state.schoolName) || "";

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userName,
      email: session?.user?.email || "",
      schoolCode: schoolCode,
      schoolName: schoolName,
    },
  });

  const handleEditProfile = () => {
    setEditProfile(false);
    setHideEditProfile(true);
  };

  const handleCancelEditProfile = () => {
    setEditProfile(true);
    setHideEditProfile(false);
    setError('');
    form.setValue("name", userName);
    form.setValue("schoolCode", schoolCode);
  };

  const handleProfileSubmit = async (data: any) => {
    setIsLoading(true);

    if (data.name === userName && data.schoolCode === schoolCode) {
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
        });

        setUserName(data.name);
        setSchoolCode(data.schoolCode);
        setSchoolName(schoolDocSnapshot.data()?.name);
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

  return { editProfile, error, isLoading, hideEditProfile, handleEditProfile, handleCancelEditProfile, handleProfileSubmit };
};

export default useProfileEdit;