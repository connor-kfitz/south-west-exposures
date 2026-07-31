"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useInquiryList } from "@/stores/useInquiryList";

interface InquirySuccessStepProps {
  onClose: () => void;
}

export default function InquirySuccessStep({ onClose }: InquirySuccessStepProps) {
  const products = useInquiryList((state) => state.products);

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-16 pb-12 sm:px-12">
      <div className="flex flex-col items-start gap-4 mb-8">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-500">
          <Image src="/images/shared/checkmark.svg" alt="Checkmark" width={32} height={32}/>
        </div>
        <SheetHeader className="gap-2 p-0">
          <SheetTitle className="text-h4 leading-h4 font-semibold text-black">We&apos;ve received your inquiry</SheetTitle>
          <SheetDescription className="text-b6 text-gray-600">
            We&apos;ll follow up within 1–2 business days.
          </SheetDescription>
        </SheetHeader>
      </div>
      {products.length > 0 && (
        <div className="flex flex-col items-start gap-2">
          <p className="text-b7 font-semibold text-black">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <ul className="flex w-full list-disc flex-col gap-1 pl-5 text-b7 text-gray-900">
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button variant="primary" size="primaryDefault" className="w-full mt-8 sm:w-[auto]" onClick={onClose}>
        Continue browsing
      </Button>
    </div>
  );
}
