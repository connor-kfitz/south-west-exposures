import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { shieldId: string } }) {
  
  const { shieldId } = params; 

  if (!shieldId) {
    return new Response(JSON.stringify({ message: 'Shield Id is required.' }), {
      status: 400,
    });
  }

  try {
    const query = 'DELETE FROM shields WHERE shield_id = $1 RETURNING *';
    const values = [shieldId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Shield not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Shield deleted successfully.' }),
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
