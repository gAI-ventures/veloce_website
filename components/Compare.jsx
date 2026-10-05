import { Icon } from './Icons';

// Categories, not brands. Marks describe typical setups.
const COLS = ['WhatsApp groups and spreadsheets', 'PMS add-ons', 'Maintenance or ticketing tools', 'Veloce'];

const MARK = {
  yes: { icon: 'check', text: 'Yes' },
  part: { icon: 'minus', text: 'Partly' },
  no: { icon: 'close', text: 'No' },
};

const ROWS = [
  { h: 'Hears from guests during the stay', m: ['no', 'part', 'no', 'yes'] },
  { h: 'One record across calls, WhatsApp, caretakers and owners', m: ['no', 'part', 'part', 'yes'] },
  { h: 'Flags repeat faults', m: ['no', 'no', 'part', 'yes'] },
  { h: 'Staff stay on WhatsApp', m: ['yes', 'no', 'no', 'yes'] },
  { h: 'Routes and chases until it’s fixed', m: ['no', 'part', 'yes', 'yes'] },
];

export default function Compare() {
  return (
    <section className="wrap section" id="compare" aria-labelledby="compare-h">
      <div className="sec-head split">
        <h2 id="compare-h">How Veloce compares with what operators use today</h2>
        <p className="lede">Most portfolios run on a mix of these. Veloce brings the pieces together.</p>
      </div>
      <div className="stage">
        <div className="frame vs-frame">
          <table className="vs">
            <thead>
              <tr>
                <th scope="col"><span className="sr">What it does</span></th>
                {COLS.map((c, i) => <th scope="col" key={c} className={i === 3 ? 'w' : ''}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.h}>
                  <th scope="row">{r.h}</th>
                  {r.m.map((k, i) => (
                    <td key={COLS[i]} className={`m-${k}${i === 3 ? ' w' : ''}`} data-col={COLS[i]}>
                      <span><Icon name={MARK[k].icon} />{MARK[k].text}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="fine example center">Typical setups. Individual tools vary.</p>
    </section>
  );
}
