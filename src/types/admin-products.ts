export type ProductAttributeTypes = "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages";

export type ProductAttribute = {
  id: string;
  name: string;
}

export type ProductImage = {
  id: string;
  blob: string;
  src: string;
}

export type ProductFaq = {
  question: string;
  answer: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  material: string;
}
