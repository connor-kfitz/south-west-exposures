import { ProductPreview } from "@/types/admin-products";
import ProductCard from "../ProductCard";

interface RelatedProductsProps {
  relatedProducts: ProductPreview[];
  className?: string;
}

export default function RelatedProducts({relatedProducts, className}: RelatedProductsProps) {

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-h3 leading-h3 text-gray-900 font-semibold mb-4">
        Related Products
      </h2>

      <div className="sm:hidden mr-[24px] pb-6 w-[calc(100vw-24px)] overflow-x-auto">
        <ul className="flex gap-4 w-max">
          {relatedProducts.map((product, index) => (
            <li key={index} className="flex-shrink-0 w-[277px]">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product, index) => (
          <ProductCard product={product} key={index}/>
        ))}
      </ul>
    </section>
  )
}
