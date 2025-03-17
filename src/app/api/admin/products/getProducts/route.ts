import pool from "@/lib/db";

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT 
        product_id AS id,
        name,
        description,
        features,
        material
      FROM public.products
      ORDER BY product_id ASC
    `;

    const result = await client.query(query);

    if (result.rows.length >= 0) {
      return new Response(JSON.stringify(result.rows), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
