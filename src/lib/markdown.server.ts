import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

export interface MarkdownFrontmatter {
  title: string;
  description?: string;
  publishedAt: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
}

export interface ParsedMarkdown {
  frontmatter: MarkdownFrontmatter;
  html: string;
  excerpt?: string;
}

export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  "use server";

  const { data, content: markdownContent } = matter(content);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdownContent);

  const html = String(result);

  return {
    frontmatter: data as MarkdownFrontmatter,
    html,
    excerpt: data.description || markdownContent.slice(0, 200),
  };
}
