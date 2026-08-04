# Orbiting Circles — React/shadcn Integration for 1DD STUDIO

## Current codebase result

The current 1DD STUDIO V10 website is static HTML/CSS/JavaScript. It does not yet include React, TypeScript, Tailwind CSS, `components.json`, or the `@/*` path alias. Do not paste TSX into the current `index.html`; it will not compile.

## Recommended setup

Create a React + TypeScript + Tailwind/shadcn app:

```bash
npx shadcn@latest init -t vite
npm install lucide-react
```

Copy the files from this folder into the generated app:

```text
components/ui/orbiting-circles-02.tsx
components/ui/orbiting-circles-02-utils/particalsphear.tsx
demo.tsx
```

If using an existing Vite React app instead:

```bash
npm install tailwindcss @tailwindcss/vite lucide-react
npx shadcn@latest init
```

Add `tailwindcss()` to `vite.config.ts`, import `@import "tailwindcss";` in the global stylesheet, and confirm `tsconfig.json` maps `@/*` to the source root.

## Default paths

- UI components: `/components/ui`
- Global styles: `/src/index.css` in a typical Vite app, or `/app/globals.css` in Next.js

Keeping `/components/ui` matters because shadcn's `components.json` alias and the component import use `@/components/ui/...`. A different path requires changing both the alias configuration and every import.

## Dependencies and behavior

- React client component
- `lucide-react` for accessible, tree-shakable icons
- Local canvas particle sphere utility; no external animation package
- No provider, hook library, API, state manager, or remote asset is required
- No Unsplash image is added because this component contains no photographic surface
- Responsive: compact half-globe on mobile, expanded rings on desktop
- Reduced-motion preference pauses orbit animations

## Recommended placement

Place `<Demo />` after the 1DD STUDIO introduction and before the product packages. It should communicate the full service journey without replacing the real Before/After work.

## Props/state decision

The supplied component has no external props and only animation-local state. The 1DD adaptation uses fixed service icons and labels. Convert `orbits` into a prop only if the same visual will be reused for other service groups.
