# Veloce marketing site (veloce7.com)

## What this is

The marketing website for Veloce, a hospitality operations platform built by gAI Ventures. Veloce brings guest complaints, maintenance and housekeeping into one place, whether they arrive on a call, on WhatsApp, through a caretaker or from an owner.

- **The site's only job is to get operators onto a 30-minute call.** It creates interest. It does not explain the full product. Keep product detail light.
- **Audience:** owners and ops managers running multi-property portfolios (short-term rentals, serviced apartments, boutique hotels, villas). Around medium tech savvy.
- **Markets:** India today, then Europe (EU operators first in outreach), the US, and Dubai.

## Stack and commands

- Next.js 14 (App Router), React 18, plain CSS. JavaScript, not TypeScript. The page is statically prerendered.
- `npm run dev` runs the site at http://localhost:3000
- `npm run build` must pass before any commit.
- Do not run `npm audit fix --force`. It jumps to a newer major Next.js version and breaks the build. Upgrading Next.js is a separate, deliberate task.
- `npm run build` overwrites `.next`, which breaks a running `npm run dev`. Stop the dev server first, or afterwards delete `.next` and start it again.

## Repos and deployment

- The live site deploys on Vercel (project `sooraj-3408/veloce_website`) from the GitHub repo **soorajkamath10-cell/veloce_website**. Git remote name: `personal`.
- A copy is kept at **gAI-ventures/veloce_website**. Git remote name: `company`. The `personal` remote is set to push to both.
- Pushing to `main` on `personal` publishes to veloce7.com immediately. **Never push to `main` without asking first.**
- Normal flow: new branch, commit, `git push -u personal <branch>`, Vercel preview link, pull request, merge.
- `sync.sh` is the owner's own upload script. Leave it alone.

## File map

| To change | Edit |
| --- | --- |
| Page order | `app/page.jsx` |
| Title, description, social preview | `app/layout.jsx` |
| Colours, spacing, breakpoints | `app/globals.css` |
| Hero headline and buttons | `components/Hero.jsx` |
| "Coming in / Handled" animation | `components/Convergence.jsx` (client component) |
| Operators line, problem timelines, how-it-helps rows, housekeeping | `components/Sections.jsx` |
| Calculator UI | `components/SavingsModel.jsx`; its state lives in `components/Gains.jsx` |
| Calculator maths, currencies, default assumptions | `lib/model.js` |
| FAQ, contact card, footer | `components/Closing.jsx` |
| Links and research sources | `lib/siteConfig.js` |
| Logo | `components/Logo.jsx` using `public/veloce-logo-light.png` |
| Icons and the chevron mark | `components/Icons.jsx` |

Components are server components unless they need state or effects. Only then add `'use client'`, as `Nav`, `Convergence` and `Gains` do.

## Positioning

- Category line: **"Hospitality operations platform"**. Say "maintenance", not "ticketing" (it reads as bookings). Always include the word hospitality.
- Lead with outcomes: higher guest ratings, more bookings and repeat stays, less time spent on operations, and what the owner does with the time saved.
- Voice calls and WhatsApp are tools that serve those outcomes. They are not the headline and not the moat. Do not lead with "AI voice calls".
- Veloce stitches operations together: complaints from calls, WhatsApp, caretakers and owners, plus issue history and repeat-fault intelligence.
- Only claim what the product does today. Do not invent features, customers, logos, testimonials or results.

## Copy rules (strict)

- **No em dashes** anywhere in visible copy.
- No AI-sounding patterns: no short dramatic sentence runs, no "every X, every Y, every Z" lists, no "It's not X, it's Y", no clickbait or punchy headlines. Headlines are plain, formal and specific to hospitality.
- **Keep copy short.** Prefer a graphic to a paragraph. One line under a heading is usually enough.
- Every statistic needs a source link next to it. No unverifiable claims.
- Sentence case. Buttons say exactly what happens, for example "Book a 30-minute call".

## Design rules

- **Light mode only.** No dark mode and no theme toggle. Dark mode belongs to the Veloce app, not this site.
- Mist glass style: sage gradient background with soft colour pools, translucent glass panels (`.glass`, `.sheet`), and less rounded corners (8 to 14px).
- Accent green `#377863`; brand green `#0a5c4a` (logo and mark). Text `#0f1311`. Colour tokens are at the top of `globals.css`; use them rather than new hex values.
- Font: Source Sans 3. The logo is the brand PNG; do not redraw it as live text.
- Avoid generic template tells: all-caps labels, monospace labels, "01 / 02 / 03" numbering (unless the content really is a sequence), an arrow at the end of links, and middle-dot separated labels.
- One animation moment (the hero). No fade-in-on-scroll effects on every section. Respect reduced motion.
- **Must stay mobile responsive.** Breakpoints: 1100px, 860px (menu button), 760px (phone layout), 420px (small phones). There must be no sideways scrolling at 360px.

## Links

- Links come from `lib/siteConfig.js`, which reads `NEXT_PUBLIC_DEMO_URL`, `NEXT_PUBLIC_LOGIN_URL`, `NEXT_PUBLIC_CONTACT_URL` and `NEXT_PUBLIC_QUESTION_URL` (set in Vercel), with fallbacks in the code.
- Every link must go somewhere real: a section anchor, Calendly, email, the app login or a source. No `href="#"` placeholders.
- Links that leave the site open in a new tab (`ext` from `siteConfig.js`).

## Calculator ("What a 60-property operation gains with Veloce")

- Framing is positive: what the operator gains with Veloce, not what they lose without it.
- Currencies: EUR, USD, AED, INR. Keep all four.
- Research figures stay linked to their sources: Cornell CHR 2012, J.D. Power 2015 and 2023, and a 2019 guest survey. Anything not from research is labelled "Our estimate".
- Never show Veloce's prices on the site. If pricing ever appears, the platform fee (per room per month) and voice (per minute) are always two separate lines, never combined.

## Before saying a change is done

1. `npm run build` passes.
2. Check the page at 1440px and 390px wide: no sideways scrolling, and the menu, hero animation and calculator all work.
3. Search the changed files for em dashes (`—`) and `href="#"`.
4. Tell the owner which files changed and what the change looks like.
