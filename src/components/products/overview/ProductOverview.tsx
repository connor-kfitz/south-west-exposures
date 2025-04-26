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
    <main className="font-main pt-4 bg-white pb-6 xl:pb-[96px] px-6 mx-auto">
      {/* Todo: Move Breadcrumbs to Nav */}
      <BreadCrumbs breadCrumbs={breadCrumbs}/>
      <div className="pt-6 flex justify-center xl:pt-[45px]">
        <div className="max-w-[500px] w-full xl:max-w-[1160px]">
          <div className="flex flex-col-reverse w-full mb-[64px] xl:flex-row xl:gap-8">
          <div className="flex-1 flex-col">
            <ImageCarousel images={product.images} className="w-full flex gap-4 flex-col sm:flex-row xl:gap-8"/>
          </div>
          <div className="flex-1 max-w-[465]">
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
