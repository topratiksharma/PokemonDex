# PokemonDex — Upgrade, Bug-Fix & Tailwind Migration Plan

## Context7 Review — Corrections Applied

The following issues were found by cross-referencing current library docs and corrected below:

| # | Severity | Issue | Fix Applied |
|---|---|---|---|
| 1 | **Critical** | Apollo Client v4 moves `useQuery` to `@apollo/client/react` — plan had wrong import path and missed the v3→v4 upgrade | Phase 2: Apollo section rewritten with v4 import path + upgrade instruction |
| 2 | **High** | React Router latest v6 is **6.30.x**, not 6.28.x | Phase 2 table corrected |
| 3 | **Medium** | Vite TypeScript projects require a `vite/client` type shim — plan was missing this step | Phase 1 step 1.4 updated with `vite-env.d.ts` instruction |
| 4 | **Medium** | react-markdown v9 changed the default import name (`ReactMarkdown` → `Markdown`) and needs `remark-gfm` for tables | Phase 2 Apollo/react-markdown section updated |
| 5 | **Low** | React Router v6.30 docs recommend adding `future={{ v7_startTransition: true }}` to HashRouter | Phase 2 verification updated |

---

## Context

The app is a working Create React App (v4) project on React 17, TypeScript 4.5, react-jss, MUI v5, and React Router 6.0.2. Three problems motivated this plan:

1. **Outdated tooling** — CRA is unmaintained; React, TypeScript, and several packages are multiple major versions behind.
2. **Technical debt** — 47 issues found: direct DOM access, broken tests, missing types, no error handling, accessibility gaps, and a Pokédex number formatting bug.
3. **Styling modernisation** — react-jss is being replaced with Tailwind CSS for a cleaner, more maintainable design system.

The goal is a working, modern app after each phase — no big-bang rewrites.

---

## Phase 1 — Build Infrastructure (CRA → Vite, React 18, TS 5)

**Why first:** Everything downstream depends on the bundler and React version being correct.

### Steps

**1.1 Replace `react-scripts` with Vite 5**

```bash
npm uninstall react-scripts
npm install -D vite@5 @vitejs/plugin-react
```

