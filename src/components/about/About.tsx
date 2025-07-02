"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import { Product } from "@/types/admin-products";
import HeroHeader from "./HeroHeader";
import ProductRange from "./ProductRange";
import CustomSolutions from "./CustomSolutions";
import PopularProducts from "./PopularProducts";
import HealthPhysics from "./HealthPhysics";
import Compliance from "./Compliance";
import HeroImage from "./HeroImage";

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
      <HeroImage/>
      <ProductRange/>
      <CustomSolutions/>
      <HealthPhysics/>
      <Compliance/>
      <PopularProducts popularProducts={popularProducts}/>
    </>
  )
}
