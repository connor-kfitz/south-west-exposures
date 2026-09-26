import Image from "next/image";

export default function AboutPortrait({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-h-[364px] max-w-[364px] aspect-square overflow-hidden rounded-full ${className}`}
      style={{ background: "linear-gradient(to bottom, rgba(225,219,234,0.85) 0%, rgba(181,196,224,0.85) 100%)" }}
    >
      <Image
        src="/images/about/robert-kamen.png"
        alt="Robert Kamen, Founder and Chief Executive Officer"
        width={1109}
        height={832}
        sizes="940px"
        className="absolute max-w-none -scale-x-100 left-[-81.9%] top-[9.64%] w-[258.3%] h-[188.74%]"
      />
    </div>
  );
}
