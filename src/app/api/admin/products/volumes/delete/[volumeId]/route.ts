import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: Promise<{ volumeId: string }> }) {

  const { volumeId } = await params;

  if (!volumeId) {
    return new Response(JSON.stringify({ message: 'Volume Id is required.' }), {
      status: 400,
    });
  }

  try {
    const checkQuery = 'SELECT COUNT(*) FROM products_volumes WHERE volume_id = $1';
    const checkValues = [volumeId];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (parseInt(checkResult.rows[0].count) > 0) {
      return new Response(
        JSON.stringify(
          { message: 'This volume is currently in use by one or more products. Please remove it from all products before proceeding with the deletion.' }),
          { status: 400 }
      );
    }

    const query = 'DELETE FROM volumes WHERE volume_id = $1 RETURNING *';
    const values = [volumeId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Volume not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Volume deleted successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
