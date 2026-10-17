export type ProductCategoryCrop = {
  box: { left: number; top: number; width: number; height: number };
  image: { left: string; top: string; width: string; height: string };
}

export type ProductCategory = {
  name: string;
  href: string;
  imageSrc: string;
  crop: ProductCategoryCrop;
  filter: { group: string; value: string } | null;
}
