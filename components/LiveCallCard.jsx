'use client'

/**
 * Live-call concept card that sits in the right column of the hero.
 * A stylised "outbound call in progress" view — meant to reinforce the
 * hero copy ("Veloce calls your in-house guests") with something visual
 * you actually look at instead of empty margin.
 *
 * Purely presentational — animated with CSS only (waveform bars, pulse
 * on the live dot, timer counter). No client state needed beyond what
 * lives inside the animations.
 */
export default function LiveCallCard() {
  return (
    <div className="lcc" aria-hidden="true">
      <div className="lcc-head">
        <div className="lcc-live">
          <span className="lcc-livedot" />
          <span>outbound · live</span>
        </div>
        <div className="lcc-dur">00:23</div>
      </div>

      <div className="lcc-guest">
        <div className="lcc-avatar">EC</div>
        <div className="lcc-who">
          <div className="lcc-name">Emma Clarke</div>
          <div className="lcc-meta">The Yard · Rm 214 · English</div>
        </div>
        <div className="lcc-langpill">EN</div>
      </div>

      <div className="lcc-wave">
        {Array.from({ length: 32 }).map((_, i) => (
          <span key={i} className="lcc-bar" style={{ '--i': i }} />
        ))}
      </div>

      <div className="lcc-line">
        <div className="lcc-linelbl">Now speaking</div>
        <div className="lcc-quote">
          <span className="lcc-say">"The air conditioning hasn't really been cooling since we got in…"</span>
        </div>
      </div>

      <div className="lcc-cap">
        <div className="lcc-cap-head">
          <span className="lcc-cap-l">Capturing to ticket</span>
          <span className="lcc-cap-r">T-4809</span>
        </div>
        <div className="lcc-cap-body">
          <div className="lcc-cap-row">
            <span className="lcc-cap-k">asset</span>
            <span className="lcc-cap-v lcc-cap-vmint">AC</span>
          </div>
          <div className="lcc-cap-row">
            <span className="lcc-cap-k">category</span>
            <span className="lcc-cap-v lcc-cap-vmint">cooling</span>
          </div>
          <div className="lcc-cap-row">
            <span className="lcc-cap-k">severity</span>
            <span className="lcc-cap-v"><span className="lcc-sev">MED</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
