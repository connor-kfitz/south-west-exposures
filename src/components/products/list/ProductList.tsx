"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { Product } from "@/types/admin-products";
import { Filter, SortByOptions } from "@/types/product-list";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import FilterInfo from "./FilterInfo";
import Products from "./Products";

interface ProductListProps {
  products: Product[];
  filters: Filter[];
}

export default function ProductList({products, filters}: ProductListProps) {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "Products", link: "/products" }
    ])
  }, [setBreadcrumbs]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState<SortByOptions>("");
  const [filterState, setFilterState] = useState<Filter[]>(
    filters.map(group => ({
      ...group,
      values: group.values.map(value => ({ ...value, selected: false }))
    }))
  );

  useEffect(() => {

    function applyFiltersToProducts(products: Product[], filters: Filter[]) {
      const activeFilters = filters.reduce<{[key: string]: string[]}>((acc, group) => {
        const selectedValues = group.values
          .filter(v => v.selected)
          .map(v => v.name);

        if (selectedValues.length > 0) {
          acc[group.name] = selectedValues;
        }

        return acc;
      }, {});

      return products.filter(product => {
        return Object.entries(activeFilters).every(([group, selectedValues]) => {
          const productValue = product[group as keyof typeof product];

          if (!productValue) return false;

          if (Array.isArray(productValue)) {
            return selectedValues.some(val =>
              productValue.some(pv =>
                hasNameField(pv) ? pv.name === val : pv === val
              )
            );
          }

          return selectedValues.includes(productValue as string);
        });
      });
    }

    function hasNameField(value: unknown): value is { name: string } {
      return typeof value === 'object' && value !== null && 'name' in value;
    }

    function sortProducts(products: Product[], option: SortByOptions) {
      switch (option) {
        case "largest":
          return [...products].sort((a, b) => getMaxVolume(b) - getMaxVolume(a));
        case "smallest":
          return [...products].sort((a, b) => getMinVolume(a) - getMinVolume(b));
        case "new":
          return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        default:
          return products;
      }
    }

    function getMaxVolume(product: Product): number {
      return Math.max(...product.volumes.map(v => parseVolume(v.name, "max")));
    }

    function getMinVolume(product: Product): number {
      return Math.min(...product.volumes.map(v => parseVolume(v.name, "min")));
    }

    function parseVolume(volumeStr: string, mode: "min" | "max" = "min"): number {
      if (!volumeStr) return 0;
      if (volumeStr.includes("-")) {
        const [min, max] = volumeStr.split("-").map(v => parseFloat(v));
        return mode === "min" ? min : max;
      }
      return parseFloat(volumeStr);
    }

    const filteredProducts = applyFiltersToProducts(products, filterState);
    const sortedProducts = sortProducts(filteredProducts, sortOption);
    setFilteredProducts(sortedProducts);

  }, [filterState, sortOption, products]);


  return (
    <main className="font-main bg-white pb-6 xl:pb-[96px] px-6">
      <div className="pt-6 flex justify-center xl:pt-[48px]">
        <div className="w-full max-w-[1160px]">
          <h1 className="text-[48px] text-gray-900 font-semibold leading-[52px] mb-8">Products</h1>
          <div className="flex gap-8">
            <Filters filters={filterState} setFilters={setFilterState}/>
            <div className="grow">
              <FilterInfo 
                products={filteredProducts}
                filterState={filterState}
                sortOption={sortOption}
                setFilterState={setFilterState}
                setSortOption={setSortOption}
              />
              <Products products={filteredProducts}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
