import { Title, Meta } from "@solidjs/meta";
import { useParams, createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { MainLayout } from "~/components/main-layout";
import { PageHeader } from "~/components/page-header";
import { MarkdownContent } from "~/components/markdown-content";
import { getMarkdownArticle } from "~/lib/article-loader.server";

const articleData = query(async (slug: string) => {
  "use server";
  return await getMarkdownArticle(slug);
}, "article");

export const route = {
  preload: async ({ params }) => articleData(params.slug),
} satisfies RouteDefinition;

export default function ArticlePage() {
  const params = useParams();
  const article = createAsync(() => articleData(params.slug));

  return (
    <MainLayout>
      <Show when={article()} fallback={<div>Article not found</div>}>
        {(data) => (
          <>
            <Title>{data().frontmatter.title} - Atila</Title>
            <Meta property="og:title" content={data().frontmatter.title} />
            <Meta property="twitter:title" content={data().frontmatter.title} />
            {data().frontmatter.description && (
              <>
                <Meta name="description" content={data().frontmatter.description} />
                <Meta property="og:description" content={data().frontmatter.description} />
                <Meta property="twitter:description" content={data().frontmatter.description} />
              </>
            )}

            <div class="w-11/12 mx-auto max-w-4xl py-12">
              <header class="mb-12">
                <PageHeader>{data().frontmatter.title}</PageHeader>
                {data().frontmatter.description && (
                  <p class="text-xl text-muted-foreground mt-4">
                    {data().frontmatter.description}
                  </p>
                )}
                <div class="flex gap-4 mt-6 text-sm text-muted-foreground">
                  <time dateTime={data().frontmatter.publishedAt}>
                    {new Date(data().frontmatter.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {data().frontmatter.author && <span>by {data().frontmatter.author}</span>}
                </div>
              </header>

              <MarkdownContent html={data().html} />
            </div>
          </>
        )}
      </Show>
    </MainLayout>
  );
}
