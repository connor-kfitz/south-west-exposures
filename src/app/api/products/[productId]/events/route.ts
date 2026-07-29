import pool from '@/lib/db';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const DEDUP_COOKIE = 'swe_viewed';
const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_TRACKED_PRODUCTS = 200;

type ViewedEntry = { productId: string; viewedAt: number };

export async function POST(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  
  const { productId } = await params;
  let type: string;

  try {
    ({ type } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (type !== 'view' && type !== 'inquiry') {
    return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
  }

  try {
    if (type === 'view') {
      const cookieStore = await cookies();
      const now = Date.now();

      let viewed: ViewedEntry[] = [];
      const raw = cookieStore.get(DEDUP_COOKIE)?.value;
      if (raw) {
        try {
          viewed = JSON.parse(raw);
        } catch {
          viewed = [];
        }
      }

      viewed = viewed.filter((entry) => now - entry.viewedAt < DEDUP_WINDOW_MS);

      if (viewed.some((entry) => entry.productId === productId)) {
        return NextResponse.json({ recorded: false });
      }

      await pool.query(
        `INSERT INTO product_events (product_id, event_type) VALUES ($1, 'view')`,
        [productId]
      );

      viewed.push({ productId, viewedAt: now });
      const trimmed = viewed.slice(-MAX_TRACKED_PRODUCTS);

      cookieStore.set(DEDUP_COOKIE, JSON.stringify(trimmed), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: DEDUP_WINDOW_MS / 1000
      });

      return NextResponse.json({ recorded: true });
    }

    await pool.query(
      `INSERT INTO product_events (product_id, event_type) VALUES ($1, 'inquiry')`,
      [productId]
    );

    return NextResponse.json({ recorded: true });
  } catch (error) {
    console.error('Error recording product event:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
