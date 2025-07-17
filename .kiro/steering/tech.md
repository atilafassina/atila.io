# Tech Stack & Build System

## Core Framework

- **Astro 5.x** - Main framework with server-side rendering
- **SolidJS** - Interactive components and client-side functionality
- **TypeScript** - Strict typing with NodeNext module resolution

## Styling & UI

- **TailwindCSS** - Utility-first CSS framework with custom design system
- **Tailwind Animate** - Animation utilities
- **Custom CSS** - Global styles in `src/global.css` with CSS layers
- **Jost Font** - Primary typeface via Fontsource

## Key Libraries

- **Zod** - Schema validation
- **Octokit** - GitHub API integration
- **Neon Database** - Serverless PostgreSQL
- **Lucide Solid** - Icon library for SolidJS
- **Class Variance Authority** - Component variant management

## Development Tools

- **Prettier** - Code formatting with Astro plugin
- **Sharp** - Image optimization
- **pnpm** - Package manager

## Deployment

- **Vercel** - Serverless deployment platform
- **Server output mode** - Dynamic rendering with static optimization

## Common Commands

```bash
# Development
pnpm install && pnpm dev    # Install deps and start dev server
pnpm start                  # Alternative dev command

# Build & Deploy
pnpm build                  # Generate sitemap and build for production
pnpm preview               # Preview production build locally

# Utilities
pnpm astro                 # Access Astro CLI commands
```

## Configuration Notes

- Uses `~/*` path alias for `./src/*`
- JSX configured for SolidJS
- Strict TypeScript configuration
- Custom Tailwind theme with CSS variables for colors
- Prettier configured without semicolons
