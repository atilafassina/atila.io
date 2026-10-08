import { Index } from "solid-js";
import { type VideoProps } from "~/lib/video-getter";
import { monthIndex, months } from "~/lib/format-month";

interface Props {
  videos: VideoProps[];
}

export function VideoHighlights(props: Props) {
  return (
    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[26px] gap-y-10">
      <Index each={props.videos}>
        {(video) => (
          <li>
            <a
              href={`https://youtube.com/watch?v=${video().id.videoId.videoId}`}
              rel="noreferrer noopener"
              target="_blank"
              class="group block"
            >
              <span class="shine block aspect-video overflow-hidden border-[1.5px] border-ink bg-panel">
                <img
                  class="block w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  src={video().snippet.thumbnails.medium.url}
                  alt={`cover for ${video().snippet.title}`}
                  loading="lazy"
                />
              </span>
              <time
                datetime={video().snippet.publishedAt}
                class="block mt-3 font-mono text-xs text-dim"
              >
                {months[monthIndex(video().snippet.publishedAt)]}{" "}
                {new Date(video().snippet.publishedAt).getFullYear()}
              </time>
              <h2 class="mt-1 text-xl font-medium tracking-[-0.01em] group-hover:underline underline-offset-[3px]">
                {video().snippet.title}
              </h2>
              <p class="mt-1.5 text-sm text-dim line-clamp-3">
                {video().snippet.description}
              </p>
            </a>
          </li>
        )}
      </Index>
    </ul>
  );
}
