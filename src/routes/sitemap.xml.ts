function getRoutes(): string[] {
  const routeModules = import.meta.glob("./*.tsx", { eager: true });
  
  return Object.keys(routeModules)
    .filter((path) => !path.includes("[")) // exclude dynamic routes like [...404]
    .map((path) => {
      const fileName = path.replace("./", "").replace(".tsx", "");
      const route = fileName === "index" ? "" : fileName;
      return `https://atila.io/${route}`;
    });
}

export function GET() {
  const routes = getRoutes();
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${route}</loc>
          <lastmod>2005-01-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
    `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
