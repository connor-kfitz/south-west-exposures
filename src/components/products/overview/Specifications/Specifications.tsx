import { ProductSpecification } from "@/types/admin-products";
import { SpecificationsTable } from "./SpecificationsTable";

interface SpecificationsProps {
  specifications: ProductSpecification[];
  material: string;
  className?: string;
}

export default function Specifications({ specifications, material, className }: SpecificationsProps) {

  return (
    <section className={className}>
      <h2 className="text-gray-900 text-[32px] font-semibold leading-[40px] mb-4">Specifications</h2>
      <h3 className="text-gray-900 font-semibold leading-[24px]">Material</h3>
      <p className="text-gray-600 leading-[24px] mb-6">{material}</p>
      <SpecificationsTable specifications={specifications}/>
    </section>
  )
}
