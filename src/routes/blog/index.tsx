import { PageHeader } from "~/components/page-header";
import { CardWriting } from "~/components/card-writing";
import { PageIntro } from "~/components/page-intro";
import { MainLayout } from "~/components/main-layout";
import { getMarkdownArticles } from "~/lib/article-loader.server";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Index, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

const blogArticles = query(async () => {
  "use server";

  const markdownArticles = await getMarkdownArticles();

  return markdownArticles.map((article) => ({
    title: article.title,
    description: article.description ?? "",
    platform_name: "local" as const,
    url: `/writing/${article.slug}`,
    published_at: article.publishedAt,
  }));
}, "blog-articles");

export const route = {
  preload: async () => blogArticles(),
} satisfies RouteDefinition;

export default function Blog() {
  const data = createAsync(() => blogArticles(), {
    initialValue: [],
  });

  return (
    <MainLayout>
      <Title>Blog: Atila</Title>
      <Meta property="og:title" content="Blog: Atila" />
      <Meta property="twitter:title" content="Blog: Atila" />

      <header class="w-11/12 mx-auto max-w-7xl">
        <PageHeader>Blog</PageHeader>
        <PageIntro>
          My personal blog where I share thoughts, tutorials, and insights on
          web development. These are articles I wrote and published here
          directly.
        </PageIntro>
      </header>
      <Show when={data()}>
        {(cards) => (
          <ul class="grid gap-16 mt-32 px-4 max-w-[90rem] mx-auto lg:grid-cols-2 2xl:grid-cols-3">
            <Index each={cards()}>
              {(article) => <CardWriting article={article()} />}
            </Index>
          </ul>
        )}
      </Show>
    </MainLayout>
  );
}
