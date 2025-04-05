import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: Promise<{ isotopeId: string }> }) {

  const { isotopeId } = await params;

  if (!isotopeId) {
    return new Response(JSON.stringify({ message: 'Isotope Id is required.' }), {
      status: 400,
    });
  }

  try {
    const checkQuery = 'SELECT COUNT(*) FROM products_isotopes WHERE isotope_id = $1';
    const checkValues = [isotopeId];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (parseInt(checkResult.rows[0].count) > 0) {
      return new Response(
        JSON.stringify(
          { message: 'This isotope is currently in use by one or more products. Please remove it from all products before proceeding with the deletion.' }),
          { status: 400 }
        );
    }

    const query = 'DELETE FROM isotopes WHERE isotope_id = $1 RETURNING *';
    const values = [isotopeId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify(
          { message: 'Isotope not found.' }),
          { status: 404 }
        );
    }

    return new Response(
      JSON.stringify(
        { message: 'Isotope deleted successfully.' }),
        { status: 200 }
      );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(
        { message: 'Internal server error.' }),
        { status: 500 }
      );
  }
}
