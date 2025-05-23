import { ProductPreview } from "@/types/admin-products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { sortIsotopeValues, sortVolumeValues } from "@/lib/helpers";

interface ProductCardProps {
  product: ProductPreview;
  className?: string;
}

export default function ProductCard({product, className}: ProductCardProps) {
  return (
    <Link 
      className={cn(`
        block cursor-pointer rounded-[10px] overflow-hidden focus-visible:ring-2
        focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-white 
        focus-visible:outline-none
      `, className)}
      href={`/products/${product.id}`}
    >
      <div className="relative aspect-[1/1] w-full bg-gray-100 rounded-[8px] mb-2 overflow-hidden group">
        {product.images[0].src && (
          <Image
            src={product.images[0].src}
            alt={product.name} 
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
          />
        )}
      </div>
      <div className="p-0">
        <h3 className="text-left font-semibold text-gray-900 text-b6 leading-b6 ">{product.name}</h3>
        <ul className="text-b7 leading-b7 text-gray-600">
          <li>
            <ul className="flex flex-wrap text-gray-600">
              {product.shields.map((shield, index) => (
                <li
                  key={index}
                  className="text-left after:content-[',\00a0'] last:after:content-[''] leading-[20px]"
                >
                  {shield.name}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <ul className="flex flex-wrap text-gray-600">
              {sortVolumeValues(product.volumes).map((volume, index) => (
                <li
                  key={index}
                  className="text-left after:content-[',\00a0'] last:after:content-[''] leading-[20px]"
                >
                  {volume.name}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <ul className="flex flex-wrap text-gray-600">
              {sortIsotopeValues(product.isotopes).map((isotope, index) => (
                <li
                  key={index}
                  className="text-left after:content-[',\00a0'] last:after:content-[''] leading-[20px]"
                >
                  {isotope.name}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </Link>
  )
}