Create `vite.config.ts` at project root:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
```

**1.2 Move `public/index.html` → project root `index.html`**

Replace CRA's `%PUBLIC_URL%` tokens with bare paths. Add the Vite entry script tag:
```html
<script type="module" src="/src/index.tsx"></script>
```

**1.3 Update `package.json` scripts**
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

**1.4 Upgrade TypeScript and types**
```bash
npm install -D typescript@5 @types/react@18 @types/react-dom@18 @types/node@20
```

Update `tsconfig.json`:
- `"target": "ES2020"`, `"module": "ESNext"`, `"moduleResolution": "bundler"`
- Remove CRA-specific workarounds
- Add `"vite/client"` to `compilerOptions.types` so Vite's env/asset type shims are available:

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

Alternatively, create `src/vite-env.d.ts` with:
```ts
/// <reference types="vite/client" />
```

**1.5 Upgrade React to 18**
```bash
npm install react@18 react-dom@18
```

Update `src/index.tsx` from `ReactDOM.render()` → `createRoot()`:
```ts
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')!).render(<App />)
```

**1.6 Netlify: confirm `public/_redirects` still contains `/* /index.html 200`**
Vite copies `public/` to `dist/` just like CRA did.

**Verification:** `npm run dev` serves the app. `npm run build` produces `dist/`. No TS errors.

---

## Phase 2 — Dependency Upgrades

**Why second:** Isolate package changes from code changes for easier debugging.

| Package | Current | Action |
|---|---|---|
| `react-router-dom` | 6.0.2 | → 6.30.x (latest v6; do NOT upgrade to v7 — breaking API) |
| `@apollo/react-hooks` | 4.0.0 | Remove — migrate to `useQuery` from `@apollo/client/react` (see note below) |
| `react-markdown` | 7.1.1 | → 9.x (v10 requires React 19) |
| `graphql` | 16.0.1 | → 16.14.0 |
| `clsx` | 1.1.1 | → 2.1.1 (drop-in) |
| `@mui/material` + `@mui/icons-material` | 5.10 | → 5.18 latest patch |

**Apollo migration** — Apollo Client v4 is now available (the installed v3 is two major versions behind). The import path changed between v3 and v4:

- **Apollo Client v3** (current): `import { useQuery } from '@apollo/client'`
- **Apollo Client v4** (latest): `import { useQuery } from '@apollo/client/react'`

**Recommended:** Upgrade to Apollo Client v4 (`npm install @apollo/client@4`) and use the new import path. This is a one-line change per file but gets you on the supported major version. In `src/hooks/useGetPokemons.ts`:
```ts
// Before (v3 / @apollo/react-hooks)
import { useQuery } from '@apollo/react-hooks'
// After (v4)
import { useQuery } from '@apollo/client/react'
```
Then `npm uninstall @apollo/react-hooks`.

> If you prefer to stay on v3 for now, use `from '@apollo/client'` — but plan a v4 upgrade separately.

**react-markdown v9** — two things changed from v7:
1. The `plugins` prop was renamed to `remarkPlugins` (already noted in original plan — correct ✅)
2. The component's conventional import name changed from `ReactMarkdown` to `Markdown`:
```tsx
// Before (v7)
import ReactMarkdown from 'react-markdown'
// After (v9)
import Markdown from 'react-markdown'
<Markdown>{markdown}</Markdown>
```
To render tables and task lists from the README, also install `remark-gfm`:
```bash
npm install remark-gfm
```
```tsx
import remarkGfm from 'remark-gfm'
<Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
```

**Optional but recommended — add React Router v7 future flags to HashRouter** (eases future migration, zero breaking change now):
```tsx
<HashRouter future={{ v7_startTransition: true }}>
```

**Verification:** App loads. Apollo queries return Pokémon data. Home README renders (including any tables/task lists via remark-gfm).

---

## Phase 3 — Bug Fixes

**Why third:** Fix correctness before changing styling to avoid mixed-cause regressions.

### HIGH Severity

- [ ] **3.1** Replace `document.getElementById('search')` with `useRef` — `PokemonList.tsx`
- [ ] **3.2** Rewrite `App.test.tsx` — test checks for text that doesn't exist; replace with a smoke test
- [ ] **3.3** Remove `const classes: any` in `PokemonCard.tsx`, `PokemonDialog.tsx`, `PokemonList.tsx`
- [ ] **3.4** Add `children: React.ReactNode` to `NavOption.tsx` Props interface
- [ ] **3.5** Add ARIA attributes to Nav toggle button (`aria-label`, `aria-expanded`, `aria-controls`)
- [ ] **3.6** Fix barrel file `src/components/index.ts` — add `PokemonCard` and `PokemonDialog` exports

### MEDIUM Severity

- [ ] **3.7** Remove unused `BrowserRouter` import in `App.tsx`
- [ ] **3.8** Fix Pokédex number formatting: `'#0' + number` → `'#' + String(number).padStart(3, '0')`
- [ ] **3.9** Make search input controlled (add `value` + `useState`)
- [ ] **3.10** Add error handling to `useGetPokemons` hook
- [ ] **3.11** Add error handling + loading state to `Home.tsx` fetch
- [ ] **3.12** Add 300ms debounce to search in `PokemonList.tsx`

**Verification:** TypeScript compiles with zero `any` escapes in fixed files. Pokémon #100+ shows `#100` not `#0100`. Tests pass.

---

## Phase 4 — Tailwind Installation + MUI Coexistence

**Why before JSS migration:** Configure tooling and verify coexistence before touching component styles.

- [ ] **4.1** Install Tailwind v3: `npm install -D tailwindcss@3 postcss autoprefixer && npx tailwindcss init -p`
- [ ] **4.2** Configure `tailwind.config.js` with `important: '#root'` (wins specificity over MUI Emotion)
- [ ] **4.3** Add Tailwind directives at top of `src/index.css`
- [ ] **4.4** Verify one test class applies, then remove it

**Key config:**
```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: { 'bg-primary': '#171E2B', 'bg-secondary': '#131924' },
      fontFamily: { poppins: ['Poppins', 'sans-serif'] },
    },
  },
  plugins: [],
}
```

> Note: Use `export default` (ESM) because `"type": "module"` is set in `package.json` (required for Vite 5 + `@vitejs/plugin-react`).

---

## Phase 5 — JSS → Tailwind Migration (8 files)

Migrate easiest → hardest. Uninstall `react-jss` only after all 8 are done.

| Order | File | Complexity | Notes |
|---|---|---|---|
| 1 | `ListPage.tsx` | Very Low | 2 static classes |
| 2 | `App.tsx` | Low | 3 static layout classes |
| 3 | `NavOption.tsx` | Low | Hover/active → Tailwind state variants |
| 4 | `Home.tsx` | Low | Add `@tailwindcss/typography`; wrap in `<article className="prose prose-invert max-w-none">` |
| 5 | `PokemonList.tsx` | Medium | Custom breakpoints → Tailwind arbitrary values |
| 6 | `PokemonDialog.tsx` | Medium | Tailwind only on inner children of MUI Dialog |
| 7 | `Nav.tsx` | Medium | Dynamic: `${navCollapsed ? 'w-[81px]' : 'w-[320px]'}` — JIT picks up complete string literals |
| 8 | `PokemonCard.tsx` | High | Dynamic: 15 type colours — use static lookup map (see below) |

**PokemonCard type-color map** (all class strings must be complete literals for JIT):
```ts
const TYPE_BG: Record<string, string> = {
  fire: 'bg-[#FFC107]',     water: 'bg-[#b4defb]',    grass: 'bg-[#E2F9E1]',
  electric: 'bg-[#ffffa1]', psychic: 'bg-[#CDDC39]',  ice: 'bg-[#00BCD4]',
  dragon: 'bg-[#FBE3DF]',   fairy: 'bg-[#ffc0cbdc]',  fighting: 'bg-[#a1a6f9]',
  poison: 'bg-[#eac6f7]',   ground: 'bg-[#9e9e9e]',   rock: 'bg-[#c49393]',
  ghost: 'bg-[#f7f7f7]',    bug: 'bg-[#F6D6A7]',      normal: 'bg-white',
  steel: 'bg-slate-300',    flying: 'bg-slate-200',
}
```

After all 8 files: `npm uninstall react-jss`

---

## Phase 6 — Visual Polish

**PokemonCard** — type-color bg + `border border-black/5 rounded-2xl shadow-md` + `hover:scale-[1.04] hover:shadow-xl transition-all duration-200`

**Nav** — active route: `border-l-4 border-blue-400 bg-white/5`; right edge: `border-r border-white/[0.06]`

**Search input** — `bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none`

**Home README** — `<article className="prose prose-invert prose-sm max-w-none px-8 py-6">`

---

## Phase 7 — Tailwind v3 → v4 Upgrade

**Do this after Phase 6 is complete and the app is stable.** v4 is a significant tooling change and is best tackled as its own isolated step.

**Key changes v4 requires:**

**7.1 Replace packages**
```bash
npm uninstall tailwindcss autoprefixer
npm install -D tailwindcss@latest @tailwindcss/vite
```

**7.2 Update `vite.config.ts`** — replace the PostCSS approach with v4's first-party Vite plugin:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
Delete `postcss.config.js` — it's no longer needed.

**7.3 Update `src/index.css`** — replace `@tailwind` directives with a single import:
```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import "tailwindcss";
```

**7.4 Migrate `tailwind.config.js` → CSS `@theme`**

v4 removes `tailwind.config.js`. Move theme tokens into `src/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-bg-primary: #171E2B;
  --color-bg-secondary: #131924;
  --font-poppins: 'Poppins', sans-serif;
}
```
Delete `tailwind.config.js`.

**7.5 Fix MUI specificity — replace `important: '#root'`**

The `important` selector strategy no longer exists in v4. Two options:
- **Option A (recommended):** Use the `!` prefix on any Tailwind class that needs to override MUI: e.g., `!rounded-xl` instead of `rounded-xl`. Affects only the small subset of classes applied directly to MUI component children.
- **Option B:** Add a CSS layer rule in `index.css` to manually control ordering: `@layer base, components, utilities;`

**7.6 Run the official upgrade codemod**
```bash
npx @tailwindcss/upgrade
```
This handles most mechanical changes (directives, renamed utilities, removed classes) automatically.

**Verification:** `npm run dev` — all styles render correctly. MUI Dialog, cards, and nav look identical to post-Phase-6. `npm run build` succeeds.

---

## Technical Flaw Summary

| Severity | Count | Key Examples |
|---|---|---|
| HIGH | 9 | getElementById, broken test, `any` types, barrel exports, ARIA |
| MEDIUM | 24 | uncontrolled input, missing errors, number format bug, `!important` hacks |
| LOW | 14 | missing loading states, duplicate exports |

---

## End-to-End Verification Checklist

- [ ] `npm run dev` — app loads, sidebar collapses/expands, 151 cards with type colours
- [ ] Search by name — filters in <300ms debounce window
- [ ] Click a card → dialog shows full stats; close → returns to list
- [ ] `npm run build` — zero TS errors, zero `react-jss` imports
- [ ] Pokémon #100+ shows `#100`, not `#0100`
- [ ] Narrow to mobile — Dialog goes full-screen, grid collapses
- [ ] `npm test` — smoke test passes

---

## Critical Files

| File | Why |
|---|---|
| `src/index.tsx` | React 18 createRoot migration |
| `src/components/PokemonList/PokemonList.tsx` | Most bug fixes + debounce + breakpoints |
| `src/components/PokemonCard/PokemonCard.tsx` | Hardest JSS migration (dynamic type colours) |
| `src/components/Nav/Nav.tsx` | Dynamic width + ARIA fixes |
| `src/components/index.ts` | Barrel export fixes |
| `src/hooks/useGetPokemons.ts` | Apollo import migration + error surface |
| `tailwind.config.js` | `important: '#root'` is key to MUI coexistence |
| `vite.config.ts` | New file replacing CRA build pipeline |
