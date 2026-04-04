import Image from "next/image";

export default function CustomEngineeringImage() {
  return (
    <div aria-hidden className="absolute right-[126px] bottom-[-234px] w-[862px] h-[869px] pointer-events-none z-20">
      <Image src="/images/about/custom-engineering.png" alt="Vial Shield" width={862} height={869} className="object-contain" priority/>
    </div>
  );
}
