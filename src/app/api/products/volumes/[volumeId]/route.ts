import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'volumes',
  idColumn: 'volume_id',
  junctionTable: 'products_volumes',
  label: 'Volume',
  responseKey: 'volume'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ volumeId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { volumeId } = await params;
  return deleteAttribute(volumeId, config);
}
