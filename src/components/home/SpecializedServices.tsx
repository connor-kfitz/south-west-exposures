import Link from "next/link";

import { Button } from "../ui/button";

export default function SpecializedServices() {
  return (
    <section className="mb-[64px] sm:mb-[96px] px-[24px] sm:px-[48px]">
      <div className="max-w-[1160px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-[66px] justify-start items-center">
        <div className="flex justify-center md:justify-start w-[calc(100%+48px)] sm:w-full lg:w-1/2 -mx-[24px] sm:mx-0">
          <div
            className="
              w-full xl:max-w-[564px] 
              aspect-square sm:aspect-auto 
              sm:h-[649px] 
              rounded-none sm:rounded-[16px] 
              overflow-hidden 
              bg-[#F3F4F6] 
              bg-[length:208.622%_118.487%]
              bg-[position:calc(-264.04px-(100vw-375px)*0.6)_-0.373px] 
              sm:bg-cover sm:bg-center 
              lg:bg-[length:1345px_769px]
              lg:bg-[position:-600px_-30px]
              xl:bg-[length:238.516%_118.487%] 
              xl:bg-[position:-470.332px_-61.275px]
            "
            style={{
              backgroundImage: "url('/images/about/specialized-services.png')",
              transform: "scaleX(-1)"
            }}
            role="img"
            aria-label="Specialized Services"
          />
        </div>
        <div className="max-w-full xl:max-w-[465px] lg:w-1/2">
          <h2 className="text-h1 font-semibold text-gray-900 mb-6 ">Specialized services to support your success</h2>
          <p className="text-b5 text-gray-600 mb-6">
            Integrated health physics expertise and regulatory support to help you meet safety standards, optimize shielding, and maintain confident compliance across all major authorities.
          </p>
          <Link href="/contact" className="block w-full sm:w-auto">
            <Button variant="primary" size="primaryDefault" className="text-md font-medium pt-[13px] pb-[15px] w-full sm:w-auto">
              Learn more about our services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
