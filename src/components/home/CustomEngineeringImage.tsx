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
      
      sm:w-[560px]
      sm:mb-0
      sm:h-[565px]
      sm:bottom-[-160px]
      sm:left-[calc(50%+40px)]
      
      md:w-[calc(700px+(100vw-1024px)*0.633)]
      md:h-[calc(706px+(100vw-1024px)*0.637)]
      md:bottom-[calc(-154px+(100vw-1279px)*.005)]
      md:left-[calc(50%+150px+(100vw-1024px)*0.05)]
      
      lg:bottom-[calc(-155.28px-(100vw-1024px)*0.3075)]
      
      xl:w-[862px]
      xl:h-[869px]
      xl:bottom-[-234px]
      xl:left-[calc(50%+166px)]
      
      min-[1440px]:!h-[869px]
      min-[1440px]:!bottom-[-234px]
      
      pointer-events-none 
      z-20
    ">
      <Image src="/images/about/custom-engineering.png" alt="Vial Shield" width={862} height={869} className="w-[87.2%] sm:w-full mx-auto object-contain" priority/>
      <CustomEngineeringGradient className="sm:hidden absolute inset-x-0 bottom-[28%] h-[500px]"/>
    </div>
  );
}
