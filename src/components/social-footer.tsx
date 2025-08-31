import { Youtube } from "./icons/youtube";
import { Twitter } from "./icons/twitter";
import { Github } from "./icons/github";
import { LinkedIn } from "./icons/linkedin";
import { Mastodon } from "./icons/mastodon";
import { Bluesky } from "./icons/bluesky";

export const SocialFooter = () => {
  return (
    <footer class="animte-slide-up sm:order-3 py-10">
      <ul class="flex flex-row justify-center gap-8 text-2xl mx-auto py-4">
        <li>
          <a href="https://x.com/atilafassina" rel="me noopener noreferrer">
            <Twitter class="block relative -top-[0.2em] dark:text-zinc-400 text-zinc-600 hover:text-zinc-950 text-3xl dark:hover:text-neutral-200 dark:focus:text-neutral-200 focus:text-neutral-600 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">X, formerly Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://atila.io/bsky" rel="me noopener noreferrer">
            <Bluesky class="dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-950 w-6 h-6 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">BlueSky</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/atilafassina"
            rel="me noopener noreferrer"
          >
            <Github class="dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-950 w-6 h-6 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">github</span>
          </a>
        </li>
        <li>
          <a href="https://atila.io/youtube" rel="noopener noreferrer">
            <Youtube class="w-6 h-6 dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-950 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">youtube</span>
          </a>
        </li>
        <li>
          <a rel="me noopener noreferrer" href="https://atila.io/mastodon">
            <Mastodon class="w-6 h-6 dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-950 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">Mastodon</span>
          </a>
        </li>
        <li>
          <a rel="me noopener noreferrer" href="https://atila.io/linkedin">
            <LinkedIn class="w-6 h-6 dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-950 transform translate-y-0 hover:-translate-y-1 hover:scale-105 focus:-translate-y-1 focus:scale-105 transition-all" />
            <span class="sr-only">LinkedIn</span>
          </a>
        </li>
      </ul>
    </footer>
  );
};
