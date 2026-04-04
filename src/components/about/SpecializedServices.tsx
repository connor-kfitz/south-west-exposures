import Link from "next/link";

import { Button } from "../ui/button";

export default function SpecializedServices() {
  return (
    <section className="mb-[96px] px-[24px] sm:px-[48px]">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[66px] items-center">
        <div className="w-full flex justify-center md:justify-start">
          <div
            className="w-[564px] h-[649px] rounded-[16px] overflow-hidden bg-[#F3F4F6]"
            style={{
              background: "url('/images/about/specialized-services.png') lightgray -470.332px -61.275px / 238.516% 118.487% no-repeat",
              transform: "scaleX(-1)"
            }}
            role="img"
            aria-label="Specialized Services"
          />
        </div>
        <div className="max-w-[465px]">
          <h2 className="text-h1 font-semibold text-gray-900 mb-6 ">Specialized services to support your success</h2>
          <p className="text-b5 text-gray-600 mb-6">
            Integrated health physics expertise and regulatory support to help you meet safety standards, optimize shielding, and maintain confident compliance across all major authorities.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="primaryDefault" className="text-md font-medium pt-[13px] pb-[15px]">
              Learn more about our services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
