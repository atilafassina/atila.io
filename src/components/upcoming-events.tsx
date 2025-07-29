import { Show, createMemo } from "solid-js"
import { SectionHeader } from "./section-header.tsx"
import { EventHighlights, type TalkProps } from "./event-highlights.tsx"
import { talkSchema } from "~/lib/schemas.ts"

interface Props {
  events: TalkProps[]
}

// Type guard to validate event data using Zod schema
function isValidEvent(event: unknown): event is TalkProps {
  try {
    const parsed = talkSchema.parse(event)
    // Additional validation for non-empty required fields
    return (
      parsed.date_string !== "" &&
      parsed.event_name !== "" &&
      parsed.title !== "" &&
      parsed.description !== ""
    )
  } catch {
    return false
  }
}

export function UpcomingEvents(props: Props) {
  // Filter and validate events, handling edge cases
  const validEvents = createMemo(() => {
    if (!Array.isArray(props.events)) {
      console.warn("UpcomingEvents: events prop is not an array")
      return []
    }

    return props.events.filter((event) => {
      // Validate event structure
      if (!isValidEvent(event)) {
        console.warn("UpcomingEvents: Invalid event data", event)
        return false
      }

      // Additional validation for required fields
      if (event.date_string === "TBD" || event.date_string === "") {
        return false
      }

      // Validate date format (basic check)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(event.date_string)) {
        console.warn("UpcomingEvents: Invalid date format", event.date_string)
        return false
      }

      // Ensure it's actually a future event
      const eventDate = new Date(event.date_string)
      const now = new Date()
      if (isNaN(eventDate.getTime()) || eventDate <= now) {
        return false
      }

      return true
    })
  })

  // Only render section if we have valid upcoming events
  return (
    <Show when={validEvents().length > 0}>
      <section class="max-w-4xl w-full px-5 overflow-hidden pb-36">
        <SectionHeader
          title="Upcoming Events"
          subtitle="I'll be speaking at these upcoming events. Come say hi if you're attending, or follow along for updates and resources from my talks."
        />
        <EventHighlights events={validEvents()} maxCols={3} />
      </section>
    </Show>
  )
}
