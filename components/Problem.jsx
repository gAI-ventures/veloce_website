'use client'

import { useReveal } from '@/hooks/useReveal'

const TODAY = [
  <>Caretaker takes the call. Notes it in his head, or on a sheet.</>,
  <>The ops manager hears about it next morning, maybe.</>,
  <>Nobody remembers it's the fourth AC complaint in that room this month.</>,
  <>Guest leaves a 3-star review a week later, mentioning the AC.</>,
]

const VELOCE = [
  <>Veloce rings the guest at 14:22. He mentions the AC.</>,
  <>The call becomes ticket <b>T-4172</b>, tagged AC, severity high.</>,
  <>Ops manager pinged inside a minute. Chronic flag fires (4th time).</>,
  <>The AC gets fixed <b>before checkout</b>. No review to reply to.</>,
]

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Problem() {
  const introRef = useReveal()
  const visualRef = useReveal()

  return (
    <section className="pad">
      <div className="wrap">
        <div className="reveal" ref={introRef}>
          <div className="kicker">the gap</div>
          <h2 className="sec-h">
            Your PMS ends at <b>check-in</b>.
          </h2>
          <p className="sec-lede">
            Bookings, rates, room status: those are handled. What happens during the stay itself lives in a caretaker's head, a WhatsApp thread, and a spreadsheet nobody opens on Sunday. Veloce runs on top of all of it.
          </p>
        </div>

        <div className="problem-visual reveal" ref={visualRef}>
          <div className="pv-grid">
            <div className="pv-side today">
              <div className="lbl">Today</div>
              <div className="headline">Guest complains about the AC in Room 401.</div>
              <div className="today-list">
                {TODAY.map((line, i) => (
                  <div className="row" key={i}>
                    <span className="ic">✕</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pv-arrow"><Arrow /></div>
            <div className="pv-side veloce">
              <div className="lbl">With Veloce</div>
              <div className="headline">Same complaint. Same room. Different path.</div>
              <div className="veloce-list">
                {VELOCE.map((line, i) => (
                  <div className="row" key={i}>
                    <span className="ic">→</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
