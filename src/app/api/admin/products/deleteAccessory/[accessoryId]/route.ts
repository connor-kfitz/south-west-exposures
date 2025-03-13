import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { accessoryId: string } }) {

  const { accessoryId } = params;

  if (!accessoryId) {
    return new Response(JSON.stringify({ message: 'Accessory Id is required.' }), {
      status: 400,
    });
  }

  try {
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
