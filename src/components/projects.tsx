import { Index, Show } from "solid-js";
import type { Repository } from "~/lib/github";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/solid-ui/card";
import StarIcon from "lucide-solid/icons/star";
import SquareArrowOutUpRight from "lucide-solid/icons/square-arrow-out-up-right";
import { ShineBorder } from "./mystic-ui/shine-border";
import { SectionHeader } from "./section-header";

interface Props {
  repositories: Repository[];
}

export function Projects(props: Props) {
  return (
    <section class="max-w-4xl w-full px-5 overflow-hidden">
      <SectionHeader
        title="Ongoing Projects"
        subtitle="I love learning in public and building things for fun. You’ll often find me working with Open-Source teams or with some indie project. Here are a few highlights."
      />

      <ul class="pt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Index each={props.repositories}>
          {(repo) => (
            <li class="text-white group">
              <ShineBorder
                class="relative h-full overflow-hidden rounded-lg shadow-lg"
                color={["#000", "#f0f0f0"]}
              >
                <Card class="relative h-full grid grid-rows-[auto,1fr,auto] ">
                  <CardHeader>
                    <CardTitle class="dark:text-neutral-200 text-neutral-700">
                      <span class="flex flex-row justify-between">
                        {repo().name}
                        <span class="relative -top-2 flex items-center gap-2 font-mono dark:text-neutral-200 text-neutral-700 pl-5 text-sm">
                          <StarIcon class="w-4" />
                          {repo().stargazers_count}
                        </span>
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription class="dark:text-neutral-200 text-neutral-700">
                      {repo().description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <ul class="flex flex-wrap gap-10">
                      <Show when={repo().homepage}>
                        {(url) => (
                          <li>
                            <a
                              href={url()}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="group/website flex text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover/website:text-neutral-200 hover:text-neutral-950 transition-colors"
                            >
                              website
                              <SquareArrowOutUpRight class="w-3 relative -top-1 -right-1 group-hover/website:-translate-y-[2px] group-hover/website:translate-x-[2px] transition-transform" />
                            </a>
                          </li>
                        )}
                      </Show>
                      <Show when={repo().html_url}>
                        {(url) => (
                          <li>
                            <a
                              href={url()}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="group/source flex text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover/source:text-neutral-200 hover/source:text-neutral-950 transition-colors"
                            >
                              source
                              <SquareArrowOutUpRight class="w-3 relative -top-1 -right-1 group-hover/source:-translate-y-[2px] group-hover/source:translate-x-[2px] transition-transform" />
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
  );
}
