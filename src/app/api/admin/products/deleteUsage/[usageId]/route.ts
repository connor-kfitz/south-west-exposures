import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { usageId: string } }) {

  const { usageId } = params;

  if (!usageId) {
    return new Response(JSON.stringify({ message: 'Usage Id is required.' }), {
      status: 400,
    });
  }

  try {
    const query = 'DELETE FROM usages WHERE usage_id = $1 RETURNING *';
    const values = [usageId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Usage not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Usage deleted successfully.' }),
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
