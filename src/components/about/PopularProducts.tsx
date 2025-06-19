import { ProductPreview } from "@/types/admin-products";
import ProductCard from "../products/ProductCard";

interface PopularProductsProps {
  popularProducts: ProductPreview[];
  className?: string;
}

export default function PopularProducts({ popularProducts }: PopularProductsProps) {

  if (!popularProducts || popularProducts.length === 0) return null;

  return (
    <section className="max-w-[1157px] mx-auto">
      <h2 className="text-h1 text-gray-900 font-semibold mb-4">
        Popular Products
      </h2>

      <div className="sm:hidden mr-[24px] pb-6 w-[calc(100vw-24px)] overflow-x-auto">
        <ul className="flex gap-4 w-max">
          {popularProducts.map((product, index) => (
            <li key={index} className="flex-shrink-0 w-[277px]">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popularProducts.map((product, index) => (
          <ProductCard product={product} key={index}/>
        ))}
      </ul>
    </section>
  )
}
