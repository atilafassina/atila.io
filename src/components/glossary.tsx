import type { z } from "zod";
import { getCardBorder } from "~/lib/get-card-border";
import type { articlePlatformSchema, talkTypesSchema } from "~/lib/schemas";
import { Index } from "solid-js";

type Props = {
  types:
    | z.infer<typeof talkTypesSchema>[]
    | z.infer<typeof articlePlatformSchema>[];
};

export const Glossary = (props: Props) => {
  return (
    <aside class="mt-10 p-5 border border-zinc-800 inline-block rounded-xl">
      <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-flow-col gap-7">
        <Index each={props.types}>
          {(type) => (
            <li>
              <i
                class={`w-8 h-8 bg-gradient-to-tr ${getCardBorder(
                  type()
                )} inline-block rounded-full mr-2`}
              />
              <span class="relative -top-2">{type()}</span>
            </li>
          )}
        </Index>
      </ul>
    </aside>
  );
};
