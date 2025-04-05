export const revalidate = 0;

import { Product } from "@/types/admin-products";

export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/products/get');
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
    
    const products = await response.json();

    return products.map((product: Product) => ({
      slug: product.id.toString()
    }));

  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{productId: string}>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  try {
    const response = await fetch(`http://localhost:3000/api/admin/products/get/${productId}`);
    if (!response.ok) throw new Error(`Failed to fetch product, status: ${response.status}`);
  
    const product = await response.json();

    return (
      <div>{product.name}</div>
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
