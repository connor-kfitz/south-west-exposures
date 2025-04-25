import { ProductPreview } from "@/types/admin-products";
import ProductCard from "../ProductCard";

interface RelatedProductsProps {
  relatedProducts: ProductPreview[];
  className?: string;
}

export default function RelatedProducts({relatedProducts, className}: RelatedProductsProps) {

  const expanded = relatedProducts.flatMap(obj => Array(4).fill({ ...obj }));

  return (
    <section className={className}>
      <h2 className="text-[32px] text-gray-900 font-semibold leading-[40px] mb-4">Related Products</h2>
      <ul className="flex gap-4 justify-between">
        {expanded.map((product, index) => (
          <ProductCard product={product} className="basis-1/4 max-w-[277px]" key={index}/>
        ))}
      </ul>
    </section>
  )
}
