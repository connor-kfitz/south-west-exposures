import { ProductPreview } from "@/types/admin-products";
import ProductCard from "../ProductCard";

interface RelatedProductsProps {
  relatedProducts: ProductPreview[];
  className?: string;
}

export default function RelatedProducts({relatedProducts, className}: RelatedProductsProps) {

  if (!relatedProducts || relatedProducts.length === 0) return null;

  const expanded = relatedProducts.flatMap(obj => Array(4).fill({ ...obj }));

  return (
    <section className={className}>
      <h2 className="text-[32px] text-gray-900 font-semibold leading-[40px] mb-4">Related Products</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expanded.map((product, index) => (
          <ProductCard product={product} key={index}/>
        ))}
      </ul>
    </section>
  )
}
