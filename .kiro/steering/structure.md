# Project Structure & Organization

## Root Level

- `astro.config.ts` - Astro configuration with integrations
- `tailwind.config.ts` - Custom Tailwind theme and animations
- `tsconfig.json` - TypeScript configuration with path aliases
- `package.json` - Dependencies and scripts
- `generate-sitemap.js` - Custom sitemap generation
- `pages.codegen.json` - Generated pages for sitemap

## Source Structure (`src/`)

### Pages (`src/pages/`)

- Astro pages following file-based routing
- RSS feed generators (`*-rss.xml.ts`)
- Main pages: `index.astro`, `about.astro`, `writing.astro`, `talks.astro`, `channel.astro`

### Components (`src/components/`)

- **Astro components** - `.astro` files for static/server-rendered content
- **SolidJS components** - `.tsx` files for interactive functionality
- **Icons** - SVG icon components in `icons/` subdirectory
- **UI Libraries**:
  - `solid-ui/` - SolidJS UI components (cards, badges)
  - `mystic-ui/` - Custom animated components (border-beam, shine-border)

### Layouts (`src/layouts/`)

- Page layout templates and wrappers

### Library (`src/lib/`)

- Utility functions and integrations
- Database connections (`db.server.ts`)
- External API integrations (`github.ts`, `video-getter.ts`)
- Schema definitions (`schemas.ts`)
- Helper utilities (`tw-merge.ts`, `format-month.ts`)

### Styling

- `src/global.css` - Global styles with Tailwind layers
- `src/app.css` - Additional application styles

### Assets

- `src/images/` - Optimized images and SVGs
- `public/` - Static assets served directly

## Conventions

### File Naming

- Kebab-case for files and directories
- `.astro` for server-rendered components
- `.tsx` for SolidJS interactive components
- `.ts` for utilities and server-side code

### Import Patterns

- Use `~/` alias for `src/` imports
- Relative imports for same-directory files
- Explicit file extensions for TypeScript imports

### Component Architecture

- Astro components for static content and layouts
- SolidJS components for interactive features
- Shared UI components in dedicated directories
- Icon components isolated in `icons/` folder

### Styling Approach

- Tailwind utility classes as primary styling method
- CSS custom properties for theme colors
- Component-specific styles in global CSS layers
- Responsive design with mobile-first approach
