# Veloce site

Marketing site for veloce7.com. Next.js 14 (App Router), light mode only. The whole page is statically prerendered.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Copy `.env.example` to `.env` to override the public links locally. On Vercel, the same variables are set in the project settings.

## Build for production

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.jsx          # HTML shell, metadata, font
  page.jsx            # renders every section in order
  globals.css         # all styles and breakpoints
  icon.svg, favicon.ico, apple-icon.png

components/
  Logo.jsx            # brand logo for light backgrounds (public/veloce-logo-light.png)
  Nav.jsx             # client: sticky nav and mobile menu
  Hero.jsx            # headline and CTAs
  Convergence.jsx     # client: "Coming in / Handled" animation
  Sections.jsx        # operators, problem stats, three steps, extra hours
  Gains.jsx           # client: calculator state, shared with the extra-hours section
  SavingsModel.jsx    # calculator UI (EUR, USD, AED, INR)
  Closing.jsx         # FAQ, contact card, footer
  Icons.jsx           # inline SVG icons and the Veloce mark

lib/
  siteConfig.js       # login, Calendly, contact links (from NEXT_PUBLIC_* env vars) and research sources
  model.js            # savings model maths and default assumptions
```

## Editing content

- Links: set `NEXT_PUBLIC_DEMO_URL`, `NEXT_PUBLIC_LOGIN_URL`, `NEXT_PUBLIC_CONTACT_URL`, `NEXT_PUBLIC_QUESTION_URL`, or change the fallbacks in `lib/siteConfig.js`.
- Calculator defaults, currencies and assumptions: `lib/model.js`.
- Copy lives in each component.

## Breakpoints

- Over 1100px: two-column hero with the animated wiring diagram.
- 860px and below: the navigation collapses into a menu button.
- 760px and below: phone layout. The hero animation switches to paired rows, and the calculator shows the result above the sliders.
- 420px and below: small-phone adjustments.

Motion respects the visitor's reduced-motion setting.
