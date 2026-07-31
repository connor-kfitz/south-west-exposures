"use client";

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
      variant="primaryGhost"
      size="primaryGhostDefault"
      disabled={isAdded}
      onClick={() => addProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        imageSrc: product.images[0]?.src,
      })}
    >
      {isAdded ? "Added to basket" : "Add to basket"}
    </Button>
  );
}
