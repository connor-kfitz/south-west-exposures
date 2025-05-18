"use client";

import { Product } from "@/types/admin-products";
import ImageCarousel from "./ImageCarousel";
import Metadata from "./Metadata";
import Features from "./Features";
import Specifications from "./Specifications/Specifications";
import Faqs from "./Faqs";
import RelatedProducts from "./RelatedProducts";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";

interface ProductOverviewProps {
  product: Product;
}

export default function ProductOverview({ product }: ProductOverviewProps) {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "Products", link: "/products" },
      { name: product.name, link: "" }
    ])
  }, [product, setBreadcrumbs]);

  return (
    <main className="font-main bg-white pb-6 pt-6 padding-content sm:pb-[96px] md:pt-[45px] ">
      <div className="flex justify-center">
        <div className="w-full max-w-[1160px]">
          <div className="flex flex-col-reverse w-full mb-[64px] md:flex-row md:gap-8">
          <div className="flex-1 flex-col">
            <ImageCarousel images={product.images} className="w-full flex flex-col sm:flex-row gap-8"/>
          </div>
          <div className="flex-1 max-w-[465px]">
            <Metadata product={product} className="w-full"/>
          </div>
        </div>
        <div className="max-w-[663px]">
          <Features className="mb-[64px]" features={product.features} />
          <Specifications specifications={product.specifications} material={product.material} className="mb-[64px]" />
          <Faqs faqs={product.faqs} className="mb-[96px]" />
        </div>
          <RelatedProducts relatedProducts={product.relatedProducts}/>
        </div>
      </div>
    </main>
  )
}
