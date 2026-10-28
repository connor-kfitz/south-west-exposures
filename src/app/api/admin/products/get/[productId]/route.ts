import { getProductById } from "@/lib/productQueries";

export async function GET(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  try {
    const product = await getProductById(productId);

    if (!product) {
      return new Response(
        JSON.stringify({ message: 'Product not found.' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(product), {
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
