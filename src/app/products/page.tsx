import ProductList from '@/components/products/list/ProductList';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Products",
  description: '...',
};

export default async function ProductsPage() {
  try {
    const [productsRes, filtersRes] = await Promise.all([
      fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get`),
      fetch(`${process.env.DOMAIN_NAME}/api/admin/products/filters/all/get`)
    ]);

    if (!productsRes.ok || !filtersRes.ok) {
      throw new Error(`Failed to fetch data. Products status: ${productsRes.status}, Filters status: ${filtersRes.status}`);
    }

    const products = await productsRes.json();
    const filters = await filtersRes.json();

    return <ProductList products={products} filters={filters}/>;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <div>
        <p>{errorMessage}</p>
      </div>
    )
  }
}
