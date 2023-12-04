"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: any;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const defaultImage = "/Logo-dark.jpg";
  const [bigImage, setBigImage] = useState(defaultImage);

  useEffect(() => {
    if (images && images.length > 0) {
      setBigImage(images[0]);
    }
  }, [images]);

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <div className=" order-last flex gap-4 xl:order-none xl:flex-col">
        {images?.map((image: any) => (
          <div key={image} className="overflow-hidden rounded-lg">
            <Image
              src={image}
              width={100}
              height={100}
              alt="small image"
              className="object-center object-cover w-full h-full cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg xl:col-span-4">
        <Image
          src={bigImage}
          alt="big image"
          width={500}
          height={500}
          className="object-center object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
