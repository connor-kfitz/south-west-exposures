import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src="/images/about/hero-product.png"
      alt="Isotope Shield"
      width={781}
      height={781}
      className="
        absolute transform
        
        w-[424px] max-w-[424px]
        bottom-0
        left-[50%]
        -translate-x-1/2
        translate-y-[37%]
        
        min-[375px]:w-[calc(424px+(100vw-375px)*0.347)]
        min-[375px]:max-w-[calc(424px+(100vw-375px)*0.347)]
        
        sm:max-w-[516px]
        sm:w-full
        sm:left-[calc(50%-60px-(100vw-1024px)*0.0588)]
        sm:translate-x-[calc((100vw-1280px)*0.15)]
        sm:translate-y-[calc(27%-(100vw-1024px)*0.0475)]
        sm:bottom-[calc(-26px-(100vw-1024px)*0.0235)]
        
        md:max-w-[calc(660px+(100vw-1024px)*0.5608)]
        md:left-[calc(50%-60px-(100vw-1024px)*0.0588)]
        md:translate-x-[calc((100vw-1280px)*0.02)]
        md:translate-y-[calc(27%-(100vw-1024px)*0.0275)]
        md:bottom-[calc(-26px-(100vw-1024px)*0.0235)]
        
        lg:translate-x-[calc((100vw-1280px)*0.00)]
        
        xl:max-w-[803px]
        xl:left-[calc(50%-75px)]
        xl:translate-x-[0%]
        xl:translate-y-[20%]
        xl:bottom-[-32px]
        
        min-[1440px]:!translate-y-[20%]
        min-[1440px]:!bottom-[-32px]
      "
    />
  );
}
