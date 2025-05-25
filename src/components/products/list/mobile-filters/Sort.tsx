"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DropdownOption, SortByOptions } from "@/types/product-list";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SortProps {
  sortOption: SortByOptions;
  sortByOptions: DropdownOption[];
  setSortOption: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function Sort({ sortOption, sortByOptions, setSortOption }: SortProps) {
  const [collapsed, setCollapsed] = useState<"open" | "closed" | "opening" | "closing">("closed");
  const contentRef = useRef<HTMLDivElement>(null);

  function toggleCollapsed() {
    if (collapsed === "open") {
      setCollapsed("closing");
    } else if (collapsed === "closed") {
      setCollapsed("opening");
    }
  }

  useEffect(() => {
    if (collapsed === "closing") {
      setTimeout(() => {
        setCollapsed("closed")
      }, 300)
    }
    if (collapsed === "opening") {
      setTimeout(() => {
        setCollapsed("open")
      }, 300)
    }
  }, [collapsed])

  return (
    <>
      <button className="w-full flex justify-between mb-4 items-center rounded-[2px] cursor-pointer focus-visible:ring-offset-3 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none" onClick={() => toggleCollapsed()}>
        <h3 className="text-h3 leading-h3 text-gray-900 font-semibold">
          {sortOption ? <>Sort by <span className="text-b6 leading-b6 font-normal">({sortByOptions.find(option => option.value === sortOption)?.label})</span> </> : "Sort by"}
        </h3>
        <div
          className="w-4 h-4 flex items-center justify-center mr-1"
        >
          <Image
            src="/images/products/list/up-chevron.svg"
            alt="Up Chevron"
            width={16}
            height={8}
            style={{
              transform: (collapsed === "closed" || collapsed === "closing") ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          height: (collapsed === "closed" || collapsed === "closing") ? 0 : `${contentRef?.current?.scrollHeight}px`,
        }}
        className={`items-start transition-all duration-300 ease-in-out flex flex-col gap-2 ${(collapsed === "open") ? "" : "overflow-hidden"}`}
      >
        <RadioGroup
          value={sortOption}
          onValueChange={(value) => setSortOption(value as SortByOptions)}
          tabIndex={collapsed === "closed" || collapsed === "closing" ? -1 : 0}
          className="flex flex-col gap-4 mb-4"
        >
          {sortByOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-[10px]">
              <RadioGroupItem
                value={option.value}
                id={`sort-${option.value}`}
                className="border-gray-600 cursor-pointer"
              />
              <label
                htmlFor={`sort-${option.value}`}
                className="text-b6 leading-b6 peer-disabled:cursor-not-allowed cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="w-full h-[1px] bg-gray-100 mb-[32px]"></div>
    </>
  )
}
