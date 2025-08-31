import { getCardBorder } from "~/lib/get-card-border";

type Article = {
  title?: string | null;
  description?: string | null;
  platform_name:
    | "workshop"
    | "conference"
    | "meetup"
    | "podcast"
    | "livestream"
    | "smashing"
    | "dev-to"
    | "css-tricks";
  url?: string | null;
  published_at?: string | null;
};

export const CardWriting = (props: { article: Article }) => {
  return (
    <li
      class={`cta-hover-sm p-2 rounded-lg bg-gradient-to-tr ${getCardBorder(
        props.article.platform_name
      )}`}
    >
      <div class="p-6 dark:bg-black bg-zinc-50 rounded-md h-[100%]">
        <div class="flex justify-between">
          {typeof props.article.published_at === "string" && (
            <time
              class="font-mono text-lg text-slate-400"
              datetime={new Date(props.article.published_at).toISOString()}
            >
              {props.article.published_at}
            </time>
          )}
        </div>
        {typeof props.article.url === "string" && (
          <h2 class="mt-6 mb-3 text-2xl sm:text-3xl leading-snug hover:underline hover:decoration-dotted hover:decoration-slate-500">
            <a
              href={props.article.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {props.article.title}
            </a>
          </h2>
        )}
        <p class="mt-2 text-md sm:text-xl leading-8 dark:text-slate-300 text-slate-600">
          {props.article.description}
        </p>
      </div>
    </li>
  );
};
