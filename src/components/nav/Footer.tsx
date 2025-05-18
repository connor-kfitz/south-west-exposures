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
        <div className="flex items-center max-w-[556px] xl:max-w-[1160px] pb-5 pt-6 mx-auto border-b border-[#BFDBFE]">
          <Image
            src="/images/footer/swe-logo.png"
            alt="South West Exposures Logo"
            className="mr-[37px] relative bottom-[6px]"
            height={66}
            width={68}
          />
          <div className="flex flex-wrap justify-between items-center w-full space-y-2">
            <ul className="flex flex-wrap gap-[32px] gap-y-2 text-b6 leading-b6 relative top-[2px] mr-[32px]">
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
            <Link href="https://www.linkedin.com/in/swexposures" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/footer/linkedin.svg"
                alt="LinkedIn Logo"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center max-w-[556px] xl:max-w-[1160px] py-6 mx-auto">
          <div className="flex flex-wrap justify-between items-center w-full gap-y-6">
            <div className="flex gap-5 justify-start items-center">
              <p className="text-b7 leading-b7">SWE is registered with</p>
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
            <p className="font-[Inter] text-xs leading-[16px]">2025 South West Exposures. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
