# Requirements Document

## Introduction

This feature adds a new section to the frontpage that displays upcoming events/talks that Atila will be speaking at. The section will showcase future appearances in a visually appealing card format, similar to the existing "Latest Videos" section, helping visitors discover upcoming opportunities to see Atila speak.

## Requirements

### Requirement 1

**User Story:** As a visitor to the website, I want to see upcoming events where Atila will be speaking, so that I can attend or follow his presentations.

#### Acceptance Criteria

1. WHEN I visit the homepage THEN the system SHALL display a section titled "Upcoming Events" or similar
2. WHEN the upcoming events section loads THEN the system SHALL show up to 3 future events
3. WHEN multiple future events exist THEN the system SHALL order them from further into the future to closets (chronologically)
4. WHEN no future events exist THEN the system SHALL hide the section or show an appropriate message

### Requirement 2

**User Story:** As a visitor, I want the upcoming events to be displayed in an attractive card format, so that I can easily scan and understand the event details.

#### Acceptance Criteria

1. WHEN displaying upcoming events THEN the system SHALL use a card layout similar to the video highlights section
2. WHEN showing event cards THEN each card SHALL display the event name, talk title, date, and description
3. WHEN an event has additional resources THEN the system SHALL show links to event page, slides, or recording if available
4. WHEN displaying cards THEN the system SHALL use the same visual styling and animations as the video section

### Requirement 3

**User Story:** As a visitor, I want to access more information about the events, so that I can learn details or register for attendance.

#### Acceptance Criteria

1. WHEN an event card is displayed THEN the system SHALL provide clickable links to the event page if available
2. WHEN event resources exist THEN the system SHALL show appropriate links (event, slides, recording)
3. WHEN I click on event links THEN the system SHALL open them in a new tab/window
4. WHEN the event date is available THEN the system SHALL display it in a readable format (YYYY-MM_DD)

### Requirement 4

**User Story:** As a site maintainer, I want the upcoming events to use the existing data source, so that I don't need to manage separate data or endpoints.

#### Acceptance Criteria

1. WHEN fetching upcoming events THEN the system SHALL use the existing fetchAppearances function from db.server.ts
2. WHEN filtering events THEN the system SHALL only show events where isFuture is true and published is true
3. WHEN ordering events THEN the system SHALL sort by date_string in ascending order (earliest first)
4. WHEN limiting results THEN the system SHALL take only the first 3 events after filtering and sorting
