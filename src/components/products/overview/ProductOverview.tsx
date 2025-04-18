import { Product } from "@/types/admin-products";
import BreadCrumbs from "../../nav/BreadCrumbs";

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
    <main className="font-main pt-4 bg-white">
      <BreadCrumbs breadCrumbs={breadCrumbs}/>
      <div className="pt-[45px]">
        <section className="flex">
          
        </section>
      </div>
    </main>
  )
}
