import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeFirstLetter, sortIsotopeValues, sortVolumeValues } from "@/lib/helpers";
import { Filter } from "@/types/product-list";
import { Filter as FilterValue } from "@/types/admin-products";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import FormatIsotope from "@/lib/FormatIsotope";

interface FiltersProps {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export default function Filters({filters, setFilters}: FiltersProps) {
  return (
    <div className="grow min-w-[266px] max-w-[266px]">
      <h2 className="mb-4 text-h3 leading-h3 text-blue-900 font-semibold">Filter</h2>
      <ul className="flex flex-col gap-4">
        {filters.map((filter, index) => (
          <li key={index}>
            <FilterBox filter={filter} setFilters={setFilters}/>
            {index <= filters.length - 2 ? <div className="w-full h-[1px] bg-gray-100 mt-4"></div> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface FilterBoxProps {
  filter: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

function FilterBox({ filter, setFilters }: FilterBoxProps) {
  const [collapsed, setCollapsed] = useState<"open" | "closed" | "opening" | "closing">("open");
  const contentRef = useRef<HTMLUListElement>(null);

  function toggleCollapsed() {
    if (collapsed === "open") {
      setCollapsed("closing");
    } else if (collapsed === "closed") {
      setCollapsed("opening");
    }
  }

  useEffect(() => {
    if (collapsed === "closing") {setTimeout(() => {
      setCollapsed("closed")
    }, 300)}
    if (collapsed === "opening") {setTimeout(() => {
      setCollapsed("open")
    }, 300)} 
  },[collapsed])

  function getHeaderName(header: string): string {
    switch (header) {
      case "volumes":
        return "Volume (mL)";
      case "usages":
        return "Usage";
      default:
        return capitalizeFirstLetter(header);
    }
  }

  function updateFilter(checked: boolean, name: string) {
    setFilters(prevFilters => {
      return prevFilters.map(group => {
        if (group.name === filter.name) {
          return {
            ...group,
            values: group.values.map(value => {
              if (value.name === name) {
                return { ...value, selected: checked };
              }
              return value;
            })
          };
        }
        return group;
      });
    });
  }

  function getSortedFilterValues(filter: Filter): FilterValue[] {
    switch (filter.name) {
      case "isotopes":
        return sortIsotopeValues(filter.values);
      case "volumes":
        return sortVolumeValues(filter.values);
      default:
        return [...filter.values].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return (
    <>
      <div className="flex justify-between mb-2 items-center">
        <h3 className="text-b6 leading-b6 text-gray-900 font-semibold">
          {getHeaderName(filter.name)}
        </h3>
        <button
          className="cursor-pointer w-4 h-4 rounded-[2px] flex items-center justify-center focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          onClick={() => toggleCollapsed()}
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
        </button>
      </div>
      <ul
        ref={contentRef}
        style={{
          height: (collapsed === "closed" || collapsed === "closing") ? 0 : `${contentRef?.current?.scrollHeight}px`,
        }}
        className={`transition-all duration-300 ease-in-out flex flex-col gap-2 ${(collapsed === "open") ? "" : "overflow-hidden"}`}
      >
        {getSortedFilterValues(filter).map((value, index) => (
          <li key={index} 
            className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={value.selected}
                onCheckedChange={(checked) => updateFilter(Boolean(checked), value.name)}
                tabIndex={collapsed === "closed" || collapsed === "closing" ? -1 : 0}
              />
            <label className="text-b6 leading-b6 text-gray-900">
                {filter.name === "isotopes" ? <FormatIsotope isotope={value.name} /> : value.name}
              </label>
          </li>
        ))}
      </ul>
    </>
  )
}
