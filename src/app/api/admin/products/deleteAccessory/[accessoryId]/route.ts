import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { accessoryId: string } }) {

  const { accessoryId } = await params;

  if (!accessoryId) {
    return new Response(JSON.stringify({ message: 'Accessory Id is required.' }), {
      status: 400,
    });
  }

  try {
    const checkQuery = 'SELECT COUNT(*) FROM products_accessories WHERE accessory_id = $1';
    const checkValues = [accessoryId];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (parseInt(checkResult.rows[0].count) > 0) {
      return new Response(
        JSON.stringify(
          { message: 'This accessory is currently in use by one or more products. Please remove it from all products before proceeding with the deletion.' }),
          { status: 400 }
      );
    }

    const query = 'DELETE FROM accessories WHERE accessory_id = $1 RETURNING *';
    const values = [accessoryId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Accessory not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Accessory deleted successfully.' }),
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
