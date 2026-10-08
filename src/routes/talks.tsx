import { PageHeader } from "~/components/page-header";
import { PageIntro } from "~/components/page-intro";
import { SectionHeader } from "~/components/section-header";
import { TalkRow } from "~/components/talk-row";
import { fetchAppearances } from "../lib/db.server";
import type { YearlyMap } from "~/lib/schemas";
import { MainLayout } from "~/components/main-layout";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";
import { Index } from "solid-js";

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

  const sections = () => [
    ...(data().upcoming.length > 0
      ? [["Upcoming", data().upcoming] as const]
      : []),
    ...Object.entries(data().appearancesMapByYear).reverse(),
  ];

  return (
    <MainLayout>
      <Title>Talks: Atila</Title>
      <Meta property="og:title" content="Talks: Atila" />
      <Meta property="twitter:title" content="Talks: Atila" />

      <header class="pb-11 border-b border-rule">
        <PageHeader kicker="Speaking">Past &amp; Future Appearances</PageHeader>
        <PageIntro>
          Starting off as a self-taught developer made me value the community a
          lot. Sharing knowledge in conferences and meeting different people
          with similar interests is one of my biggest passions in this career.
          Therefore, I participate in conferences, podcasts, workshops, and
          meetups as often as I can.
        </PageIntro>
      </header>

      <Index each={sections()}>
        {(section) => (
          <section class="py-11 border-b border-rule">
            <SectionHeader title={String(section()[0])} />
            <ul>
              <Index each={section()[1]}>
                {(appearance) => <TalkRow {...appearance()} />}
              </Index>
            </ul>
          </section>
        )}
      </Index>
    </MainLayout>
  );
}
