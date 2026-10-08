import { Show } from "solid-js";
import type { RepoSnapshot } from "~/lib/github";

export function BuildingNow(props: { snapshot: RepoSnapshot | null }) {
  return (
    <a
      href="/xavier"
      class="shine relative grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-4 items-center p-5 border border-rule group"
    >
      <div>
        <span class="font-mono text-[11px] text-dim">
          OSS · MIT
          <Show when={props.snapshot?.version}>
            {(version) => <> · {version()}</>}
          </Show>
        </span>
        <h3 class="mt-2 mb-2 text-[clamp(28px,4vw,40px)] font-semibold tracking-[-0.02em]">
          Xavier
        </h3>
        <p class="text-dim max-w-[52ch]">
          A self-evolving AI orchestrator for Claude Code, Cursor and Codex.
          Parallel code review, codebase learning, and planning that ends in
          tests, not vibes.
        </p>
      </div>
      <div class="flex md:flex-col items-center md:items-end justify-between gap-3 font-mono text-xs">
        <Show when={props.snapshot}>
          {(repo) => <span>★ {repo().stars}</span>}
        </Show>
        <span class="label border-b-[1.5px] border-ink group-hover:bg-ink group-hover:text-paper px-[5px] py-[3px] transition-colors">
          learn more →
        </span>
      </div>
    </a>
  );
}
