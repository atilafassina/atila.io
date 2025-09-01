import { PageHeader } from "~/components/page-header";
import { PageIntro } from "~/components/page-intro";
import { CardAppearance } from "~/components/card-appearance";
import { fetchAppearances } from "../lib/db.server";
import type { TalkType, YearlyMap } from "~/lib/schemas";
import { Glossary } from "~/components/glossary";
import { MainLayout } from "~/components/main-layout";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { Index, Show } from "solid-js";

const TALK_TYPES = [
  "podcast",
  "conference",
  "meetup",
  "workshop",
  "livestream",
] satisfies TalkType[];

const talksData = query(async () => {
  "use server";

  const appearances = await fetchAppearances();

  const now = new Date();
  const upcoming = appearances
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((appearance: any) => {
      if (!appearance.date_string || appearance.date_string === "TBD")
        return false;
      const date = new Date(appearance.date_string);
      return appearance.published && date > now;
    })
    .sort(
      (a: { date_string: string }, b: { date_string: string }) =>
        new Date(a.date_string).getTime() - new Date(b.date_string).getTime()
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pastAppearances = appearances.filter((appearance: any) => {
    if (!appearance.date_string || appearance.date_string === "TBD")
      return true;
    const date = new Date(appearance.date_string);
    return !(appearance.published && date > now);
  });

  const appearancesMapByYear = pastAppearances.reduce<YearlyMap>(
    (mapped, appearance) => {
      if (appearance.date_string && appearance.published) {
        const year =
          appearance.date_string === "TBD"
            ? "Announcing soon..."
            : String(new Date(appearance.date_string).getFullYear());

        if (Array.isArray(mapped[year])) {
          mapped[year]?.push(appearance);
        } else if (!mapped[year]) {
          mapped[year] = [appearance];
        }
      }

      return mapped;
    },
    {}
  );

  return {
    upcoming,
    appearancesMapByYear,
  };
}, "talks");

export const route = {
  preload: async () => talksData(),
} satisfies RouteDefinition;

export default function Talks() {
  const data = createAsync(() => talksData(), {
    initialValue: { upcoming: [], appearancesMapByYear: {} },
  });

  return (
    <MainLayout>
      <Title>Talks: Atila</Title>
      <Meta property="og:title" content="Talks: Atila" />
      <Meta property="twitter:title" content="Talks: Atila" />

      <header class="w-11/12 mx-auto max-w-7xl">
        <PageHeader>Past & Future Appearances</PageHeader>
        <PageIntro>
          Starting off as a self-taught developer made me value the community a
          lot. Sharing knowledge in conferences and meeting different people
          with similar interests is one of my biggest passions in this carreers.
          Therefore, I participate in conferences, podcasts, workshops, and
          meetups as often as I can.
        </PageIntro>

        <Glossary types={TALK_TYPES} />
      </header>

      <section class="max-w-[90rem] mx-auto">
        {data().upcoming.length > 0 && (
          <section class="my-20 max-w-[90rem] mx-auto">
            <h2 class="text-4xl w-11/12 mx-auto max-w-7xl">Upcoming</h2>
            <Show when={data().upcoming.length > 0}>
              <ul class="grid gap-x-10 gap-y-20 mt-16 sm:grid-cols-2 lg:grid-cols-3 px-4">
                <Index each={data().upcoming}>
                  {(appearance) => <CardAppearance {...appearance()} />}
                </Index>
              </ul>
            </Show>
          </section>
        )}
        {Object.entries(data().appearancesMapByYear)
          .reverse()
          .map(([year, appearanceList]) => (
            <section class="my-20 max-w-[90rem] mx-auto">
              <h2 class="text-4xl w-11/12 mx-auto max-w-7xl">{year}</h2>
              <Show when={appearanceList}>
                {(appearanceList) => (
                  <ul class="grid gap-x-10 gap-y-20 mt-16 sm:grid-cols-2 lg:grid-cols-3 px-4">
                    <Index each={appearanceList()}>
                      {(appearance) => <CardAppearance {...appearance()} />}
                    </Index>
                  </ul>
                )}
              </Show>
            </section>
          ))}
      </section>
    </MainLayout>
  );
}
