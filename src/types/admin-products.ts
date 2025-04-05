export type ProductAttributeTypes = "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages" | "Related Products";

export type ProductAttribute = {
  id: string;
  name: string;
}

export type ProductImage = {
  id: string;
  file?: File | string | unknown;
  src?: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
}

export type Product = {
  id: string;
  accessories: ProductAttribute[];
  description: string;
  faqs: ProductFaq[];
  features: string[];
  images: ProductImage[];
  isotopes: ProductAttribute[];
  material: string;
  name: string;
  relatedProducts: ProductAttribute[];
  shields: ProductAttribute[];
  specifications: ProductSpecification[];
  usages: ProductAttribute[];
  volumes: ProductAttribute[];
}

export type Filter = {
  id: string;
  name: string;
}

export type ProductSpecification = {
  volumeId: string;
  bottom: number;
  bottomPbEquiv: number;
  height: number;
  innerDiameter: number;
  outerDiameter: number;
  shieldingSide: number;
  shieldingSidePbEquiv: number;
  topShield: number;
  topShieldPbEquiv: number;
  weight: number;
}
