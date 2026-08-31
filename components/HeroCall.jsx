'use client'

/**
 * Hero visual — a "live outbound call in progress" card that mirrors
 * the product's core loop: AI on the phone with a guest, capturing what
 * they raise into a structured ticket as it happens.
 */
export default function HeroCall() {
  return (
    <div className="hero-call">
      <div className="hero-call-head">
        <div className="hero-call-l">
          <span className="hero-call-live"><span className="hcl-dot" />Live · outbound</span>
          <span className="hero-call-sep">·</span>
          <span className="hero-call-prop">Casa Blanca · Lisbon</span>
        </div>
        <div className="hero-call-timer">01:14</div>
      </div>

      <div className="hero-call-guest">
        <div>
          <div className="hero-call-name">Isabel Ferreira</div>
          <div className="hero-call-sub">Room 214 · check-in day</div>
        </div>
        <div className="hero-call-pill">PT</div>
      </div>

      <div className="hero-call-wave" aria-hidden="true">
        {Array.from({ length: 34 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${(i * 0.055).toFixed(2)}s` }} />
        ))}
      </div>

      <div className="hero-call-lines">
        <div className="hcl-msg">
          <span className="hcl-who hcl-a">AI</span>
          <span>Já se instalou bem no quarto?</span>
        </div>
        <div className="hcl-msg">
          <span className="hcl-who hcl-g">GST</span>
          <span><mark>O ar condicionado está a fazer um barulho estranho</mark>, um zumbido.</span>
        </div>
      </div>

      <div className="hero-call-cap">
        <div className="hcl-cap-l">
          <span className="hcl-cap-lbl">capturing</span>
          <span className="hcl-cap-tag">AC · noise</span>
          <span className="hcl-cap-tag">Rm 214</span>
          <span className="hcl-cap-tag hcl-cap-sev">MED</span>
        </div>
        <div className="hcl-cap-id">T-4809</div>
      </div>
    </div>
  )
}
