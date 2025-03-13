import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Isotope name is required' }, { status: 400 });
    }

    const checkResult = await pool.query('SELECT * FROM isotopes WHERE name = $1', [name]);

    if (checkResult.rows.length > 0) {
      return NextResponse.json({ error: 'Duplicate Name' }, { status: 409 });
    }

    const result = await pool.query(
      'INSERT INTO isotopes (name) VALUES ($1) RETURNING *',
      [name]
    );

    return NextResponse.json({ message: 'Isotope created', isotope: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
