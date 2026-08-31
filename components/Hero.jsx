'use client'

import { useReveal } from '@/hooks/useReveal'
import { DEMO_URL } from '@/lib/siteConfig'

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const ref = useReveal()

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-inner reveal" ref={ref}>
          <div className="brand-line">Veloce · An AI ops layer for hospitality</div>

          <h1 className="h-title">
            The <b>AI operating layer</b> for hospitality.
          </h1>

          <p className="h-sub">
            Veloce rings your in-house guests during their stay, captures what they raise as a structured ticket, and routes it to the right person on your team so it's resolved before checkout. Housekeeping, audits and reporting run in the same staff app your team will actually open.
          </p>

          <div className="h-cta">
            <a className="btn btn-primary" href={DEMO_URL}>
              Book a demo
              <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="h-trust">
            <span><Check /> Every major language, mid-call code-switching</span>
            <span><Check /> Built for multi-property groups</span>
            <span><Check /> Live in production today</span>
          </div>
        </div>
      </div>
    </section>
  )
}
