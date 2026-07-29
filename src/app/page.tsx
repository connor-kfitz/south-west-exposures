import Home from "@/components/home/Home";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const revalidate = 0;

// Build a canonical site domain to use for the page canonical link.
const rawDomain = process.env.DOMAIN_NAME || process.env.NEXT_PUBLIC_DOMAIN || process.env.VERCEL_URL || 'http://localhost:3000';
const DOMAIN = rawDomain.startsWith('http') ? rawDomain.replace(/\/+$/g, '') : `https://${rawDomain.replace(/\/+$/g, '')}`;

export const metadata: Metadata = {
  title: "South West Exposures",
  description: "Solutions for innovative drug therapies. South West Exposures is a firm specializing in the design and fabrication of disruptive shielding technology.",
  alternates: {
    canonical: DOMAIN,
  }
}

export default async function HomePage() {

  try {

    const cookieStore = await cookies();

    // Headers are used to send authentication cookies to the API
    const response = await fetch(`${process.env.DOMAIN_NAME}/api/products/popular`, {
      headers: { Cookie: cookieStore.toString() }
    });

    if (!response.ok) throw new Error(`Failed to fetch popular products, status: ${response.status}`);
  
    const popularProducts = await response.json();

    return <main className="bg-gray-50 relative overflow-hidden"><Home popularProducts={popularProducts}/></main>

  } catch {

    return <main><Home popularProducts={[]}/></main>
  }
}
