# PokemonDex

A React single-page application that lets you explore the original 151 Pokémon. Browse the full list, search by name, and click any card to view detailed stats in a route-driven dialog.

Live demo: [pokemon-reliaquest.netlify.app](https://pokemon-reliaquest.netlify.app/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 17 (Create React App) |
| Language | TypeScript 4.5 |
| Routing | React Router v6 (`HashRouter`) |
| Data fetching | Apollo Client 3 + GraphQL |
| GraphQL API | [graphql-pokemon2](https://graphql-pokemon2.vercel.app) |
| Styling | react-jss (`createUseStyles`) — no CSS files |
| UI components | MUI v5 (Dialog, Card, Chip, Table, Icons) |
| State | React Context (`LayoutContext`) |

---

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build
npm test         # run tests in watch mode
npm test -- --watchAll=false   # run tests once
```

---

## User Flows

### 1. Home

**Route:** `/#/`

The landing page renders `src/README.md` as formatted markdown using `react-markdown`. It serves as the project introduction and documentation entry point.

```
User opens app
  └─ HashRouter loads "/"
       └─ Home screen fetches src/README.md
            └─ Renders markdown content
```

---

### 2. Browse Pokémon List

**Route:** `/#/pokemon`

Fetches the first 151 Pokémon from the GraphQL API and displays them as a responsive card grid.

```
User clicks "List" in the sidebar
  └─ Navigates to /#/pokemon
       └─ useGetPokemons() fires GET_POKEMONS query
            └─ Apollo returns id, name, number, types, image
                 └─ PokemonList renders a PokemonCard per result
                      └─ Each card shows: Pokédex number, image, name, type(s)
                      └─ Card background color is derived from the Pokémon's primary type
```

**Type color mapping** — all 15 types have a distinct card background (e.g. `fire` → amber, `water` → blue, `grass` → light green).

**Loading state** — a MUI `CircularProgress` spinner is shown while the query is in flight.

---

### 3. Search Pokémon

**Route:** `/#/pokemon` (same page, client-side filter)

A fixed search bar sits at the top of the list page. Filtering is entirely client-side.

```
User types in the search input
  └─ onChange handler reads input value
       └─ Filters the already-fetched pokemons array by name (case-insensitive)
            └─ filteredPokemons state updates
                 └─ Card grid re-renders with matching results
  └─ Clearing the input restores the full 151-card list
```

---

### 4. View Pokémon Details

**Route:** `/#/pokemon/:id`

Clicking a card navigates to the Pokémon's detail route. The detail dialog is rendered as a nested child route inside `ListPage`, so the list remains visible behind it.

```
User clicks a PokemonCard
  └─ React Router navigates to /#/pokemon/:id
       └─ PokemonDialog mounts (open=true)
            └─ useGetPokemonDetails(id) fires GET_POKEMON_DETAILS query
                 └─ Apollo returns full stats for that Pokémon
                      └─ MUI Dialog renders with:
                           - Pokémon name (title)
                           - Pokémon image
                           - Stats table:
                               Classification
                               Types
                               Resistant to
                               Weaknesses
                               Height (min – max)
                               Weight (min – max)
                               Max CP
                               Max HP
                               Flee Rate
  └─ Dialog is full-screen on mobile (breakpoint: < md)
  └─ User clicks X or the backdrop → navigate(-1) closes dialog, returns to list
```

---

### 5. Collapse / Expand Sidebar

The left sidebar (`Nav`) shows the Pokéball logo and nav links. It can be toggled between expanded (320 px) and collapsed (81 px) states.

```
User clicks the "Collapse / Expand" button at the bottom of the sidebar
  └─ useToggleNav() flips LayoutContext.navCollapsed boolean
       └─ Nav and content area animate width transition (0.2 s ease-in-out)
```

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx            # Root: ApolloProvider, LayoutProvider, HashRouter, routes
│   └── client.ts          # Apollo client (InMemoryCache + HttpLink)
├── components/
│   ├── Nav/               # Collapsible sidebar navigation
│   ├── PokemonCard/       # Single Pokémon card (number, image, name, types)
│   ├── PokemonDialog/     # Route-driven detail modal
│   └── PokemonList/       # Grid + search bar, renders Outlet for child route
├── contexts/
│   └── LayoutContext.tsx  # Sidebar collapsed state
├── hooks/
│   └── useGetPokemons.ts  # All GraphQL queries and custom hooks
├── screens/
│   ├── Home.tsx           # Markdown renderer for src/README.md
│   └── ListPage.tsx       # Wrapper screen for PokemonList
└── README.md              # Rendered on the Home screen
```

---

## GraphQL Queries

**List query** — fired once on mount, cached by Apollo:
```graphql
query pokemons($first: Int!) {
  pokemons(first: $first) {
    id  name  number  types  image
  }
}
```

**Detail query** — fired per Pokémon when its dialog opens:
```graphql
query pokemon($id: String, $name: String) {
  pokemon(id: $id, name: $name) {
    id  number  name  classification  types
    resistant  weaknesses  fleeRate  maxCP  maxHP  image
    weight { minimum  maximum }
    height { minimum  maximum }
  }
}
```

---

## Route Map

| Path | Component | Description |
|---|---|---|
| `/#/` | `Home` | Markdown README rendered as the landing page |
| `/#/pokemon` | `ListPage` → `PokemonList` | Full Pokémon grid with search |
| `/#/pokemon/:id` | `PokemonDialog` (child route) | Detail dialog over the list |
| `/#/*` (wildcard) | `Home` | Falls back to the home page |
