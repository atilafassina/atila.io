import type { z } from "zod";
import { getCardBorder } from "~/lib/get-card-border";
import { talkSchema } from "~/lib/schemas";
import { TalkResourceLink } from "./talk-resource-link";

export type Props = z.infer<typeof talkSchema>;

// const {
//   event_name,
//   title,
//   kind,
//   description,
//   recording,
//   slides,
//   date_string,
//   url,
// } = await talkSchema.parseAsync(talkProps);

export const CardAppearance = (props: Props) => {
  const eventDate = () =>
    props.date_string === "TBD" ? null : new Date(props.date_string);
  return (
    <li
      class={`cta-hover-sm p-1 relative rounded-lg bg-gradient-to-tr ${getCardBorder(
        props.kind
      )}`}
    >
      <div class="flex justify-between pr-4 absolute -top-8 w-full">
        <strong class="font-mono text-lg font-normal dark:text-slate-400 text-slate-600">
          {props.event_name}
        </strong>
        {eventDate !== null && (
          <time
            class="font-mono text-md dark:text-slate-400 text-slate-600"
            date-time={eventDate()?.toISOString()}
          >
            {props.date_string}
          </time>
        )}
      </div>
      <div class="p-4 dark:bg-black bg-zinc-50 h-[100%] rounded-md grid grid-rows-[auto_1fr_auto]">
        <h2 class="mb-3 text-2xl leading-snug">{props.title}</h2>
        {Boolean(props.description) && (
          <p class="mt-2 text-md leading-8 dark:text-slate-300 text-slate-800">
            {props.description}
          </p>
        )}
        <div class="flex justify-around mt-10 text-lg text-slate-200 bg-">
          {typeof props.url === "string" && (
            <TalkResourceLink url={props.url}>event</TalkResourceLink>
          )}
          {typeof props.recording === "string" && (
            <TalkResourceLink url={props.recording}>recording</TalkResourceLink>
          )}
          {typeof props.slides === "string" && (
            <TalkResourceLink url={props.slides}>slides</TalkResourceLink>
          )}
        </div>
      </div>
    </li>
  );
};
