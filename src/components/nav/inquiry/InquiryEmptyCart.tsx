"use client";

import { Button } from "@/components/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface InquiryEmptyCartProps {
  onClose: () => void;
}

export default function InquiryEmptyCart({ onClose }: InquiryEmptyCartProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-15 sm:pt-16 sm:pb-12 sm:px-12">
      <SheetHeader className="gap-2 p-0 mb-6">
        <SheetTitle className="text-h4 leading-h4 font-semibold text-black">Inquiry list</SheetTitle>
        <SheetDescription className="text-b6 font-semibold text-gray-900">
          Your inquiry list is empty
        </SheetDescription>
      </SheetHeader>
      <p className="text-b6 text-gray-600 mb-8">
        Add products to your inquiry list to request pricing and product information from SWE.
      </p>
      <Button variant="primary" size="primaryDefault" className="w-full sm:w-[193px]" onClick={onClose}>
        Continue browsing
      </Button>
    </div>
  );
}
