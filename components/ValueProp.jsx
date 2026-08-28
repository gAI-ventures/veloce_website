'use client'

import { useReveal } from '@/hooks/useReveal'

const ITEMS = [
  {
    n: '01',
    tag: 'The review has replaced the front desk',
    h: "The complaint goes to the review site, not to your reception.",
    p: "The guest who used to walk down to your desk now types a paragraph on Booking or Airbnb, and by the time you read it they've checked out, the room is turning over, and there is nothing you can do except reply.",
  },
  {
    n: '02',
    tag: 'A mid-stay call catches the same complaint earlier',
    h: 'The AC in 401, on Tuesday, not Friday.',
    p: 'When Veloce rings a guest halfway through their stay, the complaint reaches you while there is still time to fix it, and the guest is still in the room to see it fixed. A Tuesday phone call and a Wednesday repair is a very different Friday review than a five-day slow burn.',
  },
  {
    n: '03',
    tag: 'Fixed before checkout is fixed on the review too',
    h: 'The reviews you never had to defend.',
    p: "The best defense against a bad review isn't a smarter response strategy, it's the version of the stay where the thing they were going to complain about got sorted before they left. That is the version Veloce runs.",
  },
]

export default function ValueProp() {
  const introRef = useReveal()
  const gridRef = useReveal()

  return (
    <section className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 720 }} ref={introRef}>
          <div className="kicker">why it matters</div>
          <h2 className="sec-h">
            Better reviews start with <b>catching the issue mid-stay</b>.
          </h2>
          <p className="sec-lede">
            Every complaint that reaches you in real time is one that doesn't reach your review page a week later. Veloce runs the call that gets you there.
          </p>
        </div>

        <div className="three-grid stagger" ref={gridRef}>
          {ITEMS.map((it) => (
            <div className="three-item" key={it.n}>
              <div className="n">
                <b>{it.n}</b> {it.tag}
              </div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
