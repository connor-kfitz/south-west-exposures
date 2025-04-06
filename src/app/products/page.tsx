import { Product } from "@/types/admin-products";
import type { Metadata } from 'next'

export const revalidate = 0;

// Todo: Add metadata
export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default async function ProductsPage() {
  try {
    const response = await fetch("http://localhost:3000/api/admin/products/get");
    if (!response.ok) throw new Error(`Failed to fetch products, status: ${response.status}`);
    const products = await response.json();

    return products.map((product: Product, index: number) => 
      <div key={index}>
        {product.name}
      </div>
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
