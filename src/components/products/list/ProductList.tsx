"use client";

import Filters from "./Filters";
import FilterInfo from "./FilterInfo";
import Products from "./Products";
import useMediaQuery from "@/hooks/useMediaQuery";
import ProductCategoryFilter from "@/components/shared/ProductCategoryFilter";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { Product } from "@/types/admin-products";
import { Filter, SortByOptions } from "@/types/product-list";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductFilters } from "@/stores/useProductFilters";
import { productCategories } from "@/lib/constants";
import { ProductCategory } from "@/types/product-category";

interface ProductListProps {
  products: Product[];
  filters: Filter[];
}

export default function ProductList({products, filters}: ProductListProps) {

  const { setBreadcrumbs } = useBreadcrumbs();
  const isAboveLg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "Products", link: "/products" }
    ])
  }, [setBreadcrumbs]);

  const { filters: filterStorage, setFilters: setFilterStorage } = useProductFilters();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState<SortByOptions>("");
  const [filterState, setFilterState] = useState<Filter[]>(filterStorage.length ? filterStorage :
    filters.map(group => ({
      ...group,
      values: group.values.map(value => ({ ...value, selected: false }))
    }))
  );

  useEffect(() => {
    setFilterStorage(filterState)
  }, [filterState, filterStorage, setFilterStorage]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const firstEntry = searchParams.entries().next();
    if (firstEntry.done) return;
    const [filterName, filterValue] = firstEntry.value;
    if (!filterName || !filterValue) return;

    if (filterName === "category" && filterValue === "all") {
      setFilterState((prevFilters) => selectOnly(prevFilters, null));
      return;
    }

    setFilterState((prevFilters) => selectOnly(prevFilters, { group: filterName, value: filterValue }));
  }, [searchParams, setFilterState]);

  function handleCategorySelect(category: ProductCategory) {
    setFilterState((prevFilters) => selectOnly(prevFilters, category.filter));
  }

  function getSelectedCategory(): string | null {
    const selectedValues = filterState.flatMap(group =>
      group.values.filter(v => v.selected).map(v => ({ group: group.name.toLowerCase(), value: v.name.toLowerCase() }))
    );

    if (selectedValues.length === 0) return "All products";
    if (selectedValues.length > 1) return null;

    const [{ group, value }] = selectedValues;
    const match = productCategories.find(c => c.filter?.group === group && c.filter.value === value);
    return match ? match.name : null;
  }

  function selectOnly(filters: Filter[], selection: { group: string; value: string } | null): Filter[] {
    return filters.map((group) => {
      const isSelectedGroup = selection !== null && group.name.toLowerCase() === selection.group.toLowerCase();
      return {
        ...group,
        values: group.values.map((v) => ({
          ...v,
          selected: isSelectedGroup && v.name.toLowerCase() === selection.value.toLowerCase()
        }))
      }
    });
  }

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

  const selectedCategory = getSelectedCategory();
  const heading = selectedCategory && selectedCategory !== "All products" ? selectedCategory : "Products";

  return (
    <main className="font-main bg-white pb-6 xl:pb-[96px]">
      <div className="pt-6 md:pt-12 padding-content">
        <h1 className="max-w-[1160px] mx-auto text-h1 leading-h1 text-gray-900 font-semibold mb-8 md:mb-6">{heading}</h1>
      </div>
      <div className="padding-content max-md:pr-0! md:bg-gray-50">
        <ProductCategoryFilter
          variant="page"
          className="max-w-[1160px] mx-auto py-8 max-md:justify-start max-md:gap-4 max-md:h-[226px] max-md:px-6 max-md:py-[13px]
            max-md:scroll-px-6 max-md:bg-gray-50 max-md:rounded-l-[8px]"
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </div>
      <div className="pt-12 flex justify-center padding-content">
        <div className="w-full max-w-[1160px]">
          <div className="flex gap-8">
            <>
              {isAboveLg && (
                <Filters
                  className="min-w-[266px] lg:block"
                  filters={filterState}
                  setFilters={setFilterState}
                />
              )}
            </>
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
