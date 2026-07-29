import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'shields',
  idColumn: 'shield_id',
  junctionTable: 'products_shields',
  label: 'Shield',
  responseKey: 'shield'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ shieldId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { shieldId } = await params;
  return deleteAttribute(shieldId, config);
}
