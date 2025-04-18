import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 });
  }

  const fileBuffer = await request.arrayBuffer();

  const blob = await put(filename, fileBuffer, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
