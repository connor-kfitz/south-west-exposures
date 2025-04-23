import { Product } from "@/types/admin-products";
import BreadCrumbs from "../../nav/BreadCrumbs";
import ImageCarousel from "./ImageCarousel";
import Metadata from "./Metadata";

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
    <main className="font-main pt-4 bg-white px-[140px]">
      <BreadCrumbs breadCrumbs={breadCrumbs}/>
      <div className="pt-[45px] flex justify-center">
        <div className="flex gap-8 w-full max-w-[1160px]">
          <div className="flex-1 max-w-[59.92%] ml-auto">
            <ImageCarousel product={product} className="w-full flex gap-8"/>
          </div>
          <div className="flex-1 max-w-[40.08%]">
            <Metadata product={product} className="w-full"/>
          </div>
        </div>
      </div>
    </main>
  )
}
