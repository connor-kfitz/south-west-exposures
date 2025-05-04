"use client";

import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { TopNavLink, TopNavSocialLink } from "@/types/top-nav";
import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";

export default function TopNav() {

  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumbs();

  if (pathname.includes("admin")) {
    return null;
  }

  const navLinks: TopNavLink[] = [
    { name: "About Us", href: "/" },
    { name: "Products", href: "/products" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" }
  ];

  const socialLinks: TopNavSocialLink[] = [
    { path: "/images/top-nav/linkedin.svg", alt: "Linkedin Logo", size: 24, href: "/"},
    { path: "/images/top-nav/shopping-bag.svg", alt: "Shopping Bag", size: 24, href: "/" }
  ];

  function isActiveLink(link: string) {
    return pathname === link || pathname.startsWith(link + "/");
  }

  return (
    <nav className="w-full font-main">
      <div className="px-6" style={{ boxShadow: 'var(--shadow-nav)' }}>
        <div className="flex items-center min-h-[88px] max-w-[556px] xl:max-w-[1160px] py-3 mx-auto">
            <Image 
              src="/images/top-nav/swe-logo.png"
              alt="South West Exposures Logo"
              className="mr-[32px] relative bottom-[6px]"
              height={47}
              width={72}
            />
            <div className="flex flex-wrap justify-between items-center w-full space-y-2">
              <ul className="flex gap-[32px] text-gray-900 leading-[24px] relative top-[2px] mr-[32px]">
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
                      href={link.href}
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
        <div className="px-6">
          <div className="max-w-[556px] xl:max-w-[1160px] mx-auto">
            <BreadCrumbs breadCrumbs={breadcrumbs} />
          </div>
      </div>
    </nav>
  )
}
