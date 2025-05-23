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
  sortOption: SortByOptions;
  setFilterState: React.Dispatch<React.SetStateAction<Filter[]>>;
  setSortOption: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function FilterInfo({ products, filterState, sortOption, setFilterState, setSortOption }: FilterInfoProps) {

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-b7 leading-b7 text-gray-900">{products.length} products displayed</p>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption}/>
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
    <ul className="flex gap-4 flex-wrap mt-4 min-h-[32px]">
      {filterState.map((group) => 
        group.values.map((value, index) => (
          value.selected && (
            <li key={index}>
              <button
                type="button"
                onClick={() => removeFilter(value.name)}
                className="flex items-center gap-1 bg-gray-100 rounded-[99px] px-3 py-1 text-b6 leading-b6 text-gray-900
                         hover:bg-gray-300 active:bg-gray-300 transition
                         focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                         focus:outline-none focus:bg-gray-300 cursor-pointer"
              >
                <span>
                  {group.name === "isotopes"
                    ? <FormatIsotope isotope={value.name} />
                    : value.name}
                </span>
                <Image
                  src="/images/products/list/close.svg"
                  alt="Remove"
                  width={10}
                  height={10}
                />
              </button>
          </li>
          )
        ))
      )}
      {getFilterCount(filterState) > 0 ? 
        <li className="text-b6 leading-b6 py-1 text-gray-900">
          <button className="cursor-pointer underline underline-offset-3 rounded-[2px] focus-visible:ring-offset-3 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none" onClick={clearAll}>
            Clear all
          </button>
        </li> 
      : null}
    </ul>
  )
}

interface SortDropdownProps {
  sortOption: SortByOptions;
  setSortOption: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

function SortDropdown({ sortOption, setSortOption }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const sortByOptions = [
    // { value: "relevance", label: "Relevance" },
    { value: "new", label: "New" },
    { value: "largest", label: "Largest first" },
    { value: "smallest", label: "Smallest first" }
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-b7 leading-b7 p-0 text-gray-900 rounded-[2px] hover:bg-white hover:text-gray-900 h-[20px] focus-visible:ring-offset-3 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
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
        <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => setSortOption(value === sortOption ? "" : (value as SortByOptions))}>
          {sortByOptions.map((option, index) => (
            <DropdownMenuRadioItem key={index} value={option.value}
              className="cursor-pointer py-1 px-2 text-b7 leading-b7"
            >
              <span className="ml-5">{option.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
