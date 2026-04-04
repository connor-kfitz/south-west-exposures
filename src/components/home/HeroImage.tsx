import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src="/images/about/hero-product.png"
      alt="Isotope Shield"
      width={781}
      height={781}
      className="hidden absolute left-1/2 transform max-w-[781px] w-[63.5vw] translate-x-[-62px] top-[5vw] aboutBpHeroSlide:top-0 aboutBpHeroSlide:w-full aboutCenterContent:block"
    />
  )
}
