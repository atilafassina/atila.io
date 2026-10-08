import type { JSX } from "solid-js";

export const PageIntro = (props: { children: JSX.Element }) => {
  return (
    <p class="mt-6 text-[clamp(19px,2.4vw,24px)] leading-snug text-dim">
      {props.children}
    </p>
  );
};
