import Image from "next/image";

export default function CustomEngineeringImage() {
  return (
    <div aria-hidden className="absolute left-[calc(50%+166px)] transform -translate-x-1/2 bottom-[-234px] w-[862px] h-[869px] pointer-events-none z-20">
      <Image src="/images/about/custom-engineering.png" alt="Vial Shield" width={862} height={869} className="object-contain" priority/>
    </div>
  );
}
