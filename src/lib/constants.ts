import { TopNavLink, TopNavSocialLink } from "@/types/top-nav";
import { ProductCategory, ProductCategoryCrop } from "@/types/product-category";

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
  { name: "Products", href: "/products", megaMenu: true },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact", mobileName: "Contact" }
];

export const socialLinks: TopNavSocialLink[] = [
  { path: "/images/top-nav/linkedin.svg", alt: "Linkedin Logo", size: 24, href: "https://www.linkedin.com/in/swexposures" }
];

export const linkedInLinks = {
  company: "https://www.linkedin.com/in/southwestexposures",
  founder: "https://www.linkedin.com/in/robert-kamen-23028b29"
}

const vialShieldsCrop: ProductCategoryCrop = {
  box: { left: 13.91, top: 44.25, width: 172.174, height: 119.131 },
  image: { left: "-35.15%", top: "-78.26%", width: "163.32%", height: "237.19%" }
}

export const productCategories: ProductCategory[] = [
  {
    name: "All products",
    href: "/products?category=all",
    imageSrc: "/images/products/categories/vial-shields.png",
    crop: vialShieldsCrop,
    filter: null
  },
  {
    name: "Vial shields",
    href: "/products?shields=vial",
    imageSrc: "/images/products/categories/vial-shields.png",
    crop: vialShieldsCrop,
    filter: { group: "shields", value: "vial" }
  },
  {
    name: "Lab & QA Products",
    href: "/products?shields=lab/qa",
    imageSrc: "/images/products/categories/lab-and-qa.png",
    crop: {
      box: { left: 13.04, top: 21.21, width: 186.957, height: 143.476 },
      image: { left: "-24.75%", top: "-35.91%", width: "142.24%", height: "185.9%" }
    },
    filter: { group: "shields", value: "lab/qa" }
  },
  {
    name: "Syringe shields",
    href: "/products?shields=syringe",
    imageSrc: "/images/products/categories/syringe-shields.png",
    crop: {
      box: { left: 47.78, top: 24.03, width: 145.217, height: 146.957 },
      image: { left: "-44.8%", top: "-28.31%", width: "146.32%", height: "144.35%" }
    },
    filter: { group: "shields", value: "syringe" }
  },
  {
    name: "Transport packaging",
    href: "/products?usages=shipping",
    imageSrc: "/images/products/categories/transport-packaging.png",
    crop: {
      box: { left: 27.82, top: 28.37, width: 172.175, height: 125.218 },
      image: { left: "-36.19%", top: "-44.74%", width: "152.46%", height: "208.42%" }
    },
    filter: { group: "usages", value: "shipping" }
  }
];
