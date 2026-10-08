import type { JSX } from "solid-js";
import type { z } from "zod";
import type { talkSchema } from "~/lib/schemas";

export type Props = z.infer<typeof talkSchema>;

const isUpcoming = (props: Props) =>
  props.published &&
  props.date_string !== "TBD" &&
  new Date(props.date_string) > new Date();

export const TalkRow = (props: Props) => {
  const primary = () => props.recording || props.slides || props.url;
  const linkLabel = () => {
    if (props.recording && props.slides) return "slides + recording →";
    if (props.recording) return "recording →";
    if (props.slides) return "slides →";
    return "details →";
  };
  const where = () =>
    [props.event_name, props.place].filter(Boolean).join(" — ");

  const Row = (rowProps: { children: JSX.Element }) => (
    <li class="border-b border-rule first:border-t">
      {primary() ? (
        <a
          href={primary()!}
          rel="noopener noreferrer"
          target="_blank"
          class="group grid md:grid-cols-[160px_1fr_auto] gap-1 md:gap-5 items-center px-0.5 py-[18px] transition-[padding] duration-200 hover:pl-2.5"
        >
          {rowProps.children}
        </a>
      ) : (
        <div class="grid md:grid-cols-[160px_1fr_auto] gap-1 md:gap-5 items-center px-0.5 py-[18px]">
          {rowProps.children}
        </div>
      )}
    </li>
  );

  return (
    <Row>
      <span
        class={`font-mono text-xs justify-self-start ${
          isUpcoming(props) ? "bg-ink text-paper px-2 py-[3px]" : "text-dim"
        }`}
      >
        {props.date_string}
        {isUpcoming(props) && " · upcoming"}
      </span>
      <div>
        <h3 class="text-[21px] font-medium tracking-[-0.01em] mb-0.5">
          {props.title}
        </h3>
        <span class="font-mono text-xs text-dim">{where()}</span>
      </div>
      {primary() && (
        <span class="hidden md:inline label border-b-[1.5px] border-ink whitespace-nowrap">
          {linkLabel()}
        </span>
      )}
    </Row>
  );
};
