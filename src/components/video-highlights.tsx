import { Index, Show } from "solid-js"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./solid-ui/card.tsx"
import { SectionHeader } from "./section-header.tsx"
import { ShineBorder } from "./mystic-ui/shine-border.tsx"
import { type VideoProps } from "~/lib/video-getter.ts"
import { monthIndex, months } from "~/lib/format-month.ts"

interface Props {
  videos: VideoProps[]
}

export function VideoHighlights(props: Props) {
  return (
    <section class="max-w-4xl w-full px-5 overflow-hidden pb-36">
      <SectionHeader
        title="Latest Videos"
        subtitle="Creating short technical videos on Youtube has been an important outlet for my creativity. I have learnt tenfold what I have taught, here are my latest pieces."
      />

      <ul class="pt-20 grid sm:grid-cols-2 gap-6">
        <Index each={props.videos}>
          {(video, idx) => (
            <li class="text-white group sm:first-of-type:col-span-2 group">
              <ShineBorder
                class="relative h-full overflow-hidden rounded-lg shadow-lg"
                color={["#000", "#f0f0f0"]}
              >
                <Card class="relative h-full grid grid-rows-[auto,1fr,auto] ">
                  <CardHeader>
                    <CardTitle class="dark:text-neutral-200 text-neutral-700">
                      <span
                        class={`w-full block text-center font-thin ${idx === 0 ? "text-3xl" : "text-2xl"}`}
                      >
                        {video().snippet.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    class={`${idx === 0 ? "grid md:grid-cols-[auto,1fr] gap-10" : ""}`}
                  >
                    <a
                      href={`https://youtube.com/watch?v=${video().id.videoId.videoId}`}
                      rel="noreferrer noopener"
                      target="_blank"
                      class="group/website flex text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover/website:text-neutral-200 hover:text-neutral-950 transition-colors"
                    >
                      <img
                        class={`mx-auto mb-3 rounded-md grayscale group-hover:grayscale-0 transition-all`}
                        src={video().snippet.thumbnails.medium.url}
                        alt={`cover for ${video().snippet.title}`}
                      />
                    </a>
                    <CardDescription
                      class={`dark:text-neutral-200 text-neutral-700 ${idx === 0 ? "text-lg" : ""} self-center`}
                    >
                      {video().snippet.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <ul class="w-full flex justify-end gap-10">
                      <Show when={video().id}>
                        {(id) => (
                          <li>
                            <a
                              href={`https://youtube.com/watch?v=${id().videoId}`}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="group/website flex text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover/website:text-neutral-200 hover:text-neutral-950 transition-colors"
                            >
                              <time
                                date-time={video().snippet.publishedAt}
                                class="font-mono dark:text-slate-300 text-slate-500 block text-center pt-3"
                              >
                                {
                                  months[
                                    monthIndex(video().snippet.publishedAt)
                                  ]
                                }
                                /
                                {new Date(
                                  video().snippet.publishedAt,
                                ).getFullYear()}
                              </time>
                            </a>
                          </li>
                        )}
                      </Show>
                    </ul>
                  </CardFooter>
                </Card>
              </ShineBorder>
            </li>
          )}
        </Index>
      </ul>
    </section>
  )
}
