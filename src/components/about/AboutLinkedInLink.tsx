import Image from "next/image";
import Link from "next/link";

type AboutLinkedInLinkProps = {
  href: string;
  children: React.ReactNode;
}

export default function AboutLinkedInLink({ href, children }: AboutLinkedInLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 text-b6 text-blue-600 hover:underline focus-visible:underline
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-[4px]"
    >
      <Image src="/images/about/linkedin.svg" alt="" width={24} height={24} className="shrink-0"/>
      {children}
    </Link>
  );
}
