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
      <div className="pt-[45px]">
        <div className="flex gap-8">
          <ImageCarousel className="basis-[60%]"/>
          <Metadata product={product} className="basis-[40%]"/>
        </div>
      </div>
    </main>
  )
}
