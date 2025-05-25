"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownOption, Filter, SortByOptions } from "@/types/product-list";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sort from "./Sort";
import Filters from "./Filters";

interface FilterAndSortSheetProps {
  filterState: Filter[];
  sortOption: SortByOptions;
  sortByOptions: DropdownOption[];
  setFilterState: React.Dispatch<React.SetStateAction<Filter[]>>;
  setSortOption: React.Dispatch<React.SetStateAction<SortByOptions>>;
  className?: string;
}

export default function FilterAndSortSheet({ filterState, sortOption, sortByOptions, setFilterState, setSortOption, className }: FilterAndSortSheetProps) {
  const [localFilters, setLocalFilters] = useState<Filter[]>(filterState);
  const [localSortOption, setLocalSortOption] = useState<SortByOptions>(sortOption);

  useEffect(() => {
    setLocalFilters(filterState);
    setLocalSortOption(sortOption);
  }, [filterState, sortOption]);

  const handleClear = () => {
    const clearedFilters = localFilters.map(filter => ({
      name: filter.name,
      values: filter.values.map(value => ({
        id: value.id,
        name: value.name,
        selected: false,
      })),
    }));

    setFilterState(clearedFilters);
    setSortOption("");
  };
  
  const handleApply = () => {
    setFilterState(localFilters);
    setSortOption(localSortOption);
  };

  function getTotalActiveSelections(filters: Filter[], sortOption: SortByOptions): number {
    const activeFilterCount = filters.reduce((count, filter) => {
      return count + filter.values.filter(v => v.selected).length;
    }, 0);

    const isSortApplied = sortOption !== "";
    return activeFilterCount + (isSortApplied ? 1 : 0);
  }

  function onSheetToggle(open: boolean) {
    if (open) return;
    setLocalFilters(filterState);
    setLocalSortOption(sortOption);
  }
  
  return (
    <Sheet onOpenChange={(open) => onSheetToggle(open)}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={`text-[16px] leading-[24px] font-semibold gap-1 px-4 pt-[9px] pb-[11px] border-gray-300 rounded-full text-gray-900 hover:bg-white hover:text-gray-900 
            focus-visible:ring-offset-3 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600
            focus-visible:outline-none focus-visible:border-gray-500 border-[2px] active:border-gray-500 ${className}`}
        >
          Filter & Sort
          <Image
            src="/images/products/list/filter.svg"
            alt="Filter"
            width={24}
            height={24}
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="block font-main w-full p-6 pt-[74px] bg-white sm:max-w-auto border-none [&>button[data-close]]:hidden">
        <SheetHeader className="p-0 w-0 h-0">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <Sort sortOption={localSortOption} sortByOptions={sortByOptions} setSortOption={setLocalSortOption}/>
        <Filters filters={localFilters} setFilters={setLocalFilters} />
        <div className="absolute bottom-0 left-0 right-0 w-full flex flex-wrap justify-center items-center gap-4 py-4 px-6 border-t-gray-300 border-t-[1px]">
          <Button
            onClick={handleClear}
            variant="primaryGhost" size="primaryGhostDefault" 
            className="w-[155px] text-md"
          >
            Clear {getTotalActiveSelections(localFilters, localSortOption) > 0 ? `(${getTotalActiveSelections(localFilters, localSortOption)})` : ""}
          </Button>
          <SheetClose asChild>
            <Button
              variant="primary"
              size="primaryDefault"
              className="w-[155px] text-md"
              onClick={handleApply}
            >
              Apply
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
