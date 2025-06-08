import { Product } from "@/types/admin-products";
import ProductCard from "../ProductCard";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {

  if (products.length === 0) {
    return (
      <p className="text-gray-900 mt-[48px]">No Products Available</p>
    )
  }

  return (
    <ul className="grid grid-cols-1 productListXs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 mt-[48px]">
      {products.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </ul>
  )
}
