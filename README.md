# Veloce site

Next.js 14 (App Router) + TanStack Query + Zustand.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

Copy `.env.example` to `.env` before starting the site. The public
variables configure the product login, contact mail link, and Calendly demo
destination.

## Build for production

```bash
npm run build
npm start
```

## Stack

- **Next.js 14 (App Router)** — server components by default, `'use client'` where interactivity or hooks are needed
- **TanStack Query** — wraps the `POST /api/ask` mock endpoint the hero "Ask Veloce" widget hits, so cache, retry, and mutation state are handled properly
- **Zustand** — holds the current question and a small in-session history for the Ask Veloce widget, so state survives if we later split the input and the answer across pages

## Structure

```
app/
  layout.jsx              # HTML shell + fonts + Providers wrapper
  page.jsx                # renders all sections in order
  globals.css             # all styles (dark canvas + mint)
  providers.jsx           # QueryClientProvider (client component)
  api/
    ask/route.js          # mock /api/ask endpoint (canned answers)

components/
  Logo.jsx                # the canonical Veloce mark (three chevrons + wordmark)
  Nav.jsx                 # sticky nav
  Hero.jsx                # headline, sub, CTA, trust bullets
  AskVeloce.jsx           # interactive Ask Veloce widget (TanStack Query + Zustand)
  Marquee.jsx             # looping operator-category strip
  Problem.jsx             # before/after visualization
  ValueProp.jsx           # 01/02/03 numbered value prop
  Pipeline.jsx            # five-step alternating pipeline
  PipelineCards.jsx       # the five distinct demo cards
  Agents.jsx              # five custom-agent cards
  CTA.jsx                 # contact card
  Footer.jsx              # four-column footer

hooks/
  useReveal.js            # IntersectionObserver reveal-on-scroll
  useStickyNav.js         # nav border on scroll

store/
  askStore.js             # Zustand store for the Ask Veloce widget
```

## Editing content

Most copy lives in the components. Change the hero headline in `components/Hero.jsx`, edit pipeline steps in `components/Pipeline.jsx`, swap the agents list in `components/Agents.jsx`.

Public destinations are configured in `.env` and read through
`lib/siteConfig.js`.

Canned Ask Veloce answers live in `app/api/ask/route.js`. Replace that file with a real call to your backend when the time comes — the client component doesn't change.
