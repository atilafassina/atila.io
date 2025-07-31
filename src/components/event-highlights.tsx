import { Index, Show, createMemo } from "solid-js"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./solid-ui/card.tsx"
import { ShineBorder } from "./mystic-ui/shine-border.tsx"

// Define TalkProps interface based on talkSchema
export interface TalkProps {
  id: string
  date_string: string
  event_name: string
  title: string
  description: string
  recording?: string | null
  slides?: string | null
  url?: string | null
  kind: "workshop" | "conference" | "meetup" | "podcast" | "livestream"
  published: boolean
  isFuture: boolean
  place?: string | null
}

interface Props {
  events: TalkProps[]
  maxCols?: 2 | 3
}

// Type guard for validating individual event properties
function isValidEventForDisplay(event: unknown): event is TalkProps {
  if (!event || typeof event !== "object") return false

  const e = event as Record<string, unknown>

  return (
    typeof e.id === "string" &&
    e.id.length > 0 &&
    typeof e.date_string === "string" &&
    e.date_string.length > 0 &&
    typeof e.event_name === "string" &&
    e.event_name.length > 0 &&
    typeof e.title === "string" &&
    e.title.length > 0 &&
    typeof e.description === "string" &&
    e.description.length > 0 &&
    typeof e.kind === "string" &&
    typeof e.published === "boolean" &&
    typeof e.isFuture === "boolean"
  )
}

// Sanitize and validate URL strings
function sanitizeUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return null
  }

  const trimmed = url.trim()

  // Basic URL validation
  try {
    new URL(trimmed)
    return trimmed
  } catch {
    // If it's not a valid URL, check if it's a relative path
    if (
      trimmed.startsWith("/") ||
      trimmed.startsWith("./") ||
      trimmed.startsWith("../")
    ) {
      return trimmed
    }

    console.warn("Invalid URL format:", trimmed)
    return null
  }
}

export function EventHighlights(props: Props) {
  const cols = () => {
    switch (props.maxCols) {
      case 3:
        return "sm:grid-cols-3"
      case 2:
      default:
        return "sm:grid-cols-2"
    }
  }
  const shouldHighlightFirst = () => (props.maxCols || 2) < 3

  // Validate and sanitize events data
  const validatedEvents = createMemo(() => {
    if (!Array.isArray(props.events)) {
      console.warn("EventHighlights: events prop is not an array")
      return []
    }

    return props.events
      .filter((event) => {
        if (!isValidEventForDisplay(event)) {
          console.warn("EventHighlights: Invalid event data for display", event)
          return false
        }
        return true
      })
      .map((event) => ({
        ...event,
        // Sanitize URLs
        url: sanitizeUrl(event.url),
        slides: sanitizeUrl(event.slides),
        recording: sanitizeUrl(event.recording),
        // Ensure strings are properly trimmed
        title: event.title.trim(),
        event_name: event.event_name.trim(),
        description: event.description.trim(),
        place: event.place?.trim() || null,
      }))
  })

  return (
    <ul class={`pt-20 grid ${cols()} gap-6`}>
      <Index each={validatedEvents()}>
        {(event, idx) => (
          <li
            class={`text-white group ${shouldHighlightFirst() ? "sm:first-of-type:col-span-2" : ""} group`}
          >
            <ShineBorder
              class="relative h-full overflow-hidden rounded-lg shadow-lg"
              color={["#000", "#f0f0f0"]}
            >
              <Card class="relative h-full grid grid-rows-[auto,1fr,auto]">
                <CardHeader>
                  <CardTitle class="dark:text-neutral-200 text-neutral-700">
                    <span
                      class={`w-full block text-center font-thin ${idx === 0 && shouldHighlightFirst() ? "text-3xl" : "text-2xl"}`}
                    >
                      {event().title}
                    </span>
                  </CardTitle>
                  <CardDescription class="text-center dark:text-neutral-300 text-neutral-600">
                    {event().event_name}
                    <Show when={event().place}>
                      <span> • {event().place}</span>
                    </Show>
                  </CardDescription>
                </CardHeader>
                <CardContent
                  class={`${idx === 0 && shouldHighlightFirst() ? "grid md:grid-cols-[auto,1fr] gap-10" : ""}`}
                >
                  <CardDescription
                    class={`dark:text-neutral-200 text-neutral-700 ${idx === 0 && shouldHighlightFirst() ? "text-lg" : ""} self-center`}
                  >
                    {event().description}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  <div class="w-full flex justify-between items-center">
                    <time
                      dateTime={event().date_string}
                      class="font-mono dark:text-slate-300 text-slate-500 text-sm"
                    >
                      <Show when={event().date_string !== "TBD"} fallback="TBD">
                        {event().date_string}
                      </Show>
                    </time>
                    <ul class="flex gap-4">
                      <Show when={event().url}>
                        {(url) => (
                          <li>
                            <a
                              href={url()}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-950 transition-colors"
                            >
                              event
                              <span
                                class="relative inline text-xs -top-1 left-1"
                                aria-hidden="true"
                              >
                                ↗
                              </span>
                            </a>
                          </li>
                        )}
                      </Show>
                      <Show when={event().slides}>
                        {(slides) => (
                          <li>
                            <a
                              href={slides()}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-950 transition-colors"
                            >
                              slides
                              <span
                                class="relative inline text-xs -top-1 left-1"
                                aria-hidden="true"
                              >
                                ↗
                              </span>
                            </a>
                          </li>
                        )}
                      </Show>
                      <Show when={event().recording}>
                        {(recording) => (
                          <li>
                            <a
                              href={recording()}
                              rel="noreferrer noopener"
                              target="_blank"
                              class="text-sm font-mono dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-200 hover:text-neutral-950 transition-colors"
                            >
                              recording
                              <span
                                class="relative inline text-xs -top-1 left-1"
                                aria-hidden="true"
                              >
                                ↗
                              </span>
                            </a>
                          </li>
                        )}
                      </Show>
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </ShineBorder>
          </li>
        )}
      </Index>
    </ul>
  )
}
