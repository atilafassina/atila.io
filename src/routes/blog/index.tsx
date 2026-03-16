import { PageHeader } from "~/components/page-header";
import { CardWriting } from "~/components/card-writing";
import { PageIntro } from "~/components/page-intro";
import { MainLayout } from "~/components/main-layout";
import { getMarkdownArticles } from "~/lib/article-loader.server";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Index, Show, For } from "solid-js";
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
    featured: article.featured,
  }));
}, "blog-articles");

export const route = {
  preload: async () => blogArticles(),
} satisfies RouteDefinition;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const data = createAsync(() => blogArticles(), {
    initialValue: [],
  });

  const featuredArticles = () => data().filter((a) => a.featured);
  const regularArticles = () => data().filter((a) => !a.featured);

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

      <Show when={data() && featuredArticles().length > 0}>
        <section class="w-11/12 mx-auto max-w-7xl mt-16">
          <h2 class="text-2xl font-bold mb-8 dark:text-white">Featured</h2>
          <ul class="grid gap-16 px-4 max-w-[90rem] mx-auto lg:grid-cols-2 2xl:grid-cols-3">
            <For each={featuredArticles()}>
              {(article) => <CardWriting article={article} />}
            </For>
          </ul>
        </section>
      </Show>

      <Show when={data()}>
        <section class="w-11/12 mx-auto max-w-7xl mt-16">
          <h2 class="text-2xl font-bold mb-8 dark:text-white">All Posts</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="py-3 pr-4 text-sm font-semibold dark:text-gray-300">Date</th>
                  <th class="py-3 px-4 text-sm font-semibold dark:text-gray-300">Title</th>
                  <th class="py-3 pl-4 text-sm font-semibold dark:text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <For each={regularArticles()}>
                  {(article) => (
                    <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td class="py-3 pr-4 text-sm dark:text-gray-400 whitespace-nowrap">
                        {formatDate(article.published_at ?? "")}
                      </td>
                      <td class="py-3 px-4">
                        <a
                          href={article.url}
                          class="font-medium hover:underline dark:text-white"
                        >
                          {article.title}
                        </a>
                      </td>
                      <td class="py-3 pl-4 text-sm dark:text-gray-400">
                        {article.description}
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </section>
      </Show>
    </MainLayout>
  );
}
