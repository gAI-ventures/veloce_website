'use client'

import AskVeloce from './AskVeloce'
import { useReveal } from '@/hooks/useReveal'

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
            Run the property from <b>one dashboard</b>.
          </h1>

          <p className="h-sub">
            Veloce calls your in-house guests, every day, in their language. Whatever they raise on the call turns into a tracked ticket the right person on your team can act on before checkout. It also picks up inbound calls, runs your housekeeping checklists, and gives you one place to ask what's happening across the property.
          </p>

          <div className="h-cta">
            <a className="btn btn-primary" href="#contact">
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
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </div>

          <AskVeloce />

          <div className="h-trust">
            <span><Check /> Speaks every language ElevenLabs supports</span>
            <span><Check /> Built for multi-property groups</span>
            <span><Check /> Live in a week, no IT project</span>
          </div>
        </div>
      </div>
    </section>
  )
}
