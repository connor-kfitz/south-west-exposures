import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: Promise<{ customizationOptionId: string }> }) {
  const { customizationOptionId } = await params;

  if (!customizationOptionId) {
    return new Response(JSON.stringify({ message: 'Customization Option Id is required.' }), {
      status: 400,
    });
  }

  try {
    const checkQuery = 'SELECT COUNT(*) FROM products_customization_options WHERE customization_option_id = $1';
    const checkValues = [customizationOptionId];

    const checkResult = await pool.query(checkQuery, checkValues);

    if (parseInt(checkResult.rows[0].count) > 0) {
      return new Response(
        JSON.stringify({
          message: 'This customization option is currently in use by one or more products. Please remove it from all products before proceeding with the deletion.'
        }),
        { status: 400 }
      );
    }

    const query = 'DELETE FROM customization_options WHERE customization_option_id = $1 RETURNING *';
    const values = [customizationOptionId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Customization option not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Customization option deleted successfully.' }),
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
