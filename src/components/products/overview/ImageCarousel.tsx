"use client";

import { Product } from "@/types/admin-products";
import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  product: Product;
  className: string;
}

export default function ImageCarousel({ product, className }: ImageCarouselProps) {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  function cycleImages(direction: number) {
    const newIndex = (selectedImageIndex + direction + product.images.length) % product.images.length;
    setSelectedImageIndex(newIndex);
  }

  return (
    <section className={className}>
      <ul className="flex flex-col gap-4">
        {product.images.map((image, index) => (
          image.src && 
            <li
              key={index}
            >
              <button
                className="relative flex justify-center items-center bg-gray-100 w-[67px] h-[67px] rounded-[8px] 
                overflow-hidden group focus-visible:text-blue-800 focus-visible:ring-offset-2 
                focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white 
                focus-visible:outline-none"
                onMouseEnter={() => setSelectedImageIndex(index)}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image.src}
                  alt="Main"
                  layout="intrinsic"
                  className="contain"
                  width={47}
                  height={63}
                />
                <div className="absolute inset-0 bg-[rgba(17,17,17,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none rounded-[8px]"/>
              </button>
            </li>
        ))}
      </ul>
      <div className="relative flex justify-center items-center w-[564px] h-[564px] bg-gray-100 rounded-[16px]">
        {product.images[selectedImageIndex].src && 
          <Image 
            src={product.images[selectedImageIndex].src}
            alt="Main"
            layout="intrinsic"
            className="contain"
            width={354}
            height={485}
          />
        }
        <div className="absolute bottom-6 right-6 flex justify-between items-center gap-4">
          <button
            className="bg-white w-[36px] h-[36px] rounded-full flex justify-center items-center cursor-pointer 
             hover:bg-gray-300 focus-visible:bg-gray-300 
             focus-visible:ring-offset-2 
             focus-visible:ring-offset-blue-600 focus-visible:ring-2 
             focus-visible:ring-white focus-visible:outline-none"
            onClick={() => cycleImages(-1)}
          >
            <Image
              src="/images/products/overview/left-chevron.svg"
              alt="Left Arrow"
              width={6}
              height={12}
            />
          </button>
          <button
            className="bg-white w-[36px] h-[36px] rounded-full flex justify-center items-center cursor-pointer 
             hover:bg-gray-300 focus-visible:bg-gray-300 
             focus-visible:ring-offset-2 
             focus-visible:ring-offset-blue-600 focus-visible:ring-2 
             focus-visible:ring-white focus-visible:outline-none"
            onClick={() => cycleImages(1)}
          >
            <Image
              src="/images/products/overview/right-chevron.svg"
              alt="Right Arrow"
              width={6}
              height={12}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
