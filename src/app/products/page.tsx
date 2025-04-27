import { Product } from "@/types/admin-products";
import type { Metadata } from 'next'
import Link from "next/link";

export const revalidate = 0;

// Todo: Add metadata
export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default async function ProductsPage() {
  try {
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get`);
    if (!response.ok) throw new Error(`Failed to fetch products, status: ${response.status}`);
    const products = await response.json();

    return products.map((product: Product, index: number) => 
      <Link key={index} className="block p-3 m-2 bg-gray-100" href={`/products/${product.id}`}>{product.name}</Link>
    )

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <div>
        <p>{errorMessage}</p>
      </div>
    )
  }
}
