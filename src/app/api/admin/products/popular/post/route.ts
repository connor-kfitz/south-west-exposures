import { NextResponse } from 'next/server';
import pool from '@/lib/db';

interface PopularProductInput {
  productId: string;
  order: number;
}

export async function POST(req: Request) {
  try {
    const data: PopularProductInput[] = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    await pool.query('DELETE FROM popular_products');

    if (data.length === 0) {
      return NextResponse.json({ message: 'Popular products cleared successfully' }, { status: 200 });
    }

    for (const item of data) {
      if (!item.productId || typeof item.order !== 'number') {
        return NextResponse.json({
          error: 'Each item must have a productId and order'
        }, { status: 400 });
      }
    }

    const values = data.flatMap((item) => [item.productId, item.order]);
    const valuePlaceholders = data
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(', ');

    const insertQuery = `
      INSERT INTO popular_products (product_id, "order")
      VALUES ${valuePlaceholders}
      RETURNING popular_product_id, product_id, "order";
    `;

    const result = await pool.query(insertQuery, values);

    return NextResponse.json({
      message: 'Popular products updated successfully',
      popularProducts: result.rows,
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
