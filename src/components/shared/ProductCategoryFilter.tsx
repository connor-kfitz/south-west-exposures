import Link from "next/link";
import Image from "next/image";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { productCategories } from "@/lib/constants";
import { ProductCategory } from "@/types/product-category";

const tileVariants = cva(
  `group relative block size-[200px] rounded-[48px] transition-colors hover:bg-gray-200 active:bg-gray-200
  focus-visible:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 focus-visible:outline-none`,
  {
    variants: {
      variant: {
        page: "bg-gray-50 focus-visible:ring-offset-gray-50",
        nav: "bg-white focus-visible:ring-offset-white"
      },
      selected: {
        true: "bg-gray-200",
        false: ""
      }
    }
  }
);

const labelVariants = cva("absolute left-0 right-0 top-[158px] px-2 text-b7 text-gray-900 text-center", {
  variants: {
    variant: {
      page: "font-semibold",
      nav: "font-normal group-hover:font-bold group-focus-visible:font-bold"
    },
    selected: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    { variant: "nav", selected: true, className: "font-bold" }
  ]
});

interface ProductCategoryFilterProps {
  variant: "page" | "nav";
  selected?: string | null;
  onSelect?: (category: ProductCategory) => void;
  className?: string;
}

export default function ProductCategoryFilter({ variant, selected, onSelect, className }: ProductCategoryFilterProps) {
  return (
    <ul className={cn("flex justify-between gap-6 overflow-x-auto overflow-y-hidden snap-x p-1", className)}>
      {productCategories.map((category) => {
        const isSelected = selected === category.name;
        const { box, image } = category.crop;

        return (
          <li key={category.name} className="snap-start shrink-0">
            <Link
              href={category.href}
              scroll={false}
              aria-current={isSelected ? "page" : undefined}
              className={cn(tileVariants({ variant, selected: isSelected }))}
              onClick={() => onSelect?.(category)}
            >
              <span
                className="absolute overflow-hidden pointer-events-none"
                style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
              >
                <span className="absolute" style={image}>
                  <Image
                    src={category.imageSrc}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </span>
              </span>
              <span className={cn(labelVariants({ variant, selected: isSelected }))}>{category.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
