import { Product } from "@/types/admin-products";
import BreadCrumbs from "../../nav/BreadCrumbs";
import ImageCarousel from "./ImageCarousel";
import Metadata from "./Metadata";
import Features from "./Features";
import Specifications from "./Specifications/Specifications";
import Faqs from "./Faqs";
import RelatedProducts from "./RelatedProducts";

interface ProductOverviewProps {
  product: Product;
}

export default function ProductOverview({ product }: ProductOverviewProps) {

  const breadCrumbs = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: product.name, link: "" }
  ]

  return (
    <main className="font-main pt-4 bg-white px-[140px] pb-[96px] mx-auto">
      <BreadCrumbs breadCrumbs={breadCrumbs}/>
      <div className="pt-[45px] flex justify-center">
        <div className="max-w-[1160px]">
        <div className="flex gap-8 w-full mb-[64px]">
          <div className="flex-1 ml-auto">
            <ImageCarousel images={product.images} className="w-full flex gap-8"/>
          </div>
          <div className="flex-1">
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
