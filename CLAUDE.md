# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server at http://localhost:3000
npm run build    # production build
npm test         # run tests (watch mode)
npm test -- --watchAll=false  # run tests once
npm test -- --testPathPattern=App  # run a single test file
```

## Architecture

This is a Create React App project (React 17, TypeScript) that displays the original 151 Pokémon using GraphQL data from `https://graphql-pokemon2.vercel.app`.

**Data layer** — `src/hooks/useGetPokemons.ts` contains all GraphQL queries and hooks:
- `useGetPokemons()` fetches the list (first 151) with id, name, number, types, image
- `useGetPokemonDetails(id)` fetches full details for a single Pokémon
- `Pokemon` and `PokemonOption` types are defined here and used throughout

**Apollo client** — configured in `src/app/client.ts` with `InMemoryCache`. Wrap components via `<ApolloProvider>` already set up in `App.tsx`.

**Routing** — uses `HashRouter` (not `BrowserRouter`) with a nested route pattern:
```
/           → Home (renders src/README.md as markdown)
/pokemon    → ListPage → PokemonList (with Outlet for child route)
/pokemon/:id → PokemonDialog rendered as a child route inside ListPage
```
The dialog is route-driven: navigating to `/pokemon/:id` opens it; closing calls `navigate(-1)`.

**Styling** — **all styling uses `react-jss` (`createUseStyles`)**, not CSS files. No inline styles or CSS modules. Each component passes a `{ name: 'ComponentName' }` options object as the second argument to `createUseStyles`. MUI components are used for UI primitives (Dialog, Card, Chip, etc.) and can accept `sx` prop overrides.

**`LayoutContext`** (`src/contexts/LayoutContext.tsx`) — manages sidebar nav collapsed state. Use `useLayout()` to read and `useToggleNav()` to toggle.

**Component exports** — components are re-exported via barrel files (`src/components/index.ts`, `src/screens/index.ts`, `src/contexts/index.ts`). Add new exports to the relevant `index.ts`.

**`PokemonCard`** applies a type-based background color by using the first type as a JSS class name (e.g. `classes[types[0].toLowerCase()]`). All 15 type color classes are defined in the component's `useStyles`.
