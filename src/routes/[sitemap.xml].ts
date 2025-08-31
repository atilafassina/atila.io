import { readdir } from "fs/promises";
import { resolve } from "path";

const root = process.cwd();

function isRoute(fileName: string) {
  return !fileName.startsWith("[");
}

async function getRoutes(): Promise<string[]> {
  const files = await readdir(resolve(root, "src", "routes"));

  return await Promise.all(
    files.filter(isRoute).map(async (pageFile) => {
      return `https://atila.io/${pageFile.replace(
        /^\/?index\.tsx|\.tsx$/,
        ""
      )}`;
    })
  );
}

export async function GET() {
  const routes = await getRoutes();
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
