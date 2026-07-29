import Image from "next/image";
import Link from "next/link";
import HeroImage from "./HeroImage";

import { Button } from "../ui/button";

export default function HeroHeader() {
  return (
    <header className="relative flex justify-center mb-[calc(158px+(100vw-375px)*0.05)] md:mb-[144px] min-h-[622px]">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 contain-paint">
          <div
            className="absolute inset-0"
            style={{
              background: "var(--Radial, radial-gradient(232.17% 107.77% at 67.7% 69.6%, #5B21B6 0%, #4338CA 68.79%, #2E1065 100%))"
            }}
          />
          <Image
            src="/images/home/hero-background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <HeroImage/>
      </div>
      <div className="w-full max-w-[1440px] relative">
        <div className="flex justify-center px-6 w-full max-w-[1060px] pt-[48px] md:pl-[48px] lg:py-[96px] lg:pl-[82px] xl:pl-[140px] md:block">
          <div className="max-w-[663px] relative z-10">
            <h1 className="text-[41px] leading-[44px] sm:text-[56px] sm:leading-[60px] md:text-[75px] md:leading-[80px] font-bold text-white mb-6">
              Redefining
              <br/>
              protection in
              <br/>
              drug delivery
            </h1>
            <p className="text-b5 text-white max-w-[564px] mb-6">
              From concept to fabrication, South West Exposures engineers next-generation shielding systems that safeguard therapies and shape the future of care.
            </p>
            <Link href="/products">
              <Button variant="hero" size="hero" className="w-full sm:w-auto px-[24px] text-black">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
