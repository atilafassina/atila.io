import { PageHeader } from "~/components/page-header";
import { PageIntro } from "~/components/page-intro";
import { MainLayout } from "~/components/main-layout";
import { getVideos } from "~/lib/video-getter";
import { VideoHighlights } from "~/components/video-highlights";
import { createAsync, query, RouteDefinition } from "@solidjs/router";
import { Meta, Title } from "@solidjs/meta";

const videoListData = query(async () => {
  "use server";

  const videos = await getVideos(21);

  return videos;
}, "videos");

export const route = {
  preload: async () => videoListData(),
} satisfies RouteDefinition;

export default function Channel() {
  const data = createAsync(() => videoListData(), {
    initialValue: [],
  });
  return (
    <MainLayout>
      <Title>Channel: Atila</Title>
      <Meta property="og:title" content="Channel: Atila" />
      <Meta property="twitter:title" content="Channel: Atila" />

      <header class="pb-11 border-b border-rule">
        <PageHeader kicker="Channel">Featured Videos</PageHeader>
        <PageIntro>
          I enjoy creating content, and I use teaching as a medium for me to
          learn new concepts. So I put effort in creating them for different
          medias, some content just works better in video. Check the channel and
          subscribe for more on{" "}
          <a
            href="https://youtube.com/atilaio"
            target="_blank"
            rel="noopener noreferrer"
            title="To AtilaIO Youtube Channel"
            class="text-ink underline underline-offset-[3px] hover:no-underline"
          >
            YouTube
          </a>
          .
        </PageIntro>
      </header>
      <section class="py-11">
        <VideoHighlights videos={data()} />
      </section>
    </MainLayout>
  );
}
