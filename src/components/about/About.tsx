"use client";

import HeroHeader from "./HeroHeader";
import CustomEngineeringImage from "./CustomEngineeringImage";
import CustomEngineeringGradient from "./CustomEngineeringGradient";
import ProductRange from "./ProductRange";
import CustomSolutions from "./CustomSolutions";
import PopularProducts from "./PopularProducts";
import HeroImage from "./HeroImage";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import { Product } from "@/types/admin-products";
import SpecializedServices from "./SpecializedServices";

interface AboutProps {
  popularProducts: Product[];
}

export default function About({ popularProducts }: AboutProps) {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <main className="font-main">
      <HeroHeader/>
      <HeroImage/>
      <div className="relative">
        <ProductRange/>
        <CustomSolutions/>
        <CustomEngineeringImage/>
        <CustomEngineeringGradient/>
      </div>
      <SpecializedServices/>
      <PopularProducts popularProducts={popularProducts}/>
    </main>
  );
}
