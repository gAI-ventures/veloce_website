'use client'

import { useReveal } from '@/hooks/useReveal'

const AGENTS = [
  {
    code: 'veloce-checkin',
    name: 'Check-in agent',
    p: "Calls the guest an hour or two after check-in. Confirms they got in fine, the room is set up as booked, and there's nothing missing.",
  },
  {
    code: 'veloce-wellbeing',
    name: 'Daily wellbeing agent',
    p: "The mid-stay check-in. One call a day per in-house guest, asking about the stay and catching complaints while there's still time to fix them.",
  },
  {
    code: 'veloce-checkout',
    name: 'Check-out agent',
    p: 'The day-of call. Summarises the stay, asks for a review when guests are most inclined to leave one, and closes out any lingering tickets.',
  },
  {
    code: 'veloce-receptionist',
    name: 'Receptionist',
    p: 'Takes every inbound call. Reservations, availability, generic queries. Hands off cleanly to a human when something is outside its scope.',
  },
  {
    code: 'veloce-chores',
    name: 'Chore follow-ups',
    p: "Chases the ops team on open tickets and skipped checklist items. Nudges the right person on the right channel until it's resolved and signed off.",
  },
]

export default function Agents() {
  const introRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="agents" className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 720 }} ref={introRef}>
          <div className="kicker">the calls</div>
          <h2 className="sec-h">
            A custom agent for <b>every kind of call</b>.
          </h2>
          <p className="sec-lede">
            Not one general-purpose voice bot. Each part of a guest's stay has its own agent, its own script, its own extraction schema, and its own definition of a call that went well.
          </p>
        </div>

        <div className="agents-wrap">
          <div className="agents-grid stagger" ref={gridRef}>
            {AGENTS.map((a) => (
              <div className="agent" key={a.code}>
                <div className="code">{a.code}</div>
                <h4>{a.name}</h4>
                <p>{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
