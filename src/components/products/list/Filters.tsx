import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeFirstLetter, sortIsotopeValues, sortVolumeValues } from "@/lib/helpers";
import { Filter } from "@/types/product-list";
import { Filter as FilterValue } from "@/types/admin-products";
import { useRef, useState } from "react";
import Image from "next/image";
import FormatIsotope from "@/lib/FormatIsotope";

interface FiltersProps {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export default function Filters({filters, setFilters}: FiltersProps) {
  return (
    <div className="grow min-w-[266px] max-w-[266px]">
      <h2 className="mb-4 text-[32px] text-blue-900 leading-[40px] font-semibold">Filter</h2>
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
  const [collapsed, setCollapsed] = useState(false);
  const contentRef = useRef<HTMLUListElement>(null);

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
      <div className="flex justify-between mb-2">
        <h3 className="text-gray-900 font-semibold leading-[24px]">
          {getHeaderName(filter.name)}
        </h3>
        <button
          className="cursor-pointer"
          onClick={() => setCollapsed(prev => !prev)}
        >
          <Image
            src="/images/products/list/up-chevron.svg"
            alt="Up Chevron"
            width={15}
            height={8}
            style={{
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          />
        </button>
      </div>
      <ul
        ref={contentRef}
        style={{
          height: collapsed ? 0 : `${contentRef?.current?.scrollHeight}px`
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-2"
      >
        {getSortedFilterValues(filter).map((value, index) => (
          <li key={index} className="flex items-center gap-2">
            <Checkbox
              id={value.name}
              checked={value.selected}
              onCheckedChange={(checked) => updateFilter(Boolean(checked), value.name)}
            />
            <label htmlFor={value.name} className="text-gray-900 leading-[24px]">
              {filter.name === "isotopes" ? <FormatIsotope isotope={value.name} /> : value.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}
