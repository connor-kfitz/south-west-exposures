import ProductList from '@/components/products/list/ProductList';
import type { Metadata } from 'next';
import { getAllFilters, getProducts } from "@/lib/productQueries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products",
  description: '...',
};

export default async function ProductsPage() {
  const [products, filters] = await Promise.all([getProducts(), getAllFilters()]);

  return <ProductList products={products} filters={filters}/>;
}
