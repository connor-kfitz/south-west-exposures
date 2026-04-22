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
        
        w-full max-w-[340px]
        bottom-0
        left-[50%]
        -translate-x-1/2
        translate-y-[36%]
        
        sm:max-w-[480px]
        sm:translate-y-[34%]
        sm:bottom-[-5px]
        
        md:max-w-[560px]
        md:left-[calc(50%-40px)]
        md:-translate-x-[20%]
        md:translate-y-[31%]
        md:bottom-[-12px]
        
        lg:max-w-[660px]
        lg:left-[calc(50%-60px)]
        lg:-translate-x-[10%]
        lg:translate-y-[27%]
        lg:bottom-[-26px]
        
        xl:max-w-[740px]
        xl:-translate-x-[3%]
        xl:translate-y-[23%]
        xl:bottom-[-38px]
        
        min-[1440px]:!min-w-[803px]
        min-[1440px]:!translate-y-[20%]
        min-[1440px]:!translate-x-[0%]
        min-[1440px]:!left-[calc(50%-75px)]
        min-[1440px]:!bottom-[-32px]
      "
    />
  );
}
