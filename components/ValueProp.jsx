'use client'

import { useReveal } from '@/hooks/useReveal'

const ITEMS = [
  {
    n: '01',
    tag: 'The review has replaced the complaint',
    h: "They don't call the front desk. They post.",
    p: "The guest who used to knock on your reception door now writes a paragraph on Booking. By the time you see it, they've checked out, and the room is turning over.",
  },
  {
    n: '02',
    tag: 'Ops runs on memory',
    h: "Your best data is inside a caretaker's head.",
    p: "Who's complained, which room's AC has failed twice, which vendor is unreliable. All of it lives in the head of one person you didn't hire to be a database.",
  },
  {
    n: '03',
    tag: 'A five-minute check saves a one-star review',
    h: 'Mid-stay is the only chance you have.',
    p: 'By the time a review shows up, the guest is gone and the room is turning over. Catch the same complaint mid-stay and the review reads completely differently a week later.',
  },
]

export default function ValueProp() {
  const introRef = useReveal()
  const gridRef = useReveal()

  return (
    <section className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 640 }} ref={introRef}>
          <div className="kicker">why now</div>
          <h2 className="sec-h">
            Guests aren't waiting to <b>tell you</b> what went wrong.
          </h2>
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
