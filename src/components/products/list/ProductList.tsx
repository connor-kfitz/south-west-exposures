"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { Product } from "@/types/admin-products";
import { Filter } from "@/types/product-list";
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

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterState, setFilterState] = useState<Filter[]>(
    filters.map(group => ({
      ...group,
      values: group.values.map(value => ({ ...value, selected: false }))
    }))
  );

  useEffect(() => {
    setFilteredProducts(prev => prev);
  },[filterState])


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
                setFilterState={setFilterState}  
              />
              <Products products={filteredProducts}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
