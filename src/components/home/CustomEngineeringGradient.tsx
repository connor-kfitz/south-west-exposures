import Image from "next/image";

interface CustomEngineeringGradientProps {
  className?: string;
}

export default function CustomEngineeringGradient({ className = "hidden sm:block absolute inset-x-0 bottom-0 h-[895px]" }: CustomEngineeringGradientProps) {
  return (
    <div
      aria-hidden
      className={`${className} pointer-events-none opacity-10 overflow-hidden z-0`}
      style={{
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14.24%)",
        maskImage: "linear-gradient(180deg, transparent 0%, black 14.24%)"
      }}
    >
      <Image
        src="/images/about/custom-engineering-gradient.png"
        alt=""
        fill
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 14.24%)"
        }}
      />
    </div>
  );
}
