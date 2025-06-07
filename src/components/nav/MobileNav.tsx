import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { TopNavLink } from "@/types/top-nav";
import Link from "next/link";
import Image from "next/image";

interface MobileNavProps {
  navLinks: TopNavLink[];
  isActiveLink: (href: string) => boolean;
}

export default function MobileNav({navLinks, isActiveLink}: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative ml-auto block md:hidden">
          <button className="absolute w-[44px] h-[44px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></button>
          <Image
            src="/images/top-nav/burger-menu.svg"
            alt="Burder Menu"
            height={28}
            width={28}
          />
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="block font-main w-full max-w-[293px] p-6 pt-[100px] bg-white sm:max-w-[293px] border-none"
        overlayClassName="bg-black/60"
      >
        <SheetHeader className="p-0 w-0 h-0">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col items-stretch gap-[14px] text-gray-900 text-[18px] leading-[24px]">
          {navLinks.map((link, index) => (
            <li className={index < navLinks.length - 1 ? "border-b-gray-200 border-b-[1px] pb-[14px]" : ""} key={index}>
              <SheetClose asChild>
                <Link
                  className={`flex items-center justify-between whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] 
                  focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white 
                  focus-visible:outline-none ${isActiveLink(link.href) ? " font-semibold" : ""}`}
                  href={link.href}
                >
                  <span>{link.name}</span>
                  <Image
                    src="/images/top-nav/arrow-right.svg"
                    alt="Arrow Right"
                    height={24}
                    width={24}
                  />
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
        <SheetClose asChild></SheetClose>
      </SheetContent>
    </Sheet>
  )
}
