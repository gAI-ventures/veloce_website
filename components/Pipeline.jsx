'use client'

import { useReveal } from '@/hooks/useReveal'
import {
  VoiceCard,
  CaptureCard,
  RouteCard,
  HousekeepingCard,
  AskCard,
} from './PipelineCards'

const STEPS = [
  {
    n: '01',
    tag: 'Voice',
    h: <>An AI voice that <b>calls every guest</b>, in their own language.</>,
    p: [
      <>Once during check-in day, at least once mid-stay, and again on check-out day. Complaints get raised while the guest is still in the room. Reviews get asked for while the stay is still warm. Nothing waits for the guest to bother walking down to the front desk.</>,
      <>Runs in every major language your guests speak, including the mid-sentence code-switching that most stays naturally slip into. English, Spanish, French, Portuguese, Mandarin, Arabic, Hindi and dozens more.</>,
      <>Inbound is on the same rail. Reservations, availability, small requests picked up day and night.</>,
    ],
    Visual: VoiceCard,
  },
  {
    n: '02',
    tag: 'Capture',
    h: <>Every issue becomes a <b>structured ticket</b>, automatically.</>,
    p: [
      <>Daniel didn't say "asset: AC, category: cooling, severity: high". He said the room hadn't been cooling. Veloce turns that into a ticket you can route, count, and search on, tagged to the room, the reservation, and where the complaint came from.</>,
      <>Same for anything coming in over WhatsApp, the front desk, or a review site.</>,
    ],
    Visual: CaptureCard,
  },
  {
    n: '03',
    tag: 'Route',
    h: <>The <b>right person</b> gets pinged, on the channel they read.</>,
    p: [
      <>When a ticket is high severity for an in-house guest on a chronic asset, the ops manager gets a WhatsApp inside a minute, the GM is cc'd on email, and housekeeping sees it on their tablet before anyone has thought to open a dashboard.</>,
    ],
    Visual: RouteCard,
  },
  {
    n: '04',
    tag: 'Ops floor',
    h: <>Housekeeping and audits, in a <b>staff app your team will actually open</b>.</>,
    p: [
      <>Turnover checklists stop living on paper. Housekeepers work off a single screen designed for their shift, with no training deck required. Supervisors watch the checklist fill in as it happens and know before the guest does when something got skipped. Audits are scheduled, run and signed off in the same place.</>,
      <>When the same asset keeps breaking, Veloce flags it so you replace instead of repairing it a fourth time.</>,
    ],
    Visual: HousekeepingCard,
  },
  {
    n: '05',
    tag: 'Insight',
    h: <>Ask anything in <b>plain English</b>, and see the working underneath.</>,
    p: [
      <>Calls, complaints and audit results all end up in one store, so you can ask the question the way you'd ask a colleague and Veloce will answer, showing you the query it ran to get there. Nobody on your team has to trust the model, because they can read the SQL for themselves.</>,
    ],
    Visual: AskCard,
  },
]

function Step({ step, flip }) {
  const copyRef = useReveal()
  const visualRef = useReveal()
  const { Visual } = step

  return (
    <div className={`step ${flip ? 'flip' : ''}`}>
      <div className="step-copy reveal" ref={copyRef}>
        <div className="step-tag">
          <b>{step.n}</b> {step.tag}
        </div>
        <h3>{step.h}</h3>
        {step.p.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <div className="step-visual reveal" ref={visualRef}>
        <Visual />
      </div>
    </div>
  )
}

export default function Pipeline() {
  const introRef = useReveal()

  return (
    <section id="how" className="pad">
      <div className="wrap">
        <div className="reveal pipeline-intro" ref={introRef}>
          <div className="kicker">how it works</div>
          <h2 className="sec-h">Five things Veloce does, all the time.</h2>
          <p className="sec-lede">
            You wire it into the PMS you already run. Everything below happens automatically from there.
          </p>
        </div>

        {STEPS.map((step, i) => (
          <Step key={step.n} step={step} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
