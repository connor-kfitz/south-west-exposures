export type ProductAttributeTypes = "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages" | "Related Products";

export type ProductAttribute = {
  id: string;
  name: string;
}

export type ProductImage = {
  id?: string;
  file?: File | string | unknown;
  src?: string;
};

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
