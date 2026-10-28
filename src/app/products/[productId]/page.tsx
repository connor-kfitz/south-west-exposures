import ProductOverview from "@/components/products/overview/ProductOverview";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProductIds } from "@/lib/productQueries";

export const revalidate = 3600;

export async function generateMetadata({ params }: {params: Promise<{ productId: string }>}): Promise<Metadata> {
  const { productId } = await params

  const product = await getProductById(productId);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description || "",
  }
}

export async function generateStaticParams() {
  try {
    const productIds = await getProductIds();

    return productIds.map((productId) => ({ productId }));

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

  const product = await getProductById(productId);
  if (!product) notFound();

  return <ProductOverview product={product}/>
}
