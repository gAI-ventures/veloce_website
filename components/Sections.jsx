import { Icon, Person } from './Icons';
import { SOURCES, ext } from '@/lib/siteConfig';

const OPERATORS = [
  'Serviced-stay portfolios', 'Multi-property short-let operators', 'Boutique hotel groups', 'Villa collections',
  'Corporate-serviced apartments', 'Heritage stays', 'Independent resort brands',
];

export function Operators() {
  return (
    <section className="wrap ops" aria-labelledby="ops-h">
      <p id="ops-h">Built for the operators running</p>
      <ul>{OPERATORS.map((o) => <li key={o} className="glass">{o}</li>)}</ul>
    </section>
  );
}

const PLACES = [
  { icon: 'user', label: 'Caretaker’s phone' },
  { icon: 'chat', label: 'WhatsApp group' },
  { icon: 'desk', label: 'Front desk' },
  { icon: 'phone', label: 'Owner’s phone' },
  { icon: 'star', label: 'Review site' },
];

function Cite({ src }) {
  return <cite><a href={src.url} {...ext}>{src.label}</a></cite>;
}

function Donut({ value, label, low }) {
  const c = 2 * Math.PI * 46;
  return (
    <div className="donut">
      <span className="ring">
        <svg viewBox="0 0 104 104" aria-hidden="true">
          <circle className="bg" cx="52" cy="52" r="46" />
          <circle className={`fg ${low ? 'low' : ''}`} cx="52" cy="52" r="46" strokeDasharray={`${(c * value) / 100} ${c}`} />
        </svg>
        <b>{value}%</b>
      </span>
      {label}
    </div>
  );
}

export function Problem() {
  return (
    <section className="wrap section" id="problem" aria-labelledby="problem-h">
      <div className="sec-head">
        <h2 id="problem-h">Most guest problems reach you after checkout</h2>
        <p className="lede">They’re spread across phones and chat groups, so the review is often the first record.</p>
      </div>

      <div className="glass today" aria-label="Where guest issues land today">
        {PLACES.map((p) => (
          <div className="tile" key={p.label}><i><Icon name={p.icon} /></i>{p.label}</div>
        ))}
        <div className="norec"><Icon name="alert" />No single record</div>
      </div>

      <div className="sg">
        <article className="glass sgc">
          <div className="sgv" aria-hidden="true">
            <div className="ppl"><Person className="on" /><Person /><Person /><Person /></div>
          </div>
          <p className="big">1 in 4</p>
          <p className="cap">guests tell the property about a problem</p>
          <Cite src={SOURCES.report} />
        </article>
        <article className="glass sgc">
          <div className="sgv"><Donut value={66} label="Delighted" /><Donut value={4} label="Disappointed" low /></div>
          <p className="big">66% vs 4%</p>
          <p className="cap">say they will definitely stay again</p>
          <Cite src={SOURCES.jdp2015} />
        </article>
        <article className="glass sgc">
          <div className="sgv" aria-hidden="true">
            <div className="bar2">
              <div><b>+1%</b><i style={{ height: 48 }} />Reputation</div>
              <div><b>+1.42%</b><i className="up" style={{ height: 78 }} />Revenue per room</div>
            </div>
          </div>
          <p className="big">1.42%</p>
          <p className="cap">more revenue per room for each 1% gain in reputation</p>
          <Cite src={SOURCES.cornell} />
        </article>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="wrap section" id="helps" aria-labelledby="helps-h">
      <div className="sec-head"><h2 id="helps-h">How Veloce takes operations off your plate</h2></div>
      <ol className="steps3">
        <li className="glass st">
          <div className="st-vis" aria-hidden="true">
            <div className="chanrow">
              <span className="chan"><Icon name="phone" />Calls</span>
              <span className="chan"><Icon name="chat" />WhatsApp</span>
              <span className="chan"><Icon name="user" />Caretaker</span>
              <span className="chan"><Icon name="star" />Owner</span>
            </div>
            <div className="inbox">
              <div><Icon name="phone" /><span>AC not cooling, Room 401</span><span className="tag t-danger">High</span></div>
              <div><Icon name="chat" /><span>No hot water, Apt 3C</span><span className="tag t-warn">Medium</span></div>
              <div><Icon name="user" /><span>Lock sticking, 2B</span><span className="tag t-mute">Low</span></div>
            </div>
          </div>
          <div className="st-cap"><span className="n" aria-hidden="true">1</span><h3>Hear it early</h3><p>Every issue, from every channel, in one list.</p></div>
        </li>
        <li className="glass st">
          <div className="st-vis" aria-hidden="true">
            <div className="who2"><span className="av">R</span><div>Ravi<small>Maintenance, Casa Blanca</small></div></div>
            <div className="ticks">
              {['Assigned', 'Reminded', 'Photo sent', 'Guest told'].map((t) => (
                <span key={t}><i><Icon name="check" /></i>{t}</span>
              ))}
            </div>
          </div>
          <div className="st-cap"><span className="n" aria-hidden="true">2</span><h3>Get it fixed</h3><p>The right person, reminded until it’s done.</p></div>
        </li>
        <li className="glass st">
          <div className="st-vis" aria-hidden="true">
            <div className="fault"><b>AC, Room 401</b><span>4 repairs in 14 days. Replace it?</span></div>
            <div className="bars">
              {[30, 22, 55, 18, 70, 62, 90].map((h, i) => <i key={i} className={h > 50 ? 'w' : ''} style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="st-cap"><span className="n" aria-hidden="true">3</span><h3>Learn what breaks</h3><p>Repeat faults flagged before the next guest notices.</p></div>
        </li>
      </ol>
      <p className="via">
        <span className="chan"><Icon name="phone" />Voice calls</span>
        <span className="chan"><Icon name="chat" />WhatsApp</span>
        <span className="txt">reach guests in their own language</span>
      </p>
    </section>
  );
}

export function TimeBack({ hours }) {
  const items = [
    { icon: 'trend', h: 'Grow the portfolio', p: 'Add properties without adding coordinators.' },
    { icon: 'user', h: 'Keep your owners', p: 'More time for owner reporting and relationships.' },
    { icon: 'cal', h: 'Win repeat bookings', p: 'Better ratings, better rates and guests who return.' },
  ];
  return (
    <section className="wrap section" id="time" aria-labelledby="time-h">
      <div className="sec-head"><h2 id="time-h">What you could do with {hours} extra hours a month</h2></div>
      <div className="uses3">
        {items.map((u) => (
          <div className="glass u3" key={u.h}><i><Icon name={u.icon} /></i><div><h3>{u.h}</h3><p>{u.p}</p></div></div>
        ))}
      </div>
    </section>
  );
}
