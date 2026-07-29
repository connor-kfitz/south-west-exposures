import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'accessories',
  idColumn: 'accessory_id',
  junctionTable: 'products_accessories',
  label: 'Accessory',
  responseKey: 'accessory'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ accessoryId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { accessoryId } = await params;
  return deleteAttribute(accessoryId, config);
}
