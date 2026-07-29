import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { createAttribute, listAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'shields',
  idColumn: 'shield_id',
  junctionTable: 'products_shields',
  label: 'Shield',
  responseKey: 'shield'
}

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  return listAttribute(config);
}

export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  return createAttribute(req, config);
}
