import Image from "next/image";

export default function AboutImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[2/1] overflow-hidden rounded-bl-[96px] ${className}`}>
      <Image
        src="/images/about/hero.png"
        alt="Technician in protective clothing loading a shield into pharmaceutical filling equipment"
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 1279px) 156vw, 1802px"
        className="absolute max-w-none left-[-29.37%] top-[-47.85%] w-[155.32%] h-[207.09%]"
      />
    </div>
  );
}
