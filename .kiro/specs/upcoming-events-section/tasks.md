# Implementation Plan

- [x] 1. Create EventHighlights component with card rendering logic

  - Create `src/components/event-highlights.tsx` file
  - Implement responsive grid layout similar to VideoHighlights
  - Add event card rendering with ShineBorder and Card components
  - Include proper TypeScript interfaces and props handling
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Create UpcomingEvents container component

  - Create `src/components/upcoming-events.tsx` file
  - Implement section header with appropriate title and subtitle
  - Add conditional rendering for events vs empty state
  - Integrate EventHighlights component
  - _Requirements: 1.1, 1.4, 2.1_

- [x] 3. Add data fetching and filtering logic to homepage

  - Modify `src/pages/index.astro` to import fetchAppearances function
  - Implement server-side filtering for future, published events with valid dates
  - Add sorting logic to order events chronologically (earliest first)
  - Limit results to maximum 3 events
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 1.2, 1.3_

- [x] 4. Integrate upcoming events section into homepage layout

  - Add UpcomingEvents component to homepage between videos and projects sections
  - Pass filtered event data as props to the component
  - Ensure proper spacing and responsive layout integration
  - _Requirements: 1.1, 2.1_

- [x] 5. Implement event card content and styling

  - Add event name, title, date, and description display to cards
  - Implement resource links (event page, slides, recording) similar to appearance cards
  - Apply consistent styling with video section cards
  - Add proper date formatting and display
  - _Requirements: 2.2, 2.3, 3.1, 3.2, 3.3, 3.4_

- [x] 6. Add conditional section rendering and empty state handling

  - Implement logic to hide section when no upcoming events exist
  - If no future events, it should not show the component
  - Add proper TypeScript type checking for event data
  - Handle edge cases for malformed or missing data
  - _Requirements: 1.4, 4.2_

- [ ] 7. Test and verify implementation
  - Create test data scenarios (future events, past events, no events)
  - Verify responsive layout behavior across different screen sizes
  - Test card interactions and link functionality
  - Ensure consistent styling with existing sections
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_
