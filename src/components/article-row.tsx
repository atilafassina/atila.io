import type { JSX } from "solid-js";

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

export const ArticleRow = (props: { article: Article }) => {
  const Row = (rowProps: { children: JSX.Element }) => (
    <li class="border-b border-rule first:border-t">
      {typeof props.article.url === "string" ? (
        <a
          href={props.article.url}
          rel="noopener noreferrer"
          target="_blank"
          class="group grid md:grid-cols-[160px_1fr_auto] gap-1 md:gap-5 items-baseline px-0.5 py-[18px] transition-[padding] duration-200 hover:pl-2.5"
        >
          {rowProps.children}
        </a>
      ) : (
        <div class="grid md:grid-cols-[160px_1fr_auto] gap-1 md:gap-5 items-baseline px-0.5 py-[18px]">
          {rowProps.children}
        </div>
      )}
    </li>
  );

  return (
    <Row>
      {typeof props.article.published_at === "string" ? (
        <time
          class="font-mono text-xs text-dim"
          datetime={new Date(props.article.published_at).toISOString()}
        >
          {props.article.published_at}
        </time>
      ) : (
        <span />
      )}
      <div>
        <h2 class="text-[21px] font-medium tracking-[-0.01em] mb-0.5 group-hover:underline underline-offset-[3px]">
          {props.article.title}
        </h2>
        <p class="text-sm text-dim">{props.article.description}</p>
      </div>
      <span class="font-mono text-xs uppercase tracking-[0.06em] border border-ink px-2 py-0.5 justify-self-start">
        {props.article.platform_name}
      </span>
    </Row>
  );
};
