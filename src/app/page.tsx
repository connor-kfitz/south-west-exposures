import About from "@/components/about/About";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About",
  description: '...'
}

export default async function AboutPage() {

  try {

    // Headers are used to send authentication cookies to the API
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/admin/products/popular/get`, {
      headers: { Cookie: cookies().toString() },
    });

    if (!response.ok) throw new Error(`Failed to fetch popular products, status: ${response.status}`);
  
    const popularProducts = await response.json();

    return <main className="bg-gray-50 relative overflow-hidden"><About popularProducts={popularProducts}/></main>

  } catch {

     return <main><About popularProducts={[]}/></main>
  }
}
