import { ProductSpecification } from "@/types/admin-products";
import { SpecificationsTable } from "./SpecificationsTable";

interface SpecificationsProps {
  specifications: ProductSpecification[];
  material: string;
  className?: string;
}

export default function Specifications({ specifications, material, className }: SpecificationsProps) {

  function sortSpecifications(specifications: ProductSpecification[]) {
    return [...specifications].sort(
      (a, b) => Number(a.volume) - Number(b.volume)
    );
  }

  return (
    <section className={className}>
      <h2 className="text-h3 leading-h3 text-gray-900 font-semibold mb-4">Specifications</h2>
      <h3 className="text-gray-900 font-semibold text-b6 leading-b6">Material</h3>
      <p className="text-gray-600 text-b6 leading-b6 mb-6">{material}</p>
      <SpecificationsTable specifications={sortSpecifications(specifications)}/>
    </section>
  )
}
