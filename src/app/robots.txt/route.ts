const DOMAIN = process.env.DOMAIN_NAME || process.env.NEXT_PUBLIC_DOMAIN || process.env.VERCEL_URL || 'http://localhost:3000';

export async function GET() {
  const sitemapUrl = `${DOMAIN}/sitemap.xml`;

  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
