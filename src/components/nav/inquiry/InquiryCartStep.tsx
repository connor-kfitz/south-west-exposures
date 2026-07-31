"use client";

import Image from "next/image";
import InquiryEmptyCart from "./InquiryEmptyCart";

import { Button } from "@/components/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useInquiryList } from "@/stores/useInquiryList";

interface InquiryCartStepProps {
  onContinue: () => void;
  onClose: () => void;
}

export default function InquiryCartStep({ onContinue, onClose }: InquiryCartStepProps) {
  const products = useInquiryList((state) => state.products);
  const removeProduct = useInquiryList((state) => state.removeProduct);

  if (products.length === 0) return <InquiryEmptyCart onClose={onClose}/>;
  
  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-12 sm:px-12">
        <SheetHeader className="gap-2 p-0 mb-8">
          <SheetTitle className="text-h4 leading-h4 font-semibold text-black">Inquiry list</SheetTitle>
          <SheetDescription className="text-b6 text-gray-600">
            Review your selected products before submitting.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start gap-4">
          <p className="text-b7 font-semibold text-black">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <ul className="flex w-full flex-col items-start gap-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="relative flex items-center w-full gap-4 rounded-2xl border border-gray-300 p-4 pr-[52px]"
              >
                <div className="relative size-[88px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {product.imageSrc && (
                    <Image src={product.imageSrc} alt={product.name} fill className="object-contain"/>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1 text-b7">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="line-clamp-2 text-gray-600">{product.description}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <Image src="/images/products/list/trash.svg" alt="Garbage Can" height={32} width={32}/>
                  <span className="sr-only">Remove {product.name} from inquiry list</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end border-t border-gray-300 px-6 py-6 sm:py-4 sm:px-12">
        <Button variant="primary" size="primaryDefault" className="w-full sm:w-[200px]" onClick={onContinue}>
          Continue to inquiry
        </Button>
      </div>
    </>
  );
}
