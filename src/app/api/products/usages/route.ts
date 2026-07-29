import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { createAttribute, listAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'usages',
  idColumn: 'usage_id',
  junctionTable: 'products_usages',
  label: 'Usage',
  responseKey: 'usage'
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
