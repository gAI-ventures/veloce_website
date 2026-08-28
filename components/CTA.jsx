'use client'

import { useReveal } from '@/hooks/useReveal'
import { CONTACT_URL, DEMO_URL } from '@/lib/siteConfig'

export default function CTA() {
  const ref = useReveal()

  return (
    <section id="contact" className="cta-sec">
      <div className="wrap">
        <div className="cta-card reveal" ref={ref}>
          <div>
            <h2>Thirty minutes. One of your properties in mind.</h2>
            <p>
              Come to the call with a real property you're thinking about. We'll walk you through what Veloce would look like running against that operation, and what setup would cost. You'll leave with a straight answer, not another pitch.
            </p>
            <div className="cta-actions">
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
              <a className="btn btn-ghost" href={CONTACT_URL}>
                Ask something first
              </a>
            </div>
          </div>

          <div className="cta-contact">
            <div className="who">
              <div className="avatar">SK</div>
              <div>
                <div className="name">Sooraj Kamath</div>
                <div className="role">gAI Ventures</div>
              </div>
            </div>
            <div className="row">
              <a href={CONTACT_URL}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16v12H4z M4 6l8 7 8-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                sooraj@gai.ventures
              </a>
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                replies within one business day
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                NDA on request
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
