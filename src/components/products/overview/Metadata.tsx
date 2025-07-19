import { sortIsotopeValues, sortVolumeValues } from "@/lib/helpers";
import { Product } from "@/types/admin-products";
import Image from "next/image";
import Link from "next/link";
import InquiryDialog from "./InquiryDialog";

interface MetadataProps {
  product: Product;
  className: string;
}

export default function Metadata({ product, className }: MetadataProps) {

  return (
    <section className={className}>
      <h1 className="text-gray-900 font-semibold mb-4 text-h2 leading-h2">{product.name}</h1>
      <p className="text-gray-600 text-b6 leading-b6 mb-4">{product.description}</p>
      <h3 className="font-semibold text-b6 leading-b6 mb-1">Usage</h3>
      <ul className="mb-4 flex flex-col gap-3 text-gray-600"> 
        {product.usages.map((usage, index) => (
          <li className="flex items-center" key={index}>
            <div className="flex justify-center items-center w-[32px] h-[32px] mr-2 rounded-[20px] bg-gray-100">
              <Image
                src={usage.image || "/images/products/overview/test-tube.png"}
                alt={usage.name}
                width={20}
                height={20}
              />
            </div>
            <span>{usage.name}</span>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold text-b6 leading-b6">Isotopes</h3>
      <ul className="mb-4 flex gap-4 flex-wrap">
        {sortIsotopeValues(product.isotopes).map((isotope, index) => (
          <li key={index}>
            <Link
              href={`/products?isotopes=${isotope.name.toLowerCase()}`}
              className="inline-block text-blue-600 underline underline-offset-3 p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {isotope.name}
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold text-b6 leading-b6 mb-1">Volume (mL)</h3>
      <ul className="mb-4 text-gray-600 flex-wrap">
        {sortVolumeValues(product.volumes).map((volume, index) => (
          <li
            key={index}
            className="inline after:content-[',\00a0'] last:after:content-['']"
          >
            {volume.name}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold text-b6 leading-b6 mb-1">Customization options</h3>
      <ul className="flex flex-wrap text-gray-600 mb-6">
        {product.customizationOptions.map((volume, index) => {
          const name = index === 0
            ? volume.name.charAt(0).toUpperCase() + volume.name.slice(1).toLowerCase()
            : volume.name.toLowerCase();

          return (
            <li key={index} className="inline after:content-[',\00a0'] last:after:content-['']">
              {name}
            </li>
          )
        })}
      </ul>
      <InquiryDialog productName={product.name}/>
    </section>
  )
}
