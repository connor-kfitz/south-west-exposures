import { Button } from "../ui/button";
import Image from "next/image";

export default function HeroHeader() {
  return (
    <header className="flex justify-center pb-[135px]">
      <div className="w-full max-w-[1440px] relative">
        <div className="bg-hero-radial w-full max-w-[1060px] pt-[48px] pl-[144px] pb-[72px]">
          <h1 className="text-d1 font-bold text-white mb-6">
            Solutions
            <br/>
            for innovative
            <br/>
            drug therapies
          </h1>
          <p className="text-b5 text-white max-w-[564px] mb-6">South West Exposures is a firm specializing in the design and fabrication of disruptive shielding technology.</p>
          <Button variant="hero" size="hero" className="">Shop now</Button>
        </div>
        <Image
          src="/images/about/hero-product.png"
          alt="Isotope Shield"
          width={781}
          height={781}
          className="absolute bottom-[-218px] left-[740px] max-w-[781px] w-[54.23vw]"
        />
      </div>
    </header>
  )
}
