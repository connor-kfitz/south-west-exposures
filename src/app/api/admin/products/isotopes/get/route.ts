import pool from "@/lib/db";

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT isotope_id AS id, name 
      FROM isotopes
      ORDER BY isotope_id
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