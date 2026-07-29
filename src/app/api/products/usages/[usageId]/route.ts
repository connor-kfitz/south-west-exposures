import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'usages',
  idColumn: 'usage_id',
  junctionTable: 'products_usages',
  label: 'Usage',
  responseKey: 'usage'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ usageId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { usageId } = await params;
  return deleteAttribute(usageId, config);
}
