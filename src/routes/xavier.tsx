import { Meta, Title } from "@solidjs/meta";
import { createAsync, query, type RouteDefinition } from "@solidjs/router";
import { Index, Show } from "solid-js";
import { CopyCommand } from "~/components/copy-command";
import { MainLayout } from "~/components/main-layout";
import { SectionHeader } from "~/components/section-header";
import { getRepoSnapshot } from "~/lib/github";

const REPO_URL = "https://github.com/atilafassina/xavier";
const INSTALL_COMMAND =
  "curl -fsSL https://github.com/atilafassina/xavier/releases/latest/download/xavier.tar.gz | tar xz && bash xavier/install.sh";

const RUNTIMES = [
  { name: "Claude Code", status: "Full support" },
  { name: "Cursor", status: "Full support" },
  { name: "Codex", status: "Experimental" },
];

const PILLARS = [
  {
    name: "Personas",
    body: "/xavier review spawns three reviewers in parallel: correctness, security and performance. Findings are deduplicated, ranked, and merged into one verdict.",
  },
  {
    name: "Learning",
    body: "/xavier learn sends research agents through an unfamiliar codebase to map its architecture, decisions and dependencies. Monorepos are detected automatically.",
  },
  {
    name: "Knowledge base",
    body: "Everything lives as linked Markdown notes in a git-tracked vault. Recurring patterns from your recent reviews are fed back into future ones, so it gets sharper over time.",
  },
];

const WORKFLOW = [
  ["grill", "Xavier interviews you about the design until the plan holds up."],
  ["prd", "Turn the grilled design into a product requirements doc."],
  ["tasks", "Break the PRD into phased, tracer-bullet implementation tasks."],
  ["loop", "Execute the task file autonomously, verified by tests and lint."],
] as const;

const COMMANDS = [
  {
    group: "Review",
    items: [
      ["review", "Concurrent three-persona code review of your diff"],
      ["babysit", "Watch a PR: poll CI, fix lint, surface review comments"],
    ],
  },
  {
    group: "Design & planning",
    items: [
      ["grill", "Interview you about a plan until it is solid"],
      ["prd", "Create a PRD through interview and codebase exploration"],
      ["tasks", "Decompose a PRD into phased tasks"],
    ],
  },
  {
    group: "Knowledge",
    items: [
      ["learn", "Explore a codebase and write knowledge notes"],
      ["research", "Research a topic across web, docs and code"],
      ["investigate", "Hypothesis-driven bug diagnosis"],
      ["ask", "Answer a question strictly from your vault"],
    ],
  },
  {
    group: "Dependencies",
    items: [
      ["add-dep", "Create a dependency-skill for a package"],
      ["deps-update", "Regenerate stale dependency-skills from your lockfile"],
    ],
  },
  {
    group: "Execution",
    items: [["loop", "Run a task file as an autonomous loop"]],
  },
] as const;

const xavierData = query(async () => {
  "use server";

  return getRepoSnapshot("xavier");
}, "xavier");

export const route = {
  preload: async () => xavierData(),
} satisfies RouteDefinition;

const TITLE = "Xavier: Atila";
const DESCRIPTION =
  "Xavier is an open-source, self-evolving AI orchestrator for Claude Code, Cursor and Codex: code review, codebase learning, planning and autonomous task loops.";

