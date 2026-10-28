import { getAllFilters } from "@/lib/productQueries";

export async function GET() {
  try {
    const filterEntries = await getAllFilters();

    return new Response(JSON.stringify(filterEntries), {
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
