import Link from "next/link";

import { Button } from "../ui/button";

export default function HeroHeader() {
  return (
    <header className="relative flex justify-center pb-[24px] mb-[144px]">
      <div
        className="absolute inset-0"
        style={{
          background: "url('/images/about/hero-background.png') center / cover no-repeat, var(--Radial, radial-gradient(232.17% 107.77% at 67.7% 69.6%, #5B21B6 0%, #4338CA 68.79%, #2E1065 100%))"
        }}
        aria-hidden="true"
      />
      <div className="w-full max-w-[1440px] relative">
        <div className="flex justify-center px-6 w-full max-w-[1060px] pt-[96px] pb-[72px] aboutCenterContent:pl-[140px] aboutCenterContent:block">
          <div className="max-w-[663px] relative z-10">
            <h1 className="text-d2 font-bold text-white mb-6">
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
              <Button variant="hero" size="hero" className="px-[24px] text-black">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
