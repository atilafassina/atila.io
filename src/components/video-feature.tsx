import { Index, Show } from "solid-js";
import { type VideoProps } from "~/lib/video-getter";
import { monthIndex, months } from "~/lib/format-month";

const watchUrl = (video: VideoProps) =>
  `https://youtube.com/watch?v=${video.id.videoId.videoId}`;

const published = (video: VideoProps) =>
  `${months[monthIndex(video.snippet.publishedAt)]} ${new Date(
    video.snippet.publishedAt,
  ).getFullYear()}`;

export function VideoFeature(props: { videos: VideoProps[] }) {
  return (
    <Show when={props.videos[0]}>
      {(featured) => (
        <div class="grid md:grid-cols-[1.7fr_1fr] gap-[26px]">
          <a
            href={watchUrl(featured())}
            rel="noreferrer noopener"
            target="_blank"
            class="shine group relative block aspect-video overflow-hidden border-[1.5px] border-ink"
          >
            <img
              class="absolute inset-0 w-full h-full object-cover grayscale"
              src={featured().snippet.thumbnails.high.url}
              alt={`cover for ${featured().snippet.title}`}
            />
            <span
              aria-hidden="true"
              class="absolute inset-0 m-auto w-[82px] h-[82px] rounded-full grid place-items-center bg-paper border-[1.5px] border-ink transition-all group-hover:bg-ink group-hover:scale-105 after:content-[''] after:ml-1.5 after:border-l-[24px] after:border-l-ink after:border-y-[14px] after:border-y-transparent group-hover:after:border-l-paper"
            />
            <span class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-[18px] py-4 bg-gradient-to-t from-black/70 to-transparent text-white">
              <span class="text-[clamp(18px,2.4vw,26px)] font-semibold tracking-[-0.01em]">
                {featured().snippet.title}
              </span>
              <time
                datetime={featured().snippet.publishedAt}
                class="font-mono text-xs border border-white/60 px-[7px] py-0.5 whitespace-nowrap"
              >
                {published(featured())}
              </time>
            </span>
          </a>
          <div>
            <ul class="flex flex-col">
              <Index each={props.videos.slice(1)}>
                {(video, idx) => (
                  <li class="border-b border-rule first:border-t">
                    <a
                      href={watchUrl(video())}
                      rel="noreferrer noopener"
                      target="_blank"
                      class="group grid grid-cols-[26px_1fr_auto] gap-3 items-baseline py-3.5"
                    >
                      <span class="font-mono text-xs text-dim">
                        {String(idx + 2).padStart(2, "0")}
                      </span>
                      <span class="text-[17px] group-hover:underline underline-offset-[3px]">
                        {video().snippet.title}
                      </span>
                      <time
                        datetime={video().snippet.publishedAt}
                        class="font-mono text-xs text-dim"
                      >
                        {published(video())}
                      </time>
                    </a>
                  </li>
                )}
              </Index>
            </ul>
            <a
              href="/channel"
              class="inline-block mt-4 label bg-ink text-paper border-[1.5px] border-ink px-3.5 py-[9px] transition-colors hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink active:translate-y-px"
            >
              Watch the channel →
            </a>
          </div>
        </div>
      )}
    </Show>
  );
}
