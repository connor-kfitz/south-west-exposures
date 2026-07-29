import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { deleteAttribute } from '@/lib/attributeCrud';

const config = {
  table: 'isotopes',
  idColumn: 'isotope_id',
  junctionTable: 'products_isotopes',
  label: 'Isotope',
  responseKey: 'isotope'
}

export async function DELETE(req: Request, { params }: { params: Promise<{ isotopeId: string }> }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { isotopeId } = await params;
  return deleteAttribute(isotopeId, config);
}
