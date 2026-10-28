import About from "@/components/about/About";
import { Metadata } from "next";
import { getPopularProducts } from "@/lib/productQueries";

export const revalidate = 3600;

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

export default async function AboutPage() {
  const popularProducts = await getPopularProducts();

  return <main className="bg-gray-50 relative overflow-hidden"><About popularProducts={popularProducts}/></main>
}
