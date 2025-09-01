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

      <header class="w-11/12 mx-auto max-w-7xl">
        <PageHeader>Featured Videos</PageHeader>
        <PageIntro>
          I enjoy creating content, and I use teaching as a medium for me to
          learn new concepts. So I put effort in creating them for different
          medias, some content just works better in video. Check the channel and
          subsbribe for more on{" "}
          <a
            href="https://youtube.com/atilaio"
            target="_blank"
            rel="noopener noreferrer"
            title="To AtilaIO Youtube Channel"
            class="dark:text-red-400 text-red-700 hover:underline hover:decoration-dotted hover:underline-offset-2"
          >
            Youtube
          </a>
          .
        </PageIntro>
      </header>
      <section class="px-6">
        <VideoHighlights videos={data()} maxCols={3} />
      </section>
    </MainLayout>
  );
}
