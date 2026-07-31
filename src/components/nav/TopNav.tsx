"use client";

import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";
import MobileNav from "./MobileNav";
import InquiryListSheet from "./inquiry/InquiryListSheet";

import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { navLinks } from "@/lib/constants";

export default function TopNav() {

  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumbs();

  if (pathname.includes("admin") || pathname.includes("auth")) {
    return null;
  }

  function isActiveLink(link: string) {
    return pathname === link || pathname.startsWith(link + "/");
  }

  function getBreadcrumbBackgroundColor() {
    if (pathname.includes("/contact")) return "bg-gray-100";
    return "bg-white";
  }

  return (
    <nav className="w-full font-main">
      <div className="padding-content" style={{ boxShadow: 'var(--shadow-nav)' }}>
        <div className="flex items-center min-h-[88px] max-w-[1160px] py-3 mx-auto">
          <Link href="/">
            <Image
              src="/images/top-nav/swe-logo.png"
              alt="South West Exposures"
              className="mr-[32px] relative bottom-[6px]"
              height={47}
              width={72}
            />
            <span className="sr-only">South West Exposures</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <InquiryListSheet/>
            <MobileNav navLinks={navLinks} isActiveLink={isActiveLink}/>
          </div>
          <div className="hidden md:flex flex-wrap justify-between items-center w-full gap-y-2">
            <ul className="flex flex-wrap gap-[32px] text-gray-900 text-b6 leading-b6 relative top-[2px] mr-[32px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className={`whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800
                    focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white
                    focus-visible:outline-none ${isActiveLink(link.href) ? " underline underline-offset-3" : ""}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-[32px] relative top-[2px]">
              <li>
                <InquiryListSheet/>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {breadcrumbs.length ? <div className={`hidden padding-content rounded md:block ${getBreadcrumbBackgroundColor()}`}>
        <div className="max-w-[1160px] mx-auto">
          <BreadCrumbs breadCrumbs={breadcrumbs}/>
        </div>
      </div> : null}
    </nav>
  );
}
