import Image from "next/image";

export default function AboutGradient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-screen aspect-[1440/1377] opacity-10 ${className}`}
    >
      <Image
        src="/images/about/gradient.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover -scale-y-100"
      />
    </div>
  );
}
