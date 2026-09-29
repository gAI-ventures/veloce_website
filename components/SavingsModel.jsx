import { CURRENCIES } from '@/lib/model';
import { SOURCES, ext } from '@/lib/siteConfig';

const fmtNum = (v, d = 0) => new Intl.NumberFormat('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

function Src({ s }) {
  return <a href={s.url} {...ext}>{s.short}</a>;
}

const ASSUMPTIONS = [
  { key: 'issue', label: 'Stays with a problem, %', src: <Src s={SOURCES.jdp2023} /> },
  { key: 'report', label: 'Problems guests report on their own, %', src: <Src s={SOURCES.report} /> },
  { key: 'capture', label: 'Problems caught with Veloce, %', src: 'Our estimate' },
  { key: 'gap', label: 'Rating lost on a stay with an unfixed problem', src: 'Our estimate, points out of 5', step: 0.1 },
  { key: 'elas', label: 'Revenue per room for each 1% of reputation, %', src: <Src s={SOURCES.cornell} />, step: 0.01 },
  { key: 'retFix', label: 'Guests who return after a fixed problem, %', src: <Src s={SOURCES.report} /> },
  { key: 'retNo', label: 'Guests who return after an unfixed problem, %', src: <Src s={SOURCES.jdp2015} /> },
  { pair: ['hIss', 'hIssV'], label: 'Hours per issue, today and with Veloce', src: 'Our estimate', step: 0.1 },
  { pair: ['hProp', 'hPropV'], label: 'Coordination hours per property each month, today and with Veloce', src: 'Our estimate', step: 0.5 },
  { key: 'rate', label: 'Cost of an hour of ops time', src: 'Our estimate', cur: true },
  { key: 'stay', label: 'Average stay length, nights', src: 'Your figure', step: 0.5 },
];

function Range({ id, label, value, display, min, max, step, onChange, hint }) {
  return (
    <div className="fld">
      <label htmlFor={id}>{label}<output htmlFor={id}>{display}</output></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      {hint && <small>{hint}</small>}
    </div>
  );
}

export default function SavingsModel({ currency, setCurrency, inputs, setInput, assumptions, setAssumption, result }) {
  const C = CURRENCIES[currency];
  const money = (v) => new Intl.NumberFormat(C.locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(v);
  const r = result;

  const rows = [
    { label: 'Guest problems caught during the stay', sub: `Out of ${fmtNum(r.problemStays)} stays with a problem`, a: fmtNum(r.caught), b: fmtNum(r.caughtWith), d: `+${fmtNum(r.caughtWith - r.caught)}` },
    { label: 'Average guest rating', sub: 'Out of 5', a: r.rating.toFixed(2), b: r.ratingWith.toFixed(2), d: `+${r.ratingLift.toFixed(2)}` },
    { label: 'Occupancy', a: `${(r.occ * 100).toFixed(1)}%`, b: `${(r.occWith * 100).toFixed(1)}%`, d: `+${((r.occWith - r.occ) * 100).toFixed(1)} pts` },
    { label: 'Room revenue', a: money(r.revenue), b: money(r.revenueWith), d: `+${r.revparPct.toFixed(1)}%` },
    { label: 'Guests who come back after a problem', a: fmtNum(r.returned), b: fmtNum(r.returnedWith), d: `+${fmtNum(r.returnedWith - r.returned)}` },
    { label: 'Hours on ops each month', a: fmtNum(r.hours), b: fmtNum(r.hoursWith), d: `${fmtNum(r.hoursSaved)} fewer` },
  ];

  return (
    <section className="wrap section" id="gains" aria-labelledby="gains-h">
      <div className="sec-head split">
        <h2 id="gains-h">What a {inputs.properties}-property operation gains with Veloce</h2>
        <p className="lede">Move the sliders to match your portfolio. It’s based on published hospitality research and our own time estimates.</p>
      </div>

      <div className="model">
        <div className="inputs">
          <h3>Your portfolio</h3>
          <p>Figures are per year unless marked.</p>
          <div className="seg" role="group" aria-label="Currency">
            {Object.keys(CURRENCIES).map((c) => (
              <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}>{c}</button>
            ))}
          </div>
          <Range id="inN" label="Properties" value={inputs.properties} display={inputs.properties} min={10} max={200} step={5} onChange={(v) => setInput('properties', v)} />
          <Range id="inAdr" label="Average nightly rate" value={inputs.adr} display={money(inputs.adr)} min={C.min} max={C.max} step={C.step} onChange={(v) => setInput('adr', v)} />
          <Range id="inOcc" label="Occupancy" value={inputs.occupancy} display={`${inputs.occupancy}%`} min={35} max={95} step={1} onChange={(v) => setInput('occupancy', v)} />
          <Range id="inRat" label="Average guest rating today" value={inputs.rating} display={inputs.rating.toFixed(1)} min={3.5} max={4.9} step={0.1} onChange={(v) => setInput('rating', v)} hint="Out of 5" />

          <details className="assume">
            <summary>Assumptions</summary>
            {ASSUMPTIONS.map((a) => (
              <div className="arow" key={a.label}>
                <span>{a.label}{a.cur ? `, ${currency}` : ''}<small>{a.src}</small></span>
                <span className="arow-in">
                  {(a.pair || [a.key]).map((k, i) => (
                    <input
                      key={k}
                      type="number"
                      inputMode="decimal"
                      step={a.step || 1}
                      min="0"
                      value={assumptions[k]}
                      aria-label={a.pair ? `${a.label}: ${i === 0 ? 'today' : 'with Veloce'}` : a.label}
                      onChange={(e) => setAssumption(k, e.target.value === '' ? 0 : +e.target.value)}
                    />
                  ))}
                </span>
              </div>
            ))}
          </details>
        </div>

        <div className="results" aria-live="polite">
          <div className="gain">
            <p className="l">Added to your bottom line each year with Veloce</p>
            <p className="amt">+{money(r.total)}</p>
            <div className="parts">
              <span><b>+{money(r.revenueGain)}</b>more room revenue</span>
              <span><b>+{money(r.timeValue)}</b>of team time freed</span>
            </div>
          </div>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead>
                <tr><th scope="col"><span className="sr">Measure</span></th><th scope="col">Today</th><th scope="col" className="w">With Veloce</th></tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}{row.sub && <small>{row.sub}</small>}</th>
                    <td className="o">{row.a}</td>
                    <td className="v">{row.b}<span className="d">{row.d}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hrs">
            <b>{fmtNum(r.hoursSaved)} hours</b>
            <span>freed every month, about the working time of {r.fte.toFixed(1)} full-time coordinators.</span>
          </div>
        </div>
      </div>
      <p className="fnote">An illustrative estimate, not a quote. Research figures are linked in the assumptions and describe effects of up to the size shown. Time estimates are ours.</p>
    </section>
  );
}
