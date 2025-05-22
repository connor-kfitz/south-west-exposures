"use client";

import { useState } from "react";
import { ProductImage } from "@/types/admin-products";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
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
      <ul className="hidden flex-wrap gap-4 sm:flex-col sm:flex">
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

      <div className="hidden relative justify-center items-center bg-gray-100 rounded-[16px] aspect-[1/1] max-w-[564px] sm:grow md:min-w-[316px] sm:flex">
        {images[selectedImageIndex].src &&
          <Image
            src={images[selectedImageIndex].src}
            alt="Main"
            className="contain"
            fill
          />
        }

        {images.length > 1 ? 
          <div className="absolute bottom-[6vw] right-[6vw] sm:right-6 sm:bottom-6 flex justify-between items-center gap-4">
            <button
              className="
              bg-white w-[6.38vw] h-[6.38vw] max-w-[36px] max-h-[36px] rounded-full flex justify-center items-center cursor-pointer 
              hover:bg-gray-300 focus-visible:bg-gray-300 
              focus-visible:ring-offset-2 
              focus-visible:ring-offset-white focus-visible:ring-2 
              focus-visible:ring-blue-600 focus-visible:outline-none
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
              focus-visible:ring-offset-white focus-visible:ring-2 
              focus-visible:ring-blue-600 focus-visible:outline-none"
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
          </div> : null
        }
      </div>
      <div className="w-screen flex flex-col items-center ml-[-24px] mt-6 sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: false, el: '.custom-swiper-pagination' }}
          className="w-full aspect-[1/1] rounded-xl bg-gray-100"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center rounded-xl relative"
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-6 flex justify-center gap-4"/>
      </div>
    </section>
  )
}
