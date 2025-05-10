import { Product } from "@/types/admin-products";
import ProductCard from "../ProductCard";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-8 mt-[48px]">
      {products.map((product, index) => (
        <ProductCard product={product} className="basis-[calc(33%-0.5rem)]" key={index}/>
      ))}
    </ul>
  )
}
