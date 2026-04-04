"use client";

import HeroHeader from "@/components/home/HeroHeader";
import HeroImage from "@/components/home/HeroImage";
import CustomEngineeringImage from "@/components/home/CustomEngineeringImage";
import CustomEngineeringGradient from "@/components/home/CustomEngineeringGradient";
import ProductRange from "@/components/home/ProductRange";
import CustomSolutions from "@/components/home/CustomEngineering";
import PopularProducts from "@/components/home/PopularProducts";
import SpecializedServices from "@/components/home/SpecializedServices";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import { Product } from "@/types/admin-products";

interface HomeProps {
  popularProducts: Product[];
}

export default function Home({ popularProducts }: HomeProps) {

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
