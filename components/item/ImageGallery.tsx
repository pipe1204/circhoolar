"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ImageGalleryProps {
  images: any;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = useState(images[0].image);

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <div className=" order-last flex gap-4 xl:order-none xl:flex-col">
        {images.map((image: any) => (
          <div key={image.id} className="overflow-hidden rounded-lg">
            <Image
              src={image.image}
              width={200}
              height={200}
              alt={image.id}
              className="object-center object-cover w-full h-full cursor-pointer"
              onClick={() => handleSmallImageClick(image.image)}
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
