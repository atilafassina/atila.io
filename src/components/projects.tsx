import { Index, Show } from "solid-js";
import type { Repository } from "~/lib/github";

interface Props {
  repositories: Repository[];
}

const stars = (count: number) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

export function Projects(props: Props) {
  return (
    <ul class="grid md:grid-cols-3 border-t border-l border-rule">
      <Index each={props.repositories}>
        {(repo, idx) => (
          <li class="shine relative flex flex-col p-5 border-r border-b border-rule">
            <span class="font-mono text-[11px] text-dim">
              OSS-{String(idx + 1).padStart(3, "0")}
            </span>
            <h3 class="mt-2 mb-2 text-[22px] font-semibold">{repo().name}</h3>
            <p class="mb-4 text-sm text-dim">{repo().description}</p>
            <div class="mt-auto flex items-center justify-between font-mono text-xs">
              <span>★ {stars(repo().stargazers_count ?? 0)}</span>
              <span class="flex gap-3">
                <Show when={repo().homepage}>
                  {(url) => (
                    <a
                      href={url()}
                      rel="noreferrer noopener"
                      target="_blank"
                      class="link-inv"
                    >
                      website →
                    </a>
                  )}
                </Show>
                <Show when={repo().html_url}>
                  {(url) => (
                    <a
                      href={url()}
                      rel="noreferrer noopener"
                      target="_blank"
                      class="link-inv"
                    >
                      source →
                    </a>
                  )}
                </Show>
              </span>
            </div>
          </li>
        )}
      </Index>
    </ul>
  );
}
