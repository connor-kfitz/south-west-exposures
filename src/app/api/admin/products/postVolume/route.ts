import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { value } = await req.json();

    if (!value) {
      return NextResponse.json({ error: 'Volume value is required' }, { status: 400 });
    }

    const checkResult = await pool.query('SELECT * FROM volumes WHERE value = $1', [value]);

    if (checkResult.rows.length > 0) {
      return NextResponse.json({ error: 'Duplicate Value' }, { status: 409 });
    }

    const result = await pool.query(
      'INSERT INTO volumes (value) VALUES ($1) RETURNING *',
      [value]
    );

    return NextResponse.json({ message: 'Volume created', volume: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
