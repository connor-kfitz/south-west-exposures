import pool from '@/lib/db';

const rawDomain = process.env.DOMAIN_NAME || process.env.NEXT_PUBLIC_DOMAIN || process.env.VERCEL_URL || 'http://localhost:3000';
const DOMAIN = rawDomain.startsWith('http') ? rawDomain.replace(/\/+$/g, '') : `https://${rawDomain.replace(/\/+$/g, '')}`;

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
    }
    return c;
  });
}

async function getProducts() {
  const client = await pool.connect();
  try {
    const res = await client.query(`SELECT product_id AS id, name FROM products ORDER BY product_id ASC`);
    return res.rows as Array<{ id: number; name: string }>;
  } catch (err) {
    console.error('sitemap: failed to load products', err);
    return [];
  } finally {
    client.release();
  }
}

export async function GET() {
  const staticPaths = [
    { path: '', priority: 1.0 },
    { path: 'products', priority: 0.8 },
    { path: 'contact', priority: 0.6 }
  ];

  const products = await getProducts();

  const urls = [
    ...staticPaths.map(p => ({
      loc: new URL(p.path, DOMAIN).toString(),
      lastmod: new Date().toISOString().split('T')[0],
      priority: p.priority,
    })),
    ...products.map(p => ({
      loc: new URL(`products/${p.id}`, DOMAIN).toString(),
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.7,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urls.map(u => `  <url>
                    <loc>${escapeXml(u.loc)}</loc>
                    <lastmod>${u.lastmod}</lastmod>
                    <priority>${u.priority}</priority>
                  </url>`).join('\n')}
                </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
