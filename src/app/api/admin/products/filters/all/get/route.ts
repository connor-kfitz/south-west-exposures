import pool from "@/lib/db";

export async function GET() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const queries = {
      isotopes: `SELECT isotope_id AS id, name FROM isotopes ORDER BY name`,
      volumes: `SELECT volume_id AS id, name FROM volumes ORDER BY name`,
      accessories: `SELECT accessory_id AS id, name FROM accessories ORDER BY name`,
      shields: `SELECT shield_id AS id, name FROM shields ORDER BY name`,
      usage: `SELECT usage_id AS id, name FROM usages ORDER BY name`,
    };

    const filterEntries = await Promise.all(
      Object.entries(queries).map(async ([key, query]) => {
        const result = await client.query(query);
        return { name: key, values: result.rows };
      })
    );

    await client.query('COMMIT');

    return new Response(JSON.stringify(filterEntries), {
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
