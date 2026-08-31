'use client'

import AskVeloce from './AskVeloce'
import { useReveal } from '@/hooks/useReveal'

export default function AskSection() {
  const ref = useReveal()

  return (
    <section className="ask-sec">
      <div className="wrap">
        <div className="ask-sec-inner reveal" ref={ref}>
          <div className="ask-sec-head">
            <div className="kicker">ops in one place</div>
            <h2 className="sec-h">Ask anything about your properties.</h2>
            <p className="sec-lede">
              Every call, every ticket, every checklist lives in the same place. Ask in plain language and get an answer built from what actually happened across your properties.
            </p>
          </div>
          <AskVeloce />
        </div>
      </div>
    </section>
  )
}
