import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src="/images/about/hero-product.png"
      alt="Isotope Shield"
      width={781}
      height={781}
      className="
        absolute
        origin-bottom
        w-[424px]
        left-[calc(50%_-_212px)]
        bottom-0
        scale-100
        translate-y-[calc(0.37*424px)]
        [will-change:translate,scale]

        min-[375px]:scale-[calc((424px_+_(100vw_-_375px)*0.347)/424px)]
        min-[375px]:translate-y-[calc(0.37*(424px_+_(100vw_-_375px)*0.347))]

        sm:origin-bottom-left
        sm:w-[516px]
        sm:left-0
        sm:bottom-[-26px]
        sm:scale-100
        sm:translate-x-[calc(50vw_-_60px_-_(100vw_-_1024px)*0.0588_+_(100vw_-_1280px)*0.15)]
        sm:translate-y-[calc(27%_-_(100vw_-_1024px)*0.0475)]

        md:w-[660px]
        md:left-[452px]
        md:scale-[calc((660px_+_(100vw_-_1024px)*0.5608)/660px)]
        md:translate-x-[calc(50vw_-_60px_-_(100vw_-_1024px)*0.0588_-_452px_+_(100vw_-_1280px)*0.02)]
        md:translate-y-[calc(0.27*(660px_+_(100vw_-_1024px)*0.5608)_-_(100vw_-_1024px)*0.0275_-_(100vw_-_1024px)*0.0235)]

        lg:translate-x-[calc(50vw_-_60px_-_(100vw_-_1024px)*0.0588_-_452px)]

        xl:w-[803px]
        xl:left-[calc(50%_-_75px)]
        xl:bottom-[-32px]
        xl:scale-100
        xl:translate-x-0
        xl:translate-y-[20%]

        min-[1440px]:bottom-[-32px]
        min-[1440px]:translate-y-[20%]
      "
    />
  );
}
