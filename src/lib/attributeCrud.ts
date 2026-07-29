import pool from '@/lib/db';

import { NextResponse } from 'next/server';

export interface AttributeConfig {
  table: string;
  idColumn: string;
  junctionTable: string;
  label: string;
  responseKey: string;
}

export async function listAttribute(config: AttributeConfig): Promise<Response> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT ${config.idColumn} AS id, name FROM ${config.table} ORDER BY ${config.idColumn}`
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function createAttribute(req: Request, config: AttributeConfig): Promise<Response> {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: `${config.label} name is required` }, { status: 400 });
    }

    const checkResult = await pool.query(`SELECT * FROM ${config.table} WHERE name = $1`, [name]);

    if (checkResult.rows.length > 0) {
      return NextResponse.json({ error: 'Duplicate Name' }, { status: 409 });
    }

    const result = await pool.query(
      `INSERT INTO ${config.table} (name) VALUES ($1) RETURNING *`,
      [name]
    );

    return NextResponse.json(
      { message: `${config.label} created`, [config.responseKey]: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}

export async function deleteAttribute(id: string, config: AttributeConfig): Promise<Response> {
  if (!id) {
    return NextResponse.json({ message: `${config.label} Id is required.` }, { status: 400 });
  }

  try {
    const checkResult = await pool.query(
      `SELECT COUNT(*) FROM ${config.junctionTable} WHERE ${config.idColumn} = $1`,
      [id]
    );

    if (parseInt(checkResult.rows[0].count) > 0) {
      return NextResponse.json(
        {
          message: `This ${config.label.toLowerCase()} is currently in use by one or more products. Please remove it from all products before proceeding with the deletion.`
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `DELETE FROM ${config.table} WHERE ${config.idColumn} = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: `${config.label} not found.` }, { status: 404 });
    }

    return NextResponse.json({ message: `${config.label} deleted successfully.` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
