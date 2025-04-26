"use client";

import { useState } from "react";
import { ProductImage } from "@/types/admin-products";
import Image from "next/image";

interface ImageCarouselProps {
  images: ProductImage[];
  className: string;
}

export default function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  function cycleImages(direction: number) {
    const newIndex = (selectedImageIndex + direction + images.length) % images.length;
    setSelectedImageIndex(newIndex);
  }

  return (
    <section className={className}>
      <ul className="flex flex-wrap gap-4 sm:flex-col">
        {images.map((image, index) => (
          image.src &&
          <li key={index}>
            <button
              className="relative flex justify-center items-center bg-gray-100 rounded-[8px] min-w-[67px] min-h-[67px]
                overflow-hidden group focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none"
              onMouseEnter={() => setSelectedImageIndex(index)}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.src}
                alt="Main"
                className="object-contain"
                fill
              />
              <div className="absolute inset-0 bg-[rgba(17,17,17,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none rounded-[8px]" />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative flex justify-center items-center bg-gray-100 rounded-[16px] aspect-[1/1] max-w-[564px] sm:grow">
        {images[selectedImageIndex].src &&
          <Image
            src={images[selectedImageIndex].src}
            alt="Main"
            className="contain"
            fill
          />
        }

        <div className="absolute bottom-[6vw] right-[6vw] sm:right-6 sm:bottom-6 flex justify-between items-center gap-4">
          <button
            className="
             bg-white w-[6.38vw] h-[6.38vw] max-w-[36px] max-h-[36px] rounded-full flex justify-center items-center cursor-pointer 
             hover:bg-gray-300 focus-visible:bg-gray-300 
             focus-visible:ring-offset-2 
             focus-visible:ring-offset-blue-600 focus-visible:ring-2 
             focus-visible:ring-white focus-visible:outline-none
            "
            onClick={() => cycleImages(-1)}
          >
            <div className="w-[40%] h-[40%] relative">
              <Image
                src="/images/products/overview/left-chevron.svg"
                alt="Left Arrow"
                fill
              />
            </div>
          </button>
          <button
            className="bg-white w-[6.38vw] h-[6.38vw] max-w-[36px] max-h-[36px] rounded-full flex justify-center items-center cursor-pointer 
             hover:bg-gray-300 focus-visible:bg-gray-300 
             focus-visible:ring-offset-2 
             focus-visible:ring-offset-blue-600 focus-visible:ring-2 
             focus-visible:ring-white focus-visible:outline-none"
            onClick={() => cycleImages(1)}
          >
            <div className="w-[40%] h-[40%] relative">
              <Image
                src="/images/products/overview/right-chevron.svg"
                alt="Right Arrow"
                fill
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
