import { useLocation } from "@solidjs/router";
import { Aicon } from "./icons/a";
import { ThemeToggler } from "./theme-toggler";
import { Index } from "solid-js";

const items = ["Channel", "Talks", "Writing", "About"]; //, 'Uses']
const activeStyle = (isActive: boolean) => (isActive ? "text-orange-500" : "");

export const MenuMobile = () => {
  const pathname = () => useLocation().pathname;

  return (
    <nav class="sm:hidden z-50 w-full pt-7 pb-5 fixed bottom-0 dark:bg-black dark:bg-opacity-75 bg-zinc-100">
      <div class="absolute right-3 top-3 z-50">
        <ThemeToggler />
      </div>
      <div class="absolute transform -translate-x-1/2 left-2/4 top-0 z-50">
        <a href="/">
          <Aicon class="w-10 h-10" />
        </a>
      </div>
      <input type="checkbox" id="menu-trigger" class="hidden" />
      <label
        for="menu-trigger"
        class="w-7 h-4 z-50 fixed bottom-4 left-3 flex flex-col items-center justify-between rounded-md focus:outline-none focus:ring-2 focus:ring-inset dark:focus:ring-white focus:ring-black"
        aria-controls="mobile-menu"
      >
        <span class="sr-only">toggle navigation menu</span>
      </label>
      <div
        class="fixed top-0 transform flex items-center justify-start -translate-x-[110%] w-screen h-screen transition-transform bg-opacity-90 dark:bg-black bg-zinc-50"
        id="mobile-menu"
      >
        <ul class="w-full">
          <Index each={items}>
            {(item) => {
              const path = "/" + item().toLowerCase();
              return (
                <li class="text-4xl">
                  <a
                    href={path}
                    class={`dark:text-gray-300 text-gray-700 p-5 block mb-4 ${activeStyle(
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
      </div>
    </nav>
  );
};
