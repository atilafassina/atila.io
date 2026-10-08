import { useLocation } from "@solidjs/router";
import { Index } from "solid-js";
import { Aicon } from "./icons/a";
import { ThemeToggler } from "./theme-toggler";

export const navItems = ["Channel", "Talks", "Writing", "About"];

export const Navigation = () => {
  const pathname = () => useLocation().pathname;

  return (
    <nav class="flex items-center justify-between py-[26px] border-b-2 border-ink">
      <a
        href="/"
        class="inline-flex items-center text-ink group"
        aria-label="Atila Fassina — home"
      >
        <Aicon class="h-10 w-auto block transition-transform duration-200 group-hover:scale-[1.06]" />
      </a>
      <div class="flex items-center gap-6">
        <ul class="hidden md:flex gap-[26px] label">
          <Index each={navItems}>
            {(item) => {
              const path = () => "/" + item().toLowerCase();
              return (
                <li>
                  <a
                    href={path()}
                    aria-current={
                      pathname() === path() ? "page" : undefined
                    }
                    class={`text-ink pb-[3px] border-b-[1.5px] hover:border-ink ${
                      pathname() === path()
                        ? "border-ink"
                        : "border-transparent"
                    }`}
                  >
                    {item()}
                  </a>
                </li>
              );
            }}
          </Index>
        </ul>
        <ThemeToggler />
      </div>
    </nav>
  );
};
