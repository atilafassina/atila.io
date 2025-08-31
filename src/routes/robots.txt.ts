export function GET() {
  return new Response(
    `
User-agent: *
Allow: /

Sitemap: https://atila.io/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
