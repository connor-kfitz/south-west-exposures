import { getProducts } from "@/lib/productQueries";

export async function GET() {
  try {
    const products = await getProducts();

    return new Response(JSON.stringify(products), {
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
