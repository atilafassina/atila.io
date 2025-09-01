# Agent Guide for SolidStart Project

## Build/Lint/Test Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- No test scripts configured - use basic validation via build

## Code Style Guidelines

### Imports

- Use ES modules (`import`/`export`)
- Group imports: external packages first, then internal with `~/` alias
- Import CSS files after JS imports

### TypeScript

- Strict mode enabled
- Use JSX preserve mode with SolidJS
- Prefer explicit types when needed
- Path alias `~/*` maps to `./src/*`

### SolidJS Conventions

- Use `createSignal` for reactive state
- Use named exports for components
- Use `class` attribute (not `className`)
- Follow SolidJS patterns for JSX

### Formatting

- Use double quotes for strings
- Semicolons required
- 2-space indentation (inferred from existing code)
- Prefer named exports whenever possible
