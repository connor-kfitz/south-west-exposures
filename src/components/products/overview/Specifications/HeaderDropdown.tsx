"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";

interface HeaderDropdownProps {
  volumes: string[];
  columnIndex: number;
  selectedVolumeIndex: number;
  setSpecificationTableColumns: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function HeaderDropdown({ volumes, columnIndex, selectedVolumeIndex, setSpecificationTableColumns }: HeaderDropdownProps) {

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          className="h-[auto] pl-3 pr-4 pb-1 pt-0.5 text-gray-900 rounded-[2px] hover:bg-white hover:text-gray-900 bg-white
            w-[110px] max-w-[110px] rounded-[8px] border border-gray-600 justify-between
            focus-visible:ring-offset-3 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 
            focus-visible:outline-none"
        >
          <span className="text-b6">{volumes[selectedVolumeIndex]} mL</span>
          <Image
            src="/images/products/list/up-chevron.svg"
            alt="Down Chevron"
            className="mt-[1px]"
            width={12}
            height={6}
            style={{
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease"
            }}
          /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="font-main bg-white px-0 py-1 border border-gray-600 py-1 min-w-0 w-[110px] max-w-[110px]">
        {volumes.map((volume, index) => (
          <DropdownMenuItem className="flex justify-start gap-2 pl-3 min-w-0 text-b6 hover:bg-transparent focus:bg-transparent" key={index} onClick={((e) => {e.preventDefault()})}>
            <Checkbox
              checked={index === selectedVolumeIndex}
              onCheckedChange={() => setSpecificationTableColumns((prev: number[]) => prev.map((item, i) => (i === columnIndex ? index : item)))}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer"
            />
            <span className="text-violet-400">{volume} mL</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
