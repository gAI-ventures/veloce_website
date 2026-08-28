const ITEMS = [
  'Boutique hotel groups',
  'Serviced-stay portfolios',
  'Multi-property short-let operators',
  'Premium villa collections',
  'Independent resort brands',
  'Heritage stays',
  'Corporate-serviced apartments',
  'Design-led urban retreats',
]

// The marquee loops seamlessly by rendering the list twice, back-to-back,
// then translating -50% in a keyframe.
const LOOPED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-lbl">Built for the operators running</div>
      <div className="marquee">
        <div className="marquee-track">
          {LOOPED.map((label, i) => (
            <div className="m-item" key={i}>
              <span className="dot" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
