"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@/types/admin-products";
import { Filter, SortByOptions } from "@/types/product-list";
import { useState } from "react";
import Image from "next/image";
import FormatIsotope from "@/lib/FormatIsotope";

interface FilterInfoProps {
  products: Product[];
  filterState: Filter[];
  setFilterState: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export default function FilterInfo({ products, filterState, setFilterState }: FilterInfoProps) {

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-[13px] text-gray-900 leading-[20px]">{products.length} products displayed</p>
        <SortDropdown/>
      </div>
      <FilterBadges filterState={filterState} setFilterState={setFilterState}/>
    </>
  ) 
}

interface FilterBadgesProps {
  filterState: Filter[];
  setFilterState: React.Dispatch<React.SetStateAction<Filter[]>>;
}

function FilterBadges({ filterState, setFilterState }: FilterBadgesProps) {

  function removeFilter(name: string) {
    setFilterState(prevFilters => {
      return prevFilters.map(group => {
        return {
          ...group,
          values: group.values.map(value => {
            if (value.name === name) {
              return { ...value, selected: false };
            }
            return value;
          })
        };
      });
    }
  )
  }

  function getFilterCount(filters: Filter[]): number {
    return filters.reduce((count, group) => {
      return count + group.values.filter(value => value.selected).length;
    }, 0);
  }

  function clearAll() {
    setFilterState(prevFilters => {
      return prevFilters.map(group => {
        return {
          ...group,
          values: group.values.map(value => {
            return { ...value, selected: false };
          })
        };
      });
    });
  }


  return (
    <ul className={`flex gap-4 flex-wrap ${getFilterCount(filterState) > 0 ? "mt-4" : "mt-0"}`}>
      {filterState.map((group) => 
        group.values.map((value, index) => (
          value.selected && (
            <li key={index} className="flex items-center gap-1 bg-gray-50 rounded-[99px] px-3 py-1 text-gray-900 leading-[24px]">
              <span>{group.name === "isotopes" ? <FormatIsotope isotope={value.name} /> : value.name}</span>
              <button className="cursor-pointer" onClick={() => removeFilter(value.name)}>
                <Image
                  src="/images/products/list/close.svg"
                  alt="Close"
                  width={10}
                  height={10}
                />
              </button>
            </li>
          )
        ))
      )}
      {getFilterCount(filterState) > 0 ? 
        <li className="py-1 text-gray-900 leading-[24px]">
          <button className="cursor-pointer underline underline-offset-3" onClick={clearAll}>
            Clear all
          </button>
        </li> 
      : null}
    </ul>
  )
}

function SortDropdown() {
  const [sortOption, setSortOption] = useState<SortByOptions>("");
  const [open, setOpen] = useState(false);

  const sortByOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "new", label: "New" },
    { value: "largest", label: "Largest first" },
    { value: "smallest", label: "Smallest first" }
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-[13px] p-0 text-gray-900 hover:bg-white hover:text-gray-900 h-[20px] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          {sortOption ? `Sort by: ${sortByOptions.find(option => option.value === sortOption)?.label}` : "Sort by"}
          <Image
            src="/images/products/list/down-chevron.svg"
            alt="Down Chevron"
            width={15}
            height={8}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          />  
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-main w-[100px] bg-white rounded-[4px] text-gray-900 border-none p-0" style={{ boxShadow: 'var(--shadow-dropdown)' }} align="end">
        <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => setSortOption(value as SortByOptions)}>
          {sortByOptions.map((option, index) => (
            <DropdownMenuRadioItem key={index} value={option.value}
              className="cursor-pointer py-1 px-2 text-[13px] leading-[20px]"
            >
              <span className="ml-5">{option.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
