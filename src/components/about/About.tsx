"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import { Product } from "@/types/admin-products";
import HeroHeader from "./HeroHeader";
import ProductRange from "./ProductRange";
import CustomSolutions from "./CustomSolutions";
import PopularProducts from "./PopularProducts";

interface AboutProps {
  popularProducts: Product[];
}

export default function About({ popularProducts }: AboutProps) {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <>
      <HeroHeader/>
      <div className="max-w-[1160px] mx-auto">
        <ProductRange/>
      </div>
      <CustomSolutions/>
      <PopularProducts popularProducts={popularProducts}/>
    </>
  )
}
