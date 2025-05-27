"use client";

import { navLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  const pathname = usePathname();

  if (pathname.includes("admin") || pathname.includes("auth")) {
    return null;
  }

  return (
    <footer className="w-full font-main text-white bg-gray-900 min-h-[241px]">
      <div className="padding-content">
        <div className="flex-col flex max-w-[1160px] pb-5 pt-[32px] mx-auto border-b border-[#BFDBFE] sm:flex-row sm:items-center sm:pt-6">
          <Image
            src="/images/footer/swe-logo.png"
            alt="South West Exposures Logo"
            className="mr-[37px] mb-[7px] relative bottom-[6px] sm:mb-0"
            height={66}
            width={68}
          />
          <div className="flex-col flex flex-wrap justify-between w-full space-y-2 sm:flex-row sm:items-center">
            <ul className="flex-col flex flex-wrap gap-[32px] gap-y-4 pb-6 mb-6 border-b border-[#BFDBFE] text-b6 leading-b6 relative top-[2px] pr-[32px] sm:flex-row sm:pb-0 sm:mb-0 sm:border-b-0 sm:gap-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link className="whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 
                      focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white 
                      focus-visible:outline-none"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="https://www.linkedin.com/in/swexposures" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <span className="mr-2 sm:hidden">LinkedIn</span>
              <Image
                src="/images/footer/linkedin.svg"
                alt="LinkedIn Logo"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center max-w-[1160px] pt-6 pb-[32px] mx-auto sm:pb-6">
          <div className="flex flex-wrap justify-between items-center w-full gap-6 gap-y-6">
            <div className="w-auto sm:w-full flex flex-wrap gap-3 sm:gap-5 justify-start items-center">
              <p className="basis-full sm:basis-auto text-b7 leading-b7">SWE is registered with</p>
              <Image 
                src="/images/footer/canadian-flag.png"
                alt="Canadian Flag"
                width={86}
                height={24}
              />
              <Image 
                src="/images/footer/fda-logo.svg"
                alt="FDA Logo"
                width={59}  
                height={24}
              />
            </div>
            <p className="text-b7 leading-b7">2025 South West Exposures. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
