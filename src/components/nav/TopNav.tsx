"use client";

import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { navLinks, socialLinks } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";

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
          <Image 
            src="/images/top-nav/swe-logo.png"
            alt="South West Exposures Logo"
            className="mr-[32px] relative bottom-[6px]"
            height={47}
            width={72}
          />
          <Image
            src="/images/top-nav/burger-menu.svg"
            alt="Burder Menu"
            height={28}
            width={28}
            className="ml-auto block sm:hidden"
          />
          <div className="hidden sm:flex flex-wrap justify-between items-center w-full gap-y-2">
            <ul className="flex flex-wrap gap-[32px] text-gray-900 text-b6 leading-b6 relative top-[2px] mr-[32px]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link className={`whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 
                    focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white 
                    focus-visible:outline-none ${isActiveLink(link.href) ? ' underline underline-offset-3' : ''}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-[32px] relative top-[2px]">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link className="block p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    href={link.href} target="_blank" rel="noopener noreferrer"
                  >
                    <Image 
                      src={link.path}
                      alt={link.alt}
                      height={link.size}
                      width={link.size}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`hidden padding-content rounded sm:block ${getBreadcrumbBackgroundColor()}`}>
        <div className="max-w-[1160px] mx-auto">
          <BreadCrumbs breadCrumbs={breadcrumbs}/>
        </div>
      </div>
    </nav>
  )
}
