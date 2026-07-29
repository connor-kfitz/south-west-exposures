import Image from "next/image";
import CustomEngineeringGradient from "./CustomEngineeringGradient";

export default function CustomEngineeringImage() {
  return (
    <div aria-hidden className="
      relative sm:absolute
      left-[50%]
      -translate-x-1/2
      w-full
      h-auto
      mb-4
      [will-change:translate,scale]

      sm:w-[560px]
      sm:mb-0
      sm:h-[565px]
      sm:bottom-[-160px]
      sm:left-[calc(50%+40px)]

      md:w-[700px]
      md:h-[706px]
      md:bottom-[-155.275px]
      md:left-[calc(50%+150px)]
      md:origin-bottom
      md:scale-[calc((700px_+_(100vw_-_1024px)*0.633)/700px)]
      md:translate-x-[calc(-50%_+_(100vw_-_1024px)*0.05)]
      md:translate-y-[calc((100vw_-_1024px)*-0.005)]

      lg:translate-y-[calc((100vw_-_1024px)*0.3075)]

      xl:w-[862px]
      xl:h-[869px]
      xl:bottom-[-234px]
      xl:left-[calc(50%+166px)]
      xl:scale-100
      xl:-translate-x-1/2
      xl:translate-y-0

      min-[1440px]:h-[869px]
      min-[1440px]:bottom-[-234px]

      pointer-events-none
      z-20
    ">
      <Image src="/images/about/custom-engineering.png" alt="Vial Shield" width={862} height={869} className="w-[87.2%] sm:w-full mx-auto object-contain" priority/>
      <CustomEngineeringGradient className="sm:hidden absolute inset-x-0 bottom-[28%] h-[500px]"/>
    </div>
  );
}
