import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { parseMarkdown, type MarkdownFrontmatter } from "./markdown.server";

export interface MarkdownArticle {
  slug: string;
  frontmatter: MarkdownFrontmatter;
  html: string;
}

export interface MarkdownArticleMeta {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  tags?: string[];
}

const CONTENT_DIR = join(process.cwd(), "content", "writing");

export async function getMarkdownArticles(): Promise<MarkdownArticleMeta[]> {
  "use server";

  try {
    const files = await readdir(CONTENT_DIR);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    const articles = await Promise.all(
      markdownFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = join(CONTENT_DIR, file);
        const content = await readFile(filePath, "utf-8");
        const { frontmatter } = await parseMarkdown(content);

        return {
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt,
          tags: frontmatter.tags,
          featured: frontmatter.featured ?? false,
        };
      }),
    );

    return articles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch (error) {
    console.error("Error loading markdown articles:", error);
    return [];
  }
}

export async function getMarkdownArticle(
  slug: string,
): Promise<MarkdownArticle | null> {
  "use server";

  try {
    const filePath = join(CONTENT_DIR, `${slug}.md`);
    const content = await readFile(filePath, "utf-8");
    const { frontmatter, html } = await parseMarkdown(content);

    return {
      slug,
      frontmatter,
      html,
    };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}
