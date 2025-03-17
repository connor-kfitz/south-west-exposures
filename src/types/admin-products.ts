export type ProductAttributeTypes = "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages" | "Related Products";

export type ProductAttribute = {
  id: string;
  name: string;
}

export type ProductImage = {
  id: string;
  file: File;
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

export type Filter = {
  id: string;
  name: string;
}

export type Specifications = Record<string, {
  weight: string;
  height: string;
  innerDiameter: string;
  outerDiameter: string;
  shieldingSide: string;
  shieldingSidePbEquiv: string;
  topShield: string;
  topShieldPbEquiv: string;
  bottom: string;
  bottomPbEquiv: string;
}>
