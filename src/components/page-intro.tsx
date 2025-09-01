import type { JSX } from "solid-js";

export const PageIntro = (props: { children: JSX.Element }) => {
  return (
    <p class="mt-16 text-xl leading-relaxed dark:text-neutral-400 text-neutral-500">
      {props.children}
    </p>
  );
};
