import { createAsync, query, RouteDefinition } from "@solidjs/router";
import { Index, Show, Suspense } from "solid-js";
import { AtilaCard } from "~/components/atila-card";
import { BuildingNow } from "~/components/building-now";
import { MainLayout } from "~/components/main-layout";
import { Projects } from "~/components/projects";
import { SectionHeader } from "~/components/section-header";
import { TalkRow } from "~/components/talk-row";
import { VideoFeature } from "~/components/video-feature";
import { fetchAppearances } from "~/lib/db.server";
import {
  getRepoSnapshot,
  getRepositories,
  getRepository,
} from "~/lib/github";
import { getVideos } from "~/lib/video-getter";

// Flip to true once there are public projects worth showcasing again.
const SHOW_PROJECTS = false;

const defaultFetcher = (repo: string) => getRepository(repo, "atilafassina");

const homeData = query(async () => {
  "use server";

  const [videos, projects, appearances, xavier] = await Promise.all([
    getVideos(4),
    SHOW_PROJECTS
      ? Promise.all([
          getRepositories(["xavier", "shieldwall", "crudy"], defaultFetcher),
        ])
      : Promise.resolve([]),
    fetchAppearances(),
    getRepoSnapshot("xavier"),
  ]);

  const now = new Date();
  const dated = appearances.filter(
    (talk) =>
      talk.published && talk.date_string && talk.date_string !== "TBD",
  );
  const time = (talk: { date_string: string }) =>
    new Date(talk.date_string).getTime();
  const upcoming = dated
    .filter((talk) => new Date(talk.date_string) > now)
    .sort((a, b) => time(a) - time(b));
  const recent = dated
    .filter((talk) => new Date(talk.date_string) <= now)
    .sort((a, b) => time(b) - time(a));

  return {
    videos,
    projects: projects.flat(),
    xavier,
    talks: [...upcoming, ...recent].slice(0, 3),
  };
}, "home");

export const route = {
  preload: async () => homeData(),
} satisfies RouteDefinition;

export default function Home() {
  const data = createAsync(() => homeData(), {
    initialValue: { videos: [], projects: [], talks: [], xavier: null },
  });
  return (
    <MainLayout>
      <AtilaCard />

      <Show when={data().videos.length > 0}>
        <section class="py-11 border-b border-rule">
          <SectionHeader title="Latest video" index="01 / watch" />
          <Suspense>
            <VideoFeature videos={data().videos} />
          </Suspense>
        </section>
      </Show>

      <Show when={data().talks.length > 0}>
        <section class="py-11 border-b border-rule">
          <SectionHeader title="Speaking" index="02 / upcoming & recent" />
          <ul>
            <Index each={data().talks}>
              {(talk) => <TalkRow {...talk()} />}
            </Index>
          </ul>
          <div class="mt-6 text-right">
            <a href="/talks" class="link-inv">
              full speaking archive → /talks
            </a>
          </div>
        </section>
      </Show>

      <section class="py-11 border-b border-rule">
        <SectionHeader title="Currently building" index="03 / open source" />
        <BuildingNow snapshot={data().xavier} />
      </section>

      <Show when={SHOW_PROJECTS}>
        <section class="py-11">
          <SectionHeader title="A few things" index="04 / selected" />
          <Suspense>
            <Projects repositories={data().projects} />
          </Suspense>
        </section>
      </Show>
    </MainLayout>
  );
}
