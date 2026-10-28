import { getPopularProducts } from "@/lib/productQueries";

export async function GET() {
  try {
    const popularProducts = await getPopularProducts();

    return new Response(JSON.stringify(popularProducts), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
