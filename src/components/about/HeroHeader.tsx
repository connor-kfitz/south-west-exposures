import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function HeroHeader() {
  return (
    <header className="flex justify-center pb-[50px] md:pb-[135px]">
      <div className="w-full max-w-[1440px] relative">
        <div className="flex justify-center px-6 bg-hero-radial w-full max-w-[1060px] pt-[48px] pb-[72px] aboutCenterContent:pl-[144px] aboutCenterContent:block">
          <div className="max-w-[663px]">
            <h1 className="text-d1 font-bold text-white mb-6">
              Solutions
              <br/>
              for innovative
              <br/>
              drug therapies
            </h1>
            <p className="text-b5 text-white max-w-[564px] mb-6">South West Exposures is a firm specializing in the design and fabrication of disruptive shielding technology.</p>
            <Link href="/products"><Button variant="hero" size="hero" className="">Shop now</Button></Link>
          </div>
        </div>
        <Image
          src="/images/about/hero-product.png"
          alt="Isotope Shield"
          width={781}
          height={781}
          className="hidden absolute bottom-[-218px] left-[53vw] max-w-[781px] w-[54.23vw] aboutBpHeroSlide:left-[720px] aboutBpHeroSlide:block"
        />
      </div>
    </header>
  )
}
