import { Button } from "@/components/ui/button";
import { Product } from "@/types/admin-products";
import Image from "next/image";
import Link from "next/link";

interface MetadataProps {
  product: Product;
  className: string;
}

export default function Metadata({ product, className }: MetadataProps) {
  return (
    <section className={className}>
      <h1 className="text-[40px] text-gray-900 font-semibold leading-[44px] mb-4">{product.name}</h1>
      <p className="text-gray-600 leading-[24px] mb-4">{product.description}</p>
      <h3 className="font-semibold leading-[24px] mb-1">Usage</h3>
      <ul className="mb-4 flex flex-col gap-3 text-gray-600"> 
        {product.usages.map((usage, index) => (
          <li className="flex items-center" key={index}>
            <div className="flex justify-center items-center w-[32px] h-[32px] mr-2 rounded-[20px] bg-gray-100">
              <Image
                src="/images/products/overview/test-tube.png"
                alt={usage.name}
                width={20}
                height={20}
              />
            </div>
            <span>{usage.name}</span>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold leading-[24px]">Isotopes</h3>
      <ul className="mb-4 flex gap-4">
        {product.isotopes.map((isotope, index) => (
          <li key={index}>
            {/* Todo: Update href to product page with appropriate filter */}
            <Link
              href=""
              className="inline-block text-blue-600 underline underline-offset-3 p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {isotope.name}
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold leading-[24px] mb-1">Volume (mL)</h3>
      <ul className="mb-4 text-gray-600">
        {product.volumes.map((volume, index) => (
          <li
            key={index}
            className="inline after:content-[','] last:after:content-['']"
          >
            {volume.name}
          </li>
        ))}
      </ul>
      <h3 className="font-semibold leading-[24px] mb-1">Customization options</h3>
      <ul className="flex text-gray-600 mb-6">
        {/* Todo: Add field to backend and update with dynamic data*/}
        {/* {product.customizationOptions.map((volume, index) => (
          <li key={index}>
            {volume.name}
          </li>
        ))} */}
        <li className="inline after:content-[','] last:after:content-['']">Size</li> &nbsp;
        <li className="inline after:content-[','] last:after:content-['']">materials</li> &nbsp;
        <li className="inline after:content-[','] last:after:content-['']">isotopes</li> &nbsp;
        <li className="inline after:content-[','] last:after:content-['']">activity level</li>
      </ul>
      <Button variant="primary" size="primaryDefault">Inquire about this product</Button>
    </section>
  )
}
