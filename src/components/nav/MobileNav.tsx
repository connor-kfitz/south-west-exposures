import Link from "next/link";
import Image from "next/image";

import { Suspense, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { TopNavLink } from "@/types/top-nav";
import { productCategories } from "@/lib/constants";
import { getCategoryFromUrl } from "@/lib/helpers";

interface MobileNavProps {
  navLinks: TopNavLink[];
  isActiveLink: (href: string) => boolean;
}

export default function MobileNav({navLinks, isActiveLink}: MobileNavProps) {

  const [productsExpanded, setProductsExpanded] = useState(isActiveLink("/products"));
  const links: TopNavLink[] = [{ name: "Home", href: "/" }, ...navLinks];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center size-[44px] rounded-full cursor-pointer hover:bg-gray-300 focus-visible:bg-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none">
          <Image
            src="/images/top-nav/burger.svg"
            alt="Burger Menu"
            height={18}
            width={22}
          />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="block font-main w-full max-w-[293px] p-6 pt-[101px] bg-white sm:max-w-[293px] border-none"
        overlayClassName="bg-backdrop"
        closeClassName="top-2 right-4 size-[44px] [&_img]:size-[10px]"
      >
        <SheetHeader className="p-0 w-0 h-0">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-4 text-gray-900 text-[20px] leading-[28px]">
          {links.map((link) => (
            <li key={link.href} className={link.megaMenu ? "flex flex-col gap-3" : ""}>
              <div className="flex items-center justify-between py-0.5">
                <SheetClose asChild>
                  <Link
                    className={`whitespace-nowrap hover:text-blue-800 rounded-[4px] focus-ring ${link.megaMenu ? "" : "w-full"}
                      ${isActiveLink(link.href) ? " font-semibold" : ""}`}
                    href={link.href}
                  >
                    {link.mobileName ?? link.name}
                  </Link>
                </SheetClose>
                {link.megaMenu && (
                  <button
                    type="button"
                    aria-expanded={productsExpanded}
                    aria-controls="mobile-product-categories"
                    aria-label={`${productsExpanded ? "Hide" : "Show"} ${link.name.toLowerCase()} categories`}
                    className="flex items-center justify-center size-6 cursor-pointer rounded-[4px] focus-ring"
                    onClick={() => setProductsExpanded(expanded => !expanded)}
                  >
                    <Image
                      src="/images/top-nav/up-chevron.svg"
                      alt=""
                      width={24}
                      height={24}
                      className={`transition-transform ${productsExpanded ? "" : "rotate-180"}`}
                    />
                  </button>
                )}
              </div>
              {link.megaMenu && productsExpanded && (
                <Suspense>
                  <ProductCategoryLinks/>
                </Suspense>
              )}
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

function ProductCategoryLinks() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = getCategoryFromUrl(pathname, searchParams);

  return (
    <ul id="mobile-product-categories" className="flex flex-col gap-4 pl-4 pb-1 text-b6">
      {productCategories.map((category) => (
        <li key={category.name}>
          <SheetClose asChild>
            <Link
              href={category.href}
              aria-current={selected === category.name ? "page" : undefined}
              className={`block w-full whitespace-nowrap hover:text-blue-800 rounded-[4px] focus-ring
                ${selected === category.name ? "font-bold" : ""}`}
            >
              {category.name}
            </Link>
          </SheetClose>
        </li>
      ))}
    </ul>
  )
}
