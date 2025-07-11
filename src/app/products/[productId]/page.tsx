import ProductOverview from "@/components/products/overview/ProductOverview";
import { Product } from "@/types/admin-products";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function generateMetadata({ params }: {params: Promise<{ productId: string }>}): Promise<Metadata> {
  const { productId } = await params

  const product = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get/${productId}`, { headers: { Cookie: cookies().toString() } }).then((res) => res.json())

  return {
    title: product.name,
    description: product.description || "",
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get`, { headers: { Cookie: cookies().toString() } });
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
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get/${productId}`, { headers: { Cookie: cookies().toString() } });
    if (!response.ok) throw new Error(`Failed to fetch product, status: ${response.status}`);
  
    const product = await response.json();

    return <ProductOverview product={product}/>

  } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

     return (
       <div>
         <p>{errorMessage}</p>
       </div>
     )
  }
}
