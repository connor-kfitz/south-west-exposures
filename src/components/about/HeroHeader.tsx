import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroHeader() {
  return (
    <header className="flex justify-center pb-[50px] md:pb-[135px]">
      <div className="w-full max-w-[1440px]">
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
      </div>
    </header>
  )
}
