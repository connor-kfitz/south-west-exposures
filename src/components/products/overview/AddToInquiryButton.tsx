"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useInquiryList } from "@/stores/useInquiryList";
import { Product } from "@/types/admin-products";

interface AddToInquiryButtonProps {
  product: Product;
}

export default function AddToInquiryButton({ product }: AddToInquiryButtonProps) {
  const isAdded = useInquiryList((state) => state.hasHydrated && state.products.some((p) => p.id === product.id));
  const addProduct = useInquiryList((state) => state.addProduct);

  return (
    <Button
      variant="primary"
      size="primaryDefault"
      className="w-full sm:w-auto font-medium disabled:opacity-100 disabled:bg-gray-300 disabled:text-gray-600"
      disabled={isAdded}
      onClick={() => addProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        imageSrc: product.images[0]?.src,
      })}
    >
      {isAdded ? (
        <>
          <Image src="/images/shared/checkmark-grey.svg" alt="Checkmark" width={20} height={20} className="mt-px"/>
          Added to Inquiry List
        </>
      ) : (
        <>
          <Image src="/images/shared/basket-white.svg" alt="Basket" width={20} height={20} className="mt-px"/>
          Add to Inquiry List
        </>
      )}
    </Button>
  );
}
