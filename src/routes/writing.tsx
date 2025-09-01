import { PageHeader } from "~/components/page-header";
import { CardWriting } from "~/components/card-writing";
import { PageIntro } from "~/components/page-intro";
import { MainLayout } from "~/components/main-layout";
import { fetchArticles } from "~/lib/db.server";
import { Glossary } from "~/components/glossary";
import type { ArticlePlatformType } from "~/lib/schemas";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Index, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";

const ARTICLE_PLATFORM = [
  "smashing",
  "dev-to",
  "css-tricks",
] satisfies ArticlePlatformType[];

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

      <header class="w-11/12 mx-auto max-w-7xl">
        <PageHeader>Articles & Notes</PageHeader>
        <PageIntro>
          Writing is my go-to alternative to sedimenting my knowledge. By
          writing I can anticipate my first questions and deepen my knowledge on
          topics, so when I reach a minimal degree of understanding I jump to a
          text edi tor. This has helped me a lot in collaborating with wonderful
          people who just motivate me in going further. My most recent articles
          can be found on{" "}
          <a
            href="https://smashingmagazine.com/author/atila-fassina/"
            target="_blank"
            rel="noopener noreferrer"
            title="Atila's author page on Smashing Magazine"
            class="dark:text-white text-black hover:underline hover:decoration-dotted hover:underline-offset-2"
          >
            Smashing Magazine
          </a>
          .
        </PageIntro>
        <Glossary types={ARTICLE_PLATFORM} />
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
