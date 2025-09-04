import { type FetchEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";

const REDIRECTS = {
  "/youtube": "https://youtube.com/AtilaIO",
  "/subscribe": "https://www.youtube.com/AtilaIO?sub_confirmation=1",
  "/mastodon": "https://mas.to/@atila",
  "/twitter": "https://twitter.com/AtilaFassina",
  "/x": "https://twitter.com/AtilaFassina",
  "/linkedin": "https://linkedin.com/in/AtilaFassina",
  "/smashingmag": "https://smashingmagazine.com/author/atila-fassina",
  "/github": "https://github.com/atilafassina",
  "/bsky": "https://bsky.app/profile/atila.io",
  "/bluesky": "https://bsky.app/profile/atila.io",
  "/gde": "https://g.dev/atilaf",
  "/sponsor": "https://github.com/sponsors/atilafassina",
  "/quantum": "https://github.com/atilafassina/quantum",
  "/workshops": "https://atila.io/talks",
  "/workshop": "https://atila.io/talks",
} as const;

const shouldRedirect = (
  pathname: string
): pathname is keyof typeof REDIRECTS => {
  return pathname in REDIRECTS;
};

export const handleRedirects = (event: FetchEvent) => {
  const { pathname } = new URL(event.request.url);

  if (shouldRedirect(pathname)) {
    return redirect(REDIRECTS[pathname], 302);
  }
};
