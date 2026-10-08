import { JSX } from "solid-js";

export const PageHeader = (props: {
  kicker?: string;
  children: JSX.Element;
}) => {
  return (
    <div class="pt-[50px] animate-blur-in">
      {props.kicker && (
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-dim">
          {props.kicker}
        </p>
      )}
      <h1 class="mt-3 text-[clamp(40px,8vw,88px)] font-semibold leading-[0.95] tracking-[-0.05em]">
        {props.children}
      </h1>
    </div>
  );
};
