import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'customization_options',
  idColumn: 'customization_option_id',
  junctionTable: 'products_customization_options',
  label: 'Customization Option',
  responseKey: 'customizationOption'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ customizationOptionId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { customizationOptionId } = await params;
  return deleteAttribute(customizationOptionId, config);
}
