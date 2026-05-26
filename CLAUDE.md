# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test suite is configured.

## Architecture

Single-page React portfolio for Brian Mock (video producer/director). All content is one scrollable page.

**Entry point:** `src/main.jsx` → `src/App.jsx`

**Path alias:** `@/` maps to `src/` (configured in `vite.config.js`).

**Component layout in `App.jsx` (top to bottom):**
- `CinematicEnvironment` — fixed-position Three.js canvas (`z-0`), renders behind everything
- `ScrollManager` — mounts Lenis smooth scroll + wires it to GSAP ScrollTrigger; renders nothing
- Page sections at `z-10`: `Navbar`, `Hero`, `IntroSection`, `Work`, `Capabilities`, `FocusSection`, `AISection`, `DroneSection`, `Resume`, `Footer`

**Animation system:** GSAP + ScrollTrigger drive all scroll-linked animations. Lenis handles smooth scrolling and feeds tick events to GSAP via `lenis.on('scroll', ScrollTrigger.update)`. Body overflow is locked to `hidden` on mount and released by `Loader` after Three.js assets finish loading (`useProgress` from `@react-three/drei`).

**3D layer (`CinematicEnvironment.jsx`):** React Three Fiber canvas with 18 floating glass lenses (`MeshTransmissionMaterial`), a starfield particle system, studio spotlights, and postprocessing (Bloom, Vignette, ChromaticAberration). GSAP animates light intensities and group positions via ScrollTrigger on mount.

**Data:** All portfolio content (work samples, capabilities, role fits, filters) lives in `src/data/portfolioData.js` — edit this file to update portfolio items or add new work samples. YouTube URLs use `REPLACE_ME` placeholders.

**Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin, imported as `@import "tailwindcss"` in `index.css`). Custom design tokens defined under `@theme inline` in `index.css`: `studio-*` dark palette, `silver-*` neutral scale, `accent-warm`/`accent-cool`. Utility classes `metallic-text` and `cinematic-glass` are defined as global CSS.

**UI primitives:** `src/components/ui/` holds shadcn-style `button.jsx` and `card.jsx`. `src/lib/utils.js` exports the `cn()` helper (clsx + tailwind-merge).