import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { volumeId: string } }) {

  const { volumeId } = params;

  if (!volumeId) {
    return new Response(JSON.stringify({ message: 'Volume Id is required.' }), {
      status: 400,
    });
  }

  try {
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
