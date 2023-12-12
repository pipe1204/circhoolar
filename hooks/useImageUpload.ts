import { userRef } from '@/lib/converters/User';
import { useUserNameStore } from '@/store/store';
import { getDoc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const useImageUpload = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [fileObjects, setFileObjects] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(true);
    const isBrowser = typeof window !== "undefined";

    const { data: session } = useSession();
    const setProfileImage = useUserNameStore((state) => state.setProfileImage);
  
    const onImageUpload = async (data: any) => {
        if (isBrowser) {
            if (data.image.length > 0) {
              const image = data.image[0];
              setFiles([...files, image.name]);
              setFileObjects((currentFiles) => [...currentFiles, image]);
      
              const fileInput = document.getElementById(
                "file_input"
              ) as HTMLInputElement;
              if (fileInput) {
                fileInput.value = "";
              }
              setImageSelected(false);
            }
          }
    };
  
    const onDeleteFile = () => {
        setFiles([]);
        setFileObjects([]);
        setImageSelected(true);
    };
  
    const onImageSubmit = async () => {
        if (fileObjects.length > 0) {
            setIsLoading(true);
            try {
              const uploadedImageUrls = await Promise.all(
                fileObjects.map(async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "circhoolar");
      
                  const response = await fetch(
                    `https://api.cloudinary.com/v1_1/circhoo/image/upload`,
                    {
                      method: "POST",
                      body: formData,
                    }
                  );
      
                  const data = await response.json();
                  return data.secure_url;
                })
              );
      
              //Updating Firebase.
              const userDocRef = userRef(session?.user?.id || "");
              const docSnapshot = await getDoc(userDocRef);
      
              if (docSnapshot.exists()) {
                await updateDoc(userDocRef, { image: uploadedImageUrls[0] });
                setProfileImage(uploadedImageUrls[0]);
              } else {
                console.log("No such document!");
              }
      
              setFiles([]);
              setFileObjects([]);
              setImageSelected(true);
              setIsLoading(false);
            } catch (error) {
              console.error("Error uploading images:", error);
            }
          }
    };
  
    return { files, fileObjects, isLoading, imageSelected, onImageUpload, onDeleteFile, onImageSubmit };
  };
  
  export default useImageUpload;