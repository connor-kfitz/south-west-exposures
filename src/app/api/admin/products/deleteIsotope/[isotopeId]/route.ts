import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { isotopeId: string } }) {

  const { isotopeId } = params;

  if (!isotopeId) {
    return new Response(JSON.stringify({ message: 'Isotope Id is required.' }), {
      status: 400,
    });
  }

  try {
    const query = 'DELETE FROM isotopes WHERE isotope_id = $1 RETURNING *';
    const values = [isotopeId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Isotope not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Isotope deleted successfully.' }),
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
