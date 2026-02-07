import type { APIRoute } from 'astro';

function sitemapAliasXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>https://drluca.dental/sitemap-index.xml</loc>\n  </sitemap>\n</sitemapindex>\n`;
}

export const GET: APIRoute = () => {
  return new Response(sitemapAliasXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
