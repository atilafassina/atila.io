import { PageHeader } from "~/components/page-header";
import { ArticleRow } from "~/components/article-row";
import { PageIntro } from "~/components/page-intro";
import { MainLayout } from "~/components/main-layout";
import { fetchArticles } from "~/lib/db.server";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Index, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

const articlesData = query(async () => {
  "use server";

  const articles = await fetchArticles();

  return articles;
}, "articles");

export const route = {
  preload: async () => articlesData(),
} satisfies RouteDefinition;

export default function Writing() {
  const data = createAsync(() => articlesData(), {
    initialValue: [],
  });
  return (
    <MainLayout>
      <Title>Writing: Atila</Title>
      <Meta property="og:title" content="Writing: Atila" />
      <Meta property="twitter:title" content="Writing: Atila" />

      <header class="pb-11 border-b border-rule">
        <PageHeader kicker="Writing">Articles &amp; Notes</PageHeader>
        <PageIntro>
          Writing is my go-to alternative to sedimenting my knowledge. By
          writing I can anticipate my first questions and deepen my knowledge on
          topics, so when I reach a minimal degree of understanding I jump to a
          text editor. This has helped me a lot in collaborating with wonderful
          people who just motivate me in going further. My most recent articles
          can be found on{" "}
          <a
            href="https://smashingmagazine.com/author/atila-fassina/"
            target="_blank"
            rel="noopener noreferrer"
            title="Atila's author page on Smashing Magazine"
            class="text-ink underline underline-offset-[3px] hover:no-underline"
          >
            Smashing Magazine
          </a>
          .
        </PageIntro>
      </header>
      <Show when={data()}>
        {(articles) => (
          <ul class="py-11">
            <Index each={articles()}>
              {(article) => <ArticleRow article={article()} />}
            </Index>
          </ul>
        )}
      </Show>
    </MainLayout>
  );
}
