# Design Document

## Overview

The upcoming events section will be implemented as a new section on the homepage, positioned between the existing "Latest Videos" section and the "Projects" section. It will follow the same architectural patterns as the video highlights section, using SolidJS for interactivity and reusing existing UI components for consistency.

## Architecture

### Component Structure

```
src/pages/index.astro (modified)
├── UpcomingEvents component (new)
    ├── SectionHeader (existing)
    ├── EventHighlights (new)
        └── Card components (existing solid-ui)
            └── ShineBorder (existing mystic-ui)
```

### Data Flow

1. `index.astro` fetches upcoming events using existing `fetchAppearances()` function
2. Filter and sort events on the server side for future events only
3. Pass filtered events to new `UpcomingEvents` component
4. Component renders events using similar structure to `VideoHighlights`

## Components and Interfaces

### New Components

#### 1. UpcomingEvents Component (`src/components/upcoming-events.tsx`)

- **Purpose**: Container component that renders the section header and event highlights
- **Props**:
  ```typescript
  interface Props {
    events: TalkProps[]
  }
  ```
- **Responsibilities**:
  - Render section header with appropriate title and subtitle
  - Conditionally render EventHighlights or empty state
  - Handle responsive layout

#### 2. EventHighlights Component (`src/components/event-highlights.tsx`)

- **Purpose**: Renders grid of event cards similar to VideoHighlights
- **Props**:
  ```typescript
  interface Props {
    events: TalkProps[]
    maxCols?: 2 | 3
  }
  ```
- **Responsibilities**:
  - Render responsive grid of event cards
  - Apply consistent styling with video section
  - Handle card highlighting for first item

### Modified Components

#### 1. Homepage (`src/pages/index.astro`)

- **Changes**:
  - Import and call `fetchAppearances()` function
  - Filter events for future appearances
  - Add UpcomingEvents component to layout
- **Data Processing**:
  ```typescript
  const upcomingEvents = (await fetchAppearances())
    .filter(
      (event) =>
        event.isFuture && event.published && event.date_string !== "TBD",
    )
    .sort(
      (a, b) =>
        new Date(a.date_string).getTime() - new Date(b.date_string).getTime(),
    )
    .slice(0, 3)
  ```

## Data Models

### Event Data Structure

The component will use the existing `talkSchema` from `~/lib/schemas.ts`:

```typescript
interface EventProps {
  id: string
  date_string: string
  event_name: string
  title: string
  description: string
  recording?: string | null
  slides?: string | null
  url?: string | null
  kind: TalkType
  published: boolean
  isFuture: boolean
  place?: string | null
}
```

### Data Filtering Logic

- **Future Events**: `isFuture === true`
- **Published Events**: `published === true`
- **Valid Dates**: `date_string !== "TBD"`
- **Sorting**: Ascending by `date_string` (earliest first)
- **Limit**: Maximum 3 events

## Error Handling

### Empty State Handling

- **No Future Events**: Hide section entirely or show "No upcoming events" message
- **Invalid Dates**: Filter out events with "TBD" dates
- **Network Errors**: Graceful degradation - section won't render if data fetch fails

### Data Validation

- Use existing `talkListSchema` for runtime validation
- Handle malformed date strings gracefully
- Provide fallback values for optional fields

## Testing Strategy

### Unit Tests

1. **Event Filtering Logic**:

   - Test filtering of future vs past events
   - Test published vs unpublished events
   - Test date sorting (ascending order)
   - Test limit of 3 events

2. **Component Rendering**:

   - Test EventHighlights renders correct number of cards
   - Test empty state handling
   - Test responsive grid classes
   - Test card content rendering

3. **Data Processing**:
   - Test date parsing and sorting
   - Test edge cases (no events, all past events)
   - Test malformed data handling

### Integration Tests

1. **Homepage Integration**:

   - Test section appears in correct position
   - Test section styling matches other sections
   - Test responsive behavior

2. **Database Integration**:
   - Test fetchAppearances integration
   - Test data filtering pipeline
   - Test error handling for database failures

### Visual Testing

1. **Card Layout**:

   - Verify cards match video section styling
   - Test responsive grid behavior
   - Test card hover effects and animations

2. **Section Integration**:
   - Verify section fits homepage layout
   - Test spacing and alignment with other sections
   - Test dark/light theme compatibility

## Implementation Notes

### Styling Approach

- Reuse existing Tailwind classes from VideoHighlights
- Maintain consistent spacing and typography
- Use existing ShineBorder and Card components
- Follow established responsive breakpoints

### Performance Considerations

- Server-side filtering reduces client-side processing
- Limit to 3 events reduces payload size
- Reuse existing components minimizes bundle size
- Static generation where possible (prerender: true)

### Accessibility

- Proper semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly date formatting

### SEO Considerations

- Structured data for events (JSON-LD)
- Proper heading hierarchy
- Descriptive alt text for any images
- Semantic HTML for better crawling
