import { clientOnly } from "@solidjs/start";
import { useLocation } from "@solidjs/router";
import { Aicon } from "./icons/a";
import { Index } from "solid-js";

const items = ["Channel", "Talks", "Writing", "About"]; //, 'Uses']
const activeStyle = (isActive: boolean) =>
  isActive ? "active-special-underline" : "";

const ThemeSelection = clientOnly(() =>
  import("~/components/theme-toggler").then((mod) => ({
    default: mod.ThemeToggler,
  }))
);

export const Navigation = () => {
  const pathname = () => useLocation().pathname;
  return (
    <nav class="hidden sm:grid p-5 transition-colors grid-cols-[auto,1fr,auto] place-items-center max-w-[90rem] mx-auto dark:text-slate-300">
      <a href="/" class="p-2 rounded-sm cta-hover-sm relative">
        <Aicon class="w-16 h-16" />
        <span class="sr-only">Atila</span>
      </a>
      <ul class="grid grid-flow-col gap-x-10 px-3 place-items-center mx-auto text-xl overflow-x-auto max-w-[90%]">
        <Index each={items}>
          {(item) => {
            const path = "/" + item().toLowerCase();

            return (
              <li class="py-5">
                <a
                  href={path}
                  class={`rounded-sm  block py-2 text-center px-4 relative special-underline ${activeStyle(
                    pathname() === path
                  )}`}
                >
                  {item()}
                </a>
              </li>
            );
          }}
        </Index>
      </ul>
      <ThemeSelection />
    </nav>
  );
};
