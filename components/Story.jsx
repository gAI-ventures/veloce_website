import { Icon, Mark } from './Icons';
import Convergence from './Convergence';
import { ext } from '@/lib/siteConfig';

function Frame({ title, meta, children, className = '' }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-top"><b>{title}</b>{meta && <span>{meta}</span>}</div>
      {children}
    </div>
  );
}

// ============ The loop: one WhatsApp thread from question to record ============

const LOOP = [
  { icon: 'chat', h: 'Your guest messages', p: 'On WhatsApp, in their own language, at any hour.' },
  { icon: 'mark', h: 'Veloce answers or routes it', p: 'It answers from your house guide, or sends the issue to the right person.' },
  { icon: 'wrench', h: 'Your team gets it done', p: 'Staff get the job on WhatsApp and a nudge until it’s fixed.' },
  { icon: 'cal', h: 'Your records update', p: 'Issues, bookings and money land in one dashboard for the owner.' },
];

export function Loop() {
  return (
    <section className="wrap section" id="loop" aria-labelledby="loop-h">
      <div className="sec-head split">
        <h2 id="loop-h">One WhatsApp thread runs the whole stay</h2>
        <p className="lede">Nobody downloads an app. Guests, staff and owners keep the chat they already use.</p>
      </div>
      <div className="stage loop-stage">
        <ol className="loop">
          {LOOP.map((s) => (
            <li key={s.h}>
              <span className="loop-ic" aria-hidden="true">{s.icon === 'mark' ? <Mark /> : <Icon name={s.icon} />}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
        <p className="loop-sub">Calls, caretakers and owners feed the same list</p>
        <Convergence />
      </div>
    </section>
  );
}

// ============ Outcomes: what the loop adds up to ============

const OUTCOMES = [
  { icon: 'star', h: 'Better ratings', p: 'Problems get fixed while the guest is still there, and happy guests are asked for a review at checkout.' },
  { icon: 'loop', h: 'Repeat stays', p: 'Returning guests can book direct with you, and faults that keep coming back are flagged before the next stay.' },
  { icon: 'user', h: 'More referrals', p: 'Guests who had a smooth stay are the ones who recommend you. Veloce takes the friction out of theirs.' },
];

export function Outcomes() {
  return (
    <section className="wrap section" id="outcomes" aria-labelledby="outcomes-h">
      <div className="sec-head">
        <h2 id="outcomes-h">What it adds up to</h2>
      </div>
      <ul className="outs">
        {OUTCOMES.map((o) => (
          <li key={o.h}>
            <span className="loop-ic" aria-hidden="true"><Icon name={o.icon} /></span>
            <h3>{o.h}</h3>
            <p>{o.p}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ============ No PMS needed ============

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// start and length are in days. c: channel.
const CAL = [
  { p: 'Harbour House', b: [{ s: 0, l: 3, c: 'air', g: 'Priya' }, { s: 4, l: 3, c: 'bk', g: 'Martin' }] },
  { p: 'Park View', b: [{ s: 1, l: 4, c: 'dir', g: 'Anand, returning' }] },
  { p: 'City Suites 2B', b: [{ s: 0, l: 2, c: 'bk', g: 'Lena' }, { s: 3, l: 4, c: 'air', g: 'Omar' }] },
  { p: 'Villa 7', b: [{ s: 2, l: 5, c: 'dir', g: 'Kapoor family' }] },
];
const CHANNELS = [
  { c: 'air', n: 'Airbnb' },
  { c: 'bk', n: 'Booking.com' },
  { c: 'dir', n: 'Direct' },
];

const PMS_FEATURES = [
  'One calendar for every home',
  'Two-way sync with Airbnb and Booking.com',
  'Direct bookings, with no commission',
  'Guest messages on WhatsApp',
];

export function NoPms() {
  return (
    <section className="wrap section" id="pms" aria-labelledby="pms-h">
      <div className="hk">
        <div className="hk-copy">
          <h2 id="pms-h">You no longer need a separate PMS</h2>
          <p>Bookings, calendar and channels are built in, so the property management system and its fees can go.</p>
          <ul className="ticks">
            {PMS_FEATURES.map((f) => <li key={f}><Icon name="check" />{f}</li>)}
          </ul>
          <div className="save">
            <b>Save up to $6,000 a year</b>
            <span>
              in PMS fees (<a href="https://www.roommaster.com/blog/hostaway-pricing" {...ext}>reported Hostaway pricing, 30 listings, RoomMaster</a>)
            </span>
          </div>
        </div>
        <div className="stage">
          <Frame title="Calendar" meta={<span className="tag t-ok">Synced</span>} className="cal-frame">
            <div className="cal" aria-hidden="true">
              <div className="cal-row cal-head"><span /><div className="cal-track">{DAYS.map((d) => <span key={d}>{d}</span>)}</div></div>
              {CAL.map((r) => (
                <div className="cal-row" key={r.p}>
                  <span className="cal-p">{r.p}</span>
                  <div className="cal-track">
                    {r.b.map((b) => (
                      <i key={b.g} className={`cal-b c-${b.c}`} style={{ gridColumn: `${b.s + 1} / span ${b.l}` }}>{b.g}</i>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="cal-legend" aria-hidden="true">
              {CHANNELS.map((c) => <span key={c.c}><i className={`c-${c.c}`} />{c.n}</span>)}
            </div>
          </Frame>
        </div>
      </div>
      <p className="fine example">Screens show example data.</p>
    </section>
  );
}

// ============ Finance ============

const REVENUE = [
  { d: '14 Oct', h: 'Harbour House', g: 'Priya', f: 'Stay, 3 nights', t: 'Airbnb payout', n: '₹21,420', s: '₹24,600 less ₹3,180 fee' },
  { d: '13 Oct', h: 'Villa 7', g: 'Kapoor family', f: 'Stay, 5 nights', t: 'Direct stay', n: '₹62,500', s: 'No commission' },
  { d: '12 Oct', h: 'Park View', g: 'Anand', f: 'Airport pickup', t: 'Guest add-on', n: '₹1,800', s: '₹700 margin' },
];

const FIN_FEATURES = [
  { h: 'Send a photo, the expense is logged', p: 'Staff send a receipt or bill on WhatsApp. Veloce reads the amount, vendor and home.' },
  { h: 'Revenue net of platform fees', p: 'Airbnb and Booking.com payouts, direct stays and guest add-ons, by home.' },
  { h: 'Invoices', p: 'Generate and send invoices from the same records.', soon: true },
];

export function Finance() {
  return (
    <section className="wrap section" id="finance" aria-labelledby="finance-h">
      <div className="sec-head split">
        <h2 id="finance-h">Revenue and expenses for every home, in one place</h2>
        <p className="lede">See what each property earns and spends without chasing receipts or building spreadsheets.</p>
      </div>
      <div className="fin">
        <div className="stage fin-stage">
          <div className="fin-stack">
            <Frame title="Finance" meta="October" className="fin-frame">
              <div className="fin-tabs" aria-hidden="true"><span>Expenses</span><span className="on">Revenue</span></div>
              <div className="fin-kpis" aria-hidden="true">
                <div><small>Revenue, net</small><b>₹4,82,000</b></div>
                <div><small>Platform fees</small><b>₹61,300</b></div>
                <div><small>Guest add-ons</small><b>₹38,500</b></div>
              </div>
              <table className="fin-table" aria-hidden="true">
                <tbody>
                  {REVENUE.map((r) => (
                    <tr key={r.g}>
                      <td><b>{r.h}</b><span>{r.d}, {r.g}</span></td>
                      <td className="fin-type">{r.t}<span>{r.f}</span></td>
                      <td className="fin-n"><b>{r.n}</b><span>{r.s}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Frame>
            <div className="receipt" aria-hidden="true">
              <div className="bub bub-in"><small>Ravi, maintenance</small><p><Icon name="receipt" />Photo of a receipt</p></div>
              <div className="bub bub-out">
                <p>Logged for Harbour House: AC filter, Cool Air Services, ₹1,250. Read from the receipt.</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="fin-list">
          {FIN_FEATURES.map((f) => (
            <li key={f.h}>
              <h3>{f.h}{f.soon && <span className="tag t-mute">Coming soon</span>}</h3>
              <p>{f.p}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="fine example">Screens show example data.</p>
    </section>
  );
}
