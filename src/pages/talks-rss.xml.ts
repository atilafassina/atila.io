import rss from "@astrojs/rss";
import { fetchAppearances } from "~/lib/db.server";

export async function get(ctx: Record<"site", string>) {
  const talks = await fetchAppearances();
  const items = talks
    .filter(({ date }) => date !== "TBD" && date !== null)
    .map((talk) => ({
      title: talk.title || "",
      description: talk.description || "",
      link: talk.recording || talk.url || talk.slides || "",
      pubDate: new Date(talk.date),
      customData: `<language>en-us</language>`,
    }));

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: "Atila's Talks",
    description:
      "In this feed you'll find conference talks and other appearances by Atila Fassina",
    site: ctx.site,
    items: items,
  });
}
