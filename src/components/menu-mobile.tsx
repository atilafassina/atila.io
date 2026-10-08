import { useLocation } from "@solidjs/router";
import { Index } from "solid-js";
import { navItems } from "./navigation";

export const MenuMobile = () => {
  const pathname = () => useLocation().pathname;

  return (
    <nav
      aria-label="Primary"
      class="md:hidden fixed inset-x-0 bottom-0 z-50 grid grid-flow-col auto-cols-fr bg-paper border-t-2 border-ink"
    >
      <Index each={navItems}>
        {(item) => {
          const path = () => "/" + item().toLowerCase();
          return (
            <a
              href={path()}
              aria-current={pathname() === path() ? "page" : undefined}
              class={`label text-center px-1 pt-[15px] pb-[calc(15px+env(safe-area-inset-bottom,0px))] border-r border-rule last:border-r-0 hover:bg-ink hover:text-paper active:bg-ink active:text-paper ${
                pathname() === path() ? "bg-ink text-paper" : "text-ink"
              }`}
            >
              {item()}
            </a>
          );
        }}
      </Index>
    </nav>
  );
};
