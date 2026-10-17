"use client";

import ProductCategoryFilter from "@/components/shared/ProductCategoryFilter";

import { usePathname, useSearchParams } from "next/navigation";
import { getCategoryFromUrl } from "@/lib/helpers";

interface ProductsMegaMenuProps {
  id: string;
  panelRef: React.RefObject<HTMLDivElement>;
  onPointerEnter: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSelect: () => void;
}

export default function ProductsMegaMenu({ id, panelRef, onPointerEnter, onPointerLeave, onBlur, onKeyDown, onSelect }: ProductsMegaMenuProps) {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      id={id}
      ref={panelRef}
      className="hidden md:block absolute left-0 right-0 top-full z-50 bg-white padding-content animate-in fade-in-0 duration-150"
      style={{ boxShadow: "var(--shadow-dropdown)" }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <ProductCategoryFilter
        variant="nav"
        className="max-w-[1160px] mx-auto py-8"
        selected={getCategoryFromUrl(pathname, searchParams)}
        onSelect={onSelect}
      />
    </div>
  );
}
