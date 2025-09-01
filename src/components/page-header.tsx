import { JSX } from "solid-js";

export const PageHeader = (props: { children: JSX.Element }) => {
  return (
    <div class="py-4 mt-12 animate-blur-in">
      <h1 class="relative font-thin text-6xl dark:text-white text-black">
        {props.children}
      </h1>
    </div>
  );
};
