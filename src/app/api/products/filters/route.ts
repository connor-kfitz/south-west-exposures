import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT filter_id AS id, name
      FROM filters
      ORDER BY filter_id
    `;

    const result = await client.query(query);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    client.release();
  }
}
