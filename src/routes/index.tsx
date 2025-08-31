import { createAsync, query, RouteDefinition } from "@solidjs/router";
import { Suspense } from "solid-js";
import { AtilaCard } from "~/components/atila-card";
import { MainLayout } from "~/components/main-layout";
import { Projects } from "~/components/projects";
import { SectionHeader } from "~/components/section-header";
import { VideoHighlights } from "~/components/video-highlights";
import { getRepositories, getRepository } from "~/lib/github";
import { getVideos } from "~/lib/video-getter";

const solidFetcher = (repo: string) => getRepository(repo, "solidjs");
const defaultFetcher = (repo: string) => getRepository(repo, "atilafassina");
const neonFetcher = (repo: string) => getRepository(repo, "neondatabase");

const homeData = query(async () => {
  "use server";

  const projects = await Promise.all([
    await getRepositories(["solid", "solid-start", "solid-docs"], solidFetcher),
    await getRepositories(["shieldwall"], defaultFetcher),
    await getRepositories(["neondb", "neonctl"], neonFetcher),
  ]);

  return {
    videos: await getVideos(3),
    projects: projects.flat(),
  };
}, "home");

export const route = {
  preload: async () => homeData(),
} satisfies RouteDefinition;

export default function Home() {
  const data = createAsync(() => homeData(), {
    initialValue: { videos: [], projects: [] },
  });
  return (
    <MainLayout>
      <AtilaCard />
      <section class="max-w-4xl w-full px-5 overflow-hidden pb-36">
        <SectionHeader
          title="Latest Videos"
          subtitle="Creating short technical videos on Youtube has been an important outlet for my creativity. I have learnt tenfold what I have taught, here are my latest pieces."
        />
        <Suspense>
          <VideoHighlights videos={data().videos} />
        </Suspense>
      </section>
      <Suspense>
        <Projects repositories={data().projects} />
      </Suspense>
    </MainLayout>
  );
}
