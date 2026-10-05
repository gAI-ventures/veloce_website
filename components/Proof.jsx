import { shownMetrics, shownCase } from '@/lib/proof';

// Measured numbers from lib/proof.js. Renders nothing until real values are filled in.
export default function Proof() {
  if (!shownMetrics.length && !shownCase) return null;

  return (
    <section className={`wrap proof${shownCase ? ' has-case' : ''}`} aria-label="Results from live properties">
      {shownMetrics.length > 0 && (
        <ul className="proof-stats">
          {shownMetrics.map((m) => (
            <li key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
              {m.note && <small>{m.note}</small>}
            </li>
          ))}
        </ul>
      )}
      {shownCase && (
        <figure className="proof-case">
          <figcaption>{shownCase.descriptor}</figcaption>
          <table>
            <thead>
              <tr><th scope="col"><span className="sr">Measure</span></th><th scope="col">Before</th><th scope="col" className="w">With Veloce</th></tr>
            </thead>
            <tbody>
              {shownCase.beforeAfter.map((r) => (
                <tr key={r.label}><th scope="row">{r.label}</th><td>{r.before}</td><td className="w">{r.after}</td></tr>
              ))}
            </tbody>
          </table>
          {shownCase.quote && <blockquote>“{shownCase.quote}”</blockquote>}
        </figure>
      )}
    </section>
  );
}
