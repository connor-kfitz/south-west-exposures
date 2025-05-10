import { TopNavLink, TopNavSocialLink } from "@/types/top-nav";

export const specificationTableBase = [
  ["Volume (mL)"],
  ["Weight (lbs)"],
  ["Height (in)"],
  ["ID (in)"],
  ["OD (in)"],
  ["Shielding side (in)", "Pb equiv (in)"],
  ["Top shield (in)", "Pb equiv (in)"],
  ["Bottom (in)", "Pb equiv (in)"],
];

export const navLinks: TopNavLink[] = [
  { name: "About Us", href: "/" },
  { name: "Products", href: "/products" },
  // { name: "News", href: "/news" },
  { name: "Contact Us", href: "/contact" }
];

export const socialLinks: TopNavSocialLink[] = [
  { path: "/images/top-nav/linkedin.svg", alt: "Linkedin Logo", size: 24, href: "/" },
  // { path: "/images/top-nav/shopping-bag.svg", alt: "Shopping Bag", size: 24, href: "/" }
];
