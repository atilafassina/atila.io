---
title: "Getting Started with Markdown on SolidStart"
description: "Learn how to implement markdown rendering with server-side rendering in your SolidStart application"
publishedAt: "2026-01-29"
author: "Atila Fassina"
tags: ["solidstart", "markdown", "ssr"]
---

# Getting Started with Markdown on SolidStart

This is an example markdown article demonstrating the new markdown rendering capabilities with server-side rendering (SSR).

## Features

The markdown rendering system includes several powerful features:

- **GitHub Flavored Markdown (GFM)** support
- **Syntax highlighting** for code blocks
- **Frontmatter** for metadata
- **Server-side rendering** for optimal performance
- **SEO-friendly** meta tags

## Code Example

Here's a simple example of SolidJS code:

```typescript
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  
  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  );
}
```

## Why Server-Side Rendering?

Server-side rendering of markdown provides several benefits:

1. **Better SEO** - Content is immediately available to search engines
2. **Faster initial load** - No client-side processing required
3. **Progressive enhancement** - Works without JavaScript
4. **Smaller bundle size** - No markdown parser shipped to client

## Styling

The content is styled using the Tailwind Typography plugin, which provides beautiful default styles for markdown content that respect your design system.

## Links and Images

You can include [external links](https://solidjs.com) and internal navigation seamlessly.

---

This implementation uses unified/remark/rehype for markdown processing, providing a robust and extensible solution for content management.
