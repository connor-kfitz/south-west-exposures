import { getServerSession, Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/nextAuthOptions';

export async function requireSession(): Promise<Session | NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return session;
}
