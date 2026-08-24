# AGENTS.md

## Commands

```sh
npm run dev       # dev server (http://localhost:5173)
npm run build     # production build (Vercel adapter)
npm run lint      # prettier --check . && eslint .
npm run format    # prettier --write . (run before committing)
npx svelte-check  # typecheck
```

- No test suite exists. Verification = `npm run lint` + `npm run build`.
- `npx svelte-check` reports ~90 **pre-existing** errors (untyped JS props). Don't try to fix them all; only ensure your changes add none.
- Prettier sorts Tailwind classes (`prettier-plugin-tailwindcss`) and reformats `.svelte` files — expect diffs from `npm run format` on untouched lines.

## Stack conventions

- **Svelte 5 runes everywhere**: `$state`, `$derived`, `$effect`, `$props()`. No legacy `let` reactivity or `export let`. Reactive state lives in `.svelte.js` files (see `src/lib/stores/settings.svelte.js`).
- **Tailwind v4 CSS-first**: no `tailwind.config.js`. All design tokens are OKLCH CSS variables defined in `src/app.css` under `:root` / `.dark`, mapped via `@theme inline`.
- **Never hardcode colors** (e.g. `emerald-500`). Add/use tokens in `app.css` instead (`--success` exists). The palette is derived from the logo (`src/lib/assets/logo.svg`: blue `#0090C9`, green `#25C402`) — keep it consistent.
- Dark mode is class-based (`.dark` on `<html>`); the anti-FOUC inline script in `src/app.html` must keep running before paint.
- **shadcn-svelte** components live in `src/lib/components/ui/` and style via `tailwind-variants` using the tokens. Prefer extending variants over one-off classes.
- **i18n (fr/en)**: UI strings in `src/lib/i18n/locales/{fr,en}.json`, quiz datasets in `src/lib/data/{fr,en}/`. Any new string must exist in both languages.
- **GSAP animations** grab elements via `bind:this` refs and run inside `$effect` wrapped in `untrack()` to avoid reactive ping-pong (see any quiz page for the pattern).

## Gotchas

- Quiz pages derive their data from `$i18n.language`; question generation must stay untracked or it loops.
- Flags load at runtime from flagcdn.com — no local flag assets.
- Deploy is automatic on Vercel from `main`.
