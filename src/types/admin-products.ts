export type ProductAttributeTypes = 
  "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages" | 
  "Related Products" | "Purchased Together" | "Customization Options";

export type ProductAttribute = {
  id: string;
  name: string;
  image?: string;
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
  relatedProducts: ProductPreview[];
  purchasedTogether: ProductAttribute[];
  shields: ProductAttribute[];
  specifications: ProductSpecification[];
  customizationOptions: ProductAttribute[];
  usages: ProductAttribute[];
  volumes: ProductAttribute[];
  createdAt: Date;
}

export type ProductPreview = {
  id: string;
  name: string;
  images: ProductImage[];
  isotopes: ProductAttribute[];
  shields: ProductAttribute[];
  volumes: ProductAttribute[];
}

export type Filter = {
  id: string;
  name: string;
  selected?: boolean;
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
  volume?: string;
}
