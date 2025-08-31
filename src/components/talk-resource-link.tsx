import type { JSX } from "solid-js";

export const TalkResourceLink = (props: {
  url: string;
  children: JSX.Element;
}) => {
  return (
    <a
      href={props.url}
      rel="noopener noreferrer"
      target="_blank"
      title="check the slides"
      class="talk-resources text-zinc-500 hover:text-white focus:text-white"
    >
      {props.children}
      <span
        role="img"
        aria-hidden
        class="relative inline text-xs -top-2 left-1"
      >
        ↗
      </span>
    </a>
  );
};
