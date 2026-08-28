'use client'

import AskVeloce from './AskVeloce'
import { useReveal } from '@/hooks/useReveal'

/**
 * Small standalone section that hosts the interactive Ask Veloce widget
 * lower on the page. Kept intentionally compact — a kicker, a short
 * heading, one line of context, then the widget itself.
 */
export default function AskSection() {
  const ref = useReveal()

  return (
    <section className="pad ask-section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="reveal ask-section-inner" ref={ref}>
          <div className="kicker">try it</div>
          <h2 className="ask-h">Ask Veloce a question.</h2>
          <p className="ask-p">
            Type a plain-English question about a property you run. Veloce answers, and shows you the query it ran to get there.
          </p>
          <AskVeloce />
        </div>
      </div>
    </section>
  )
}
