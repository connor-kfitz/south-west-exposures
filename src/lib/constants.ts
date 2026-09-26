import { TopNavLink, TopNavSocialLink } from "@/types/top-nav";

export const specificationTableBase = [
  ["Volume (mL)"],
  ["Weight (lbs)"],
  ["Height (in)"],
  ["ID (in)"],
  ["OD (in)"],
  ["Shielding side (in)", "Pb equiv (in)"],
  ["Top shield (in)", "Pb equiv (in)"],
  ["Bottom (in)", "Pb equiv (in)"]
];

export const navLinks: TopNavLink[] = [
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" }
];

export const socialLinks: TopNavSocialLink[] = [
  { path: "/images/top-nav/linkedin.svg", alt: "Linkedin Logo", size: 24, href: "https://www.linkedin.com/in/swexposures" }
];

export const linkedInLinks = {
  company: "https://www.linkedin.com/in/southwestexposures",
  founder: "https://www.linkedin.com/in/robert-kamen-23028b29"
}