export default function Xavier() {
  const snapshot = createAsync(() => xavierData(), { initialValue: null });

  return (
    <MainLayout>
      <Title>{TITLE}</Title>
      <Meta name="description" content={DESCRIPTION} />
      <Meta property="og:title" content={TITLE} />
      <Meta property="og:description" content={DESCRIPTION} />
      <Meta property="twitter:title" content={TITLE} />
      <Meta property="twitter:description" content={DESCRIPTION} />

      <header class="grid md:grid-cols-[1fr_auto] gap-11 items-center pt-[50px] pb-[34px] border-b border-rule">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-dim">
            Open source · MIT
            <Show when={snapshot()?.version}>
              {(version) => <> · {version()}</>}
            </Show>
          </p>
          <h1 class="mt-3 mb-[18px] text-[clamp(52px,11vw,132px)] font-semibold leading-[0.92] tracking-[-0.05em]">
            Xavier
          </h1>
          <p class="text-[clamp(19px,2.4vw,24px)] text-dim max-w-[40ch]">
            A <b class="font-medium text-ink">self-evolving AI orchestrator</b>.
            It reviews your code, learns your codebase, and plans the work, with
            agents running in parallel and tests as the only source of truth.
          </p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-3 mt-[22px]">
            <a
              href="#install"
              class="label bg-ink text-paper border-[1.5px] border-ink px-3.5 py-[9px] transition-colors hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink"
            >
              Install →
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="link-inv"
            >
              source
              <Show when={snapshot()}>
                {(repo) => <> · ★ {repo().stars}</>}
              </Show>{" "}
              →
            </a>
          </div>
        </div>
        <div class="order-first md:order-last w-[132px] h-[132px] md:w-[210px] md:h-[210px] overflow-hidden border-2 border-ink bg-white shrink-0">
          <img
            class="block w-full h-full object-cover grayscale hover:grayscale-0 motion-safe:transition-all motion-safe:duration-500"
            src="/xavier.png"
            alt="Xavier, the orchestrator's mascot"
          />
        </div>
      </header>

      <section id="install" class="py-11 border-b border-rule scroll-mt-6">
        <SectionHeader title="Install" index="01 / get started" />
        <CopyCommand command={INSTALL_COMMAND} />
        <p class="mt-4 font-mono text-xs text-dim max-w-none">
          needs git, the GitHub CLI and a POSIX shell (macOS, Linux or WSL)
        </p>
        <ul class="mt-6 grid sm:grid-cols-3 border-t border-l border-rule">
          <Index each={RUNTIMES}>
            {(runtime) => (
              <li class="flex items-baseline justify-between gap-3 p-4 border-r border-b border-rule">
                <span class="text-lg">{runtime().name}</span>
                <span class="font-mono text-xs text-dim">
                  {runtime().status}
                </span>
              </li>
            )}
          </Index>
        </ul>
      </section>

      <section class="py-11 border-b border-rule">
        <SectionHeader title="How it works" index="02 / three pillars" />
        <ul class="grid md:grid-cols-3 border-t border-l border-rule">
          <Index each={PILLARS}>
            {(pillar, idx) => (
              <li class="shine relative p-5 border-r border-b border-rule">
                <span class="font-mono text-[11px] text-dim">
                  PIL-{String(idx + 1).padStart(3, "0")}
                </span>
                <h3 class="mt-2 mb-2 text-[22px] font-semibold">
                  {pillar().name}
                </h3>
                <p class="text-sm text-dim">{pillar().body}</p>
              </li>
            )}
          </Index>
        </ul>
      </section>

      <section class="py-11 border-b border-rule">
        <SectionHeader title="Workflow" index="03 / idea to implementation" />
        <ol>
          <Index each={WORKFLOW}>
            {(step, idx) => (
              <li class="grid grid-cols-[26px_110px_1fr] md:grid-cols-[26px_160px_1fr] gap-3 items-baseline py-3.5 border-b border-rule first:border-t">
                <span class="font-mono text-xs text-dim">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <code class="font-mono text-sm">/xavier {step()[0]}</code>
                <span class="text-[17px]">{step()[1]}</span>
              </li>
            )}
          </Index>
        </ol>
      </section>

      <section class="py-11 border-b border-rule">
        <SectionHeader title="Commands" index="04 / reference" />
        <div class="grid gap-9">
          <Index each={COMMANDS}>
            {(category) => (
              <div>
                <h3 class="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-dim">
                  {category().group}
                </h3>
                <ul>
                  <Index each={category().items}>
                    {(item) => (
                      <li class="grid md:grid-cols-[200px_1fr] gap-1 md:gap-5 py-3 border-b border-rule first:border-t">
                        <code class="font-mono text-sm">
                          /xavier {item()[0]}
                        </code>
                        <span class="text-dim">{item()[1]}</span>
                      </li>
                    )}
                  </Index>
                </ul>
              </div>
            )}
          </Index>
        </div>
      </section>

      <section class="py-11">
        <SectionHeader title="Get involved" index="05 / contribute" />
        <p class="text-[clamp(19px,2.4vw,24px)] text-dim max-w-[40ch]">
          Xavier is MIT-licensed and built in the open. Star it, try it on a
          real repo, and tell me what breaks.
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="link-inv"
          >
            star on github →
          </a>
          <a
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            class="link-inv"
          >
            open an issue →
          </a>
          <a
            href={`${REPO_URL}/discussions`}
            target="_blank"
            rel="noopener noreferrer"
            class="link-inv"
          >
            start a discussion →
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
