"use client";

import InquiryCartStep from "./InquiryCartStep";
import InquiryFormStep from "./InquiryFormStep";
import InquirySuccessStep from "./InquirySuccessStep";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useInquiryList } from "@/stores/useInquiryList";
import { InquiryStage } from "@/types/inquiry";

export default function InquiryListSheet() {
  const products = useInquiryList((state) => state.products);
  const hasHydrated = useInquiryList((state) => state.hasHydrated);
  const productCount = hasHydrated ? products.length : 0;

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<InquiryStage>("Cart");

  useEffect(() => {
    useInquiryList.persist.rehydrate();
  }, []);

  useEffect(() => { 
    if (open) return;
    setStage("Cart");
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center size-[44px] rounded-full cursor-pointer hover:bg-gray-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none">
          <Image
            src="/images/top-nav/shopping-bag.svg"
            alt="Shopping Bag"
            height={24}
            width={24}
          />
          <InquiryBadge count={productCount}/>
          <span className="sr-only">Open inquiry list ({productCount} products)</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="font-main flex h-full w-full flex-col gap-0 border-none bg-white p-0 shadow-[16px_0px_48px_0px_rgba(65,66,83,0.3)] sm:max-w-[537px]"
      >
        {renderStage(stage, setStage, () => setOpen(false))}
      </SheetContent>
    </Sheet>
  );
}

function renderStage(stage: InquiryStage, setStage: (stage: InquiryStage) => void, onClose: () => void) {
  switch (stage) {
    case "Cart":
      return <InquiryCartStep onContinue={() => setStage("Form")} onClose={onClose}/>;
    case "Form":
      return <InquiryFormStep onBack={() => setStage("Cart")} onSubmitted={() => setStage("Success")}/>;
    case "Success":
      return <InquirySuccessStep onClose={onClose}/>;
  }
}

function InquiryBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <Badge className="absolute top-1.5 right-1.5 h-[18px] min-w-[18px] justify-center rounded-full border-transparent bg-blue-600 px-1 text-[11px] leading-none text-white">
      {count}
    </Badge>
  );
}
