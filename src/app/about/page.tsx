import About from "@/components/about/About";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About",
  description: '...',
};

export default async function AboutPage() {

  try {
    console.log(process.env.DOMAIN_NAME);

    const response = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/get/popular`);
    if (!response.ok) throw new Error(`Failed to fetch popular products, status: ${response.status}`);
  
    const popularProducts = await response.json();

    return <main className="bg-gray-50 relative overflow-hidden"><About popularProducts={popularProducts}/></main>

  } catch {

     return <main><About popularProducts={[]}/></main>
  }
}
