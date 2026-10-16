import { Icon, Mark } from './Icons';
import Convergence from './Convergence';
import { ext } from '@/lib/siteConfig';

const PMS_SOURCE = 'https://www.roommaster.com/blog/hostaway-pricing';

function Frame({ title, meta, children, className = '' }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-top"><b>{title}</b>{meta && <span>{meta}</span>}</div>
      {children}
    </div>
  );
}

// Section label above a heading, e.g. "01 Maintenance".
function Eyebrow({ n, children }) {
  return <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" />{n && <b>{n}</b>}{children}</p>;
}

// A list of features with an icon each, used beside a product screen.
function Features({ items }) {
  return (
    <ul className="feats">
      {items.map((f) => (
        <li key={f.h}>
          <span className="feat-ic" aria-hidden="true"><Icon name={f.icon} /></span>
          <div>
            <h3>{f.h}{f.soon && <span className="tag t-mute">Coming soon</span>}</h3>
            <p>{f.p}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ============ Announcement bar ============

export function Announce() {
  return (
    <div className="announce">
      <div className="announce-in">
        <span className="announce-new">New</span>
        <p>Calendar, Airbnb and Booking.com sync and direct bookings are now built in. No separate PMS needed.</p>
        <a href="#platform">See what’s included</a>
      </div>
    </div>
  );
}

// ============ The loop ============

const LOOP = [
  { n: '01', who: 'Guest', h: 'Someone asks', p: 'A guest, caretaker or owner sends a WhatsApp message.', pos: 'n' },
  { n: '02', who: 'Veloce', h: 'Veloce routes it', p: 'Answers from your house guide, or sends it to the right person.', pos: 'e' },
  { n: '03', who: 'Staff', h: 'Work gets done', p: 'Staff accept, fix it and send a photo back in the chat.', pos: 's' },
  { n: '04', who: 'Record', h: 'Your dashboard updates', p: 'Issues, bookings and money, by home, for the owner.', pos: 'w' },
];

export function Loop() {
  return (
    <section className="wrap section" id="loop" aria-labelledby="loop-h">
      <div className="loop-panel">
        <div className="loop-head">
          <Eyebrow>The loop</Eyebrow>
          <h2 id="loop-h">One WhatsApp thread. <em>The whole operation.</em></h2>
          <p>Nobody downloads an app. Guests, staff and owners keep the chat they already use.</p>
        </div>
        <div className="orbit">
          <span className="orbit-ring r1" aria-hidden="true" />
          <span className="orbit-ring r2" aria-hidden="true" />
          <div className="orbit-core">
            <span className="orbit-mark"><Icon name="chat" /></span>
            <b>WhatsApp</b>
            <small>The loop</small>
          </div>
          <ol className="orbit-cards">
            {LOOP.map((s) => (
              <li key={s.n} className={`oc oc-${s.pos}`}>
                <small><b>{s.n}</b> {s.who}</small>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ============ 01 Maintenance ============

const MAINT = [
  { icon: 'chat', h: 'Hear it during the stay', p: 'Guests message on WhatsApp or get a short call. Caretakers and owners report into the same list.' },
  { icon: 'wrench', h: 'Get it fixed', p: 'The right person gets the job on WhatsApp and a nudge until it’s done. Then the guest hears back.' },
  { icon: 'alert', h: 'Learn what breaks', p: 'When the same thing keeps breaking, you find out before the next guest does.' },
];

export function Maintenance() {
  return (
    <section className="wrap section feature" id="maintenance" aria-labelledby="maint-h">
      <div className="feature-head">
        <Eyebrow n="01">Maintenance</Eyebrow>
        <h2 id="maint-h">Fixed while your guest is still there. <em>Not after the review.</em></h2>
        <p className="lede">Every issue lands in one list, whichever way it arrives, and is chased until it’s closed.</p>
      </div>
      <ul className="feat-cards">
        {MAINT.map((f) => (
          <li key={f.h}>
            <span className="feat-ic" aria-hidden="true"><Icon name={f.icon} /></span>
            <h3>{f.h}</h3>
            <p>{f.p}</p>
          </li>
        ))}
      </ul>
      <div className="stage feature-stage"><Convergence /></div>
      <p className="fine example">Screens show example data.</p>
    </section>
  );
}

// ============ 02 Housekeeping ============

const TURNOVERS = [
  { r: 'Room 401', s: 'Ready', c: 't-ok' },
  { r: 'Room 402', s: '5 of 7', c: 't-warn', on: true },
  { r: 'Apt 2B', s: 'Checkout 11:00', c: 't-mute' },
  { r: 'Villa 7', s: 'Ready', c: 't-ok' },
];

const CHECKLIST = [
  { t: 'Beds stripped and remade', at: '11:42', done: true },
  { t: 'Bathroom cleaned', at: '11:58', done: true },
  { t: 'Towels and amenities restocked', at: '12:05', done: true },
  { t: 'AC and lights checked', at: '12:07', done: true },
  { t: 'Floors done', at: '12:15', done: true },
  { t: 'Minibar checked' },
  { t: 'Photo of the finished room' },
];

const HK = [
  { icon: 'check', h: 'Checklists on their phone', p: 'Turnover checklists come off paper. Housekeepers tick rooms off as they go.' },
  { icon: 'cal', h: 'Ready before check-in', p: 'See which rooms are ready, and which are running late, before your guest arrives.' },
  { icon: 'alert', h: 'Problems found on the turn', p: 'Anything broken goes straight into maintenance, with a photo.' },
];

export function Housekeeping() {
  return (
    <section className="wrap section feature" id="housekeeping" aria-labelledby="hk-h">
      <div className="feature-head">
        <Eyebrow n="02">Housekeeping</Eyebrow>
        <h2 id="hk-h">Every turnover checked. <em>Every room ready on time.</em></h2>
      </div>
      <div className="feature-grid">
        <Features items={HK} />
        <div className="stage">
          <Frame title="Today’s turnovers" meta="2 of 4 ready" className="hk-frame">
            <div className="hk-body" aria-hidden="true">
              <ul className="hk-rooms">
                {TURNOVERS.map((t) => (
                  <li key={t.r} className={t.on ? 'on' : ''}><b>{t.r}</b><span className={`tag ${t.c}`}>{t.s}</span></li>
                ))}
              </ul>
              <div className="hk-list">
                <div className="hk-who"><span className="av">S</span><div><b>Room 402</b><small>Sunita, housekeeping</small></div></div>
                <div className="hk-bar"><i style={{ width: `${(5 / 7) * 100}%` }} /></div>
                <ul>
                  {CHECKLIST.map((c) => (
                    <li key={c.t} className={c.done ? 'done' : ''}>
                      <i>{c.done && <Icon name="check" />}</i>{c.t}{c.at && <time>{c.at}</time>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </section>
  );
}

// ============ 03 Finance ============

const REVENUE = [
  { d: '14 Oct', h: 'Harbour House', g: 'Priya', f: 'Stay, 3 nights', t: 'Airbnb payout', n: '₹21,420', s: '₹24,600 less ₹3,180 fee' },
  { d: '13 Oct', h: 'Villa 7', g: 'Kapoor family', f: 'Stay, 5 nights', t: 'Direct stay', n: '₹62,500', s: 'No commission' },
  { d: '12 Oct', h: 'Park View', g: 'Anand', f: 'Airport pickup', t: 'Guest add-on', n: '₹1,800', s: '₹700 margin' },
];

const FIN = [
  { icon: 'receipt', h: 'Send a photo, the expense is logged', p: 'Staff send a receipt or bill on WhatsApp. Veloce reads the amount, vendor and home.' },
  { icon: 'trend', h: 'Revenue net of platform fees', p: 'Airbnb and Booking.com payouts, direct stays and guest add-ons, by home.' },
  { icon: 'doc', h: 'Invoices', p: 'Create and send invoices from the same records.', soon: true },
];

export function Finance() {
  return (
    <section className="wrap section feature" id="finance" aria-labelledby="finance-h">
      <div className="feature-head">
        <Eyebrow n="03">Finance</Eyebrow>
        <h2 id="finance-h">Revenue and expenses for every home. <em>No spreadsheets.</em></h2>
      </div>
      <div className="feature-grid">
        <Features items={FIN} />
        <div className="stage fin-stage">
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
            <div className="bub bub-out"><p>Logged for Harbour House: AC filter, Cool Air Services, ₹1,250. Read from the receipt.</p></div>
          </div>
        </div>
      </div>
      <p className="fine example">Screens show example data.</p>
    </section>
  );
}

// ============ The platform ============

const MODULES = [
  { icon: 'chat', h: 'Guest messaging', p: 'Replies on WhatsApp from your house guide.' },
  { icon: 'phone', h: 'Guest calls', p: 'Short check-in and check-out calls.' },
  { icon: 'wrench', h: 'Maintenance', p: 'Issues routed, chased and closed.' },
  { icon: 'check', h: 'Housekeeping', p: 'Turnover checklists on the phone.' },
  { icon: 'user', h: 'Staff on WhatsApp', p: 'No staff app or login to learn.' },
  { icon: 'alert', h: 'Repeat faults', p: 'Flags what keeps breaking, by home.' },
  { icon: 'cal', h: 'Calendar', p: 'Every booking, every home, one view.' },
  { icon: 'loop', h: 'Channel sync', p: 'Two-way with Airbnb and Booking.com.' },
  { icon: 'desk', h: 'Direct bookings', p: 'Returning guests book with you, no commission.' },
  { icon: 'receipt', h: 'Expenses', p: 'Logged from a photo of the receipt.' },
  { icon: 'trend', h: 'Revenue', p: 'Payouts net of fees, stays and add-ons.' },
  { icon: 'star', h: 'Owner reports', p: 'Ask a question on WhatsApp, get the answer.' },
];

export function Platform() {
  return (
    <section className="wrap section" id="platform" aria-labelledby="platform-h">
      <div className="feature-head">
        <Eyebrow>The platform</Eyebrow>
        <h2 id="platform-h">Twelve parts, one dashboard. <em>No add-ons or extra subscriptions.</em></h2>
      </div>
      <ul className="mods">
        {MODULES.map((m) => (
          <li key={m.h}>
            <span className="feat-ic" aria-hidden="true"><Icon name={m.icon} /></span>
            <h3>{m.h}</h3>
            <p>{m.p}</p>
          </li>
        ))}
      </ul>
      <p className="mods-foot">
        <b>Calendar, channel sync and direct bookings are built in, so a separate PMS can go.</b>{' '}
        <span>Save up to $6,000 a year in PMS fees (<a href={PMS_SOURCE} {...ext}>reported Hostaway pricing, 30 listings, RoomMaster</a>).</span>
      </p>
    </section>
  );
}

// ============ For owners ============

const OWNER = [
  { icon: 'star', h: 'Better ratings', p: 'Problems are fixed during the stay, and happy guests are asked for a review at checkout.' },
  { icon: 'loop', h: 'Repeat stays', p: 'Returning guests book direct, and faults that keep coming back are flagged before the next stay.' },
  { icon: 'user', h: 'More referrals', p: 'Guests who had a smooth stay are the ones who recommend you.' },
];

export function Owners() {
  return (
    <section className="wrap section" id="owners" aria-labelledby="owners-h">
      <div className="owners">
        <div>
          <Eyebrow>For owners</Eyebrow>
          <h2 id="owners-h">Better ratings, repeat stays and referrals. <em>Ask how it’s going on WhatsApp.</em></h2>
          <Features items={OWNER} />
        </div>
        <div className="stage owner-stage">
          <div className="chat owner-chat" aria-hidden="true">
            <div className="chat-top">
              <span className="chat-av"><Mark /></span>
              <div><b>Veloce</b><small>Your portfolio, on WhatsApp</small></div>
            </div>
            <div className="chat-body">
              <div className="bub bub-out"><p>How did Harbour House do this week?</p><time>09:02</time></div>
              <div className="bub bub-in">
                <small>Veloce</small>
                <p>
                  Good week. 3 stays, average rating 4.8. 5 issues raised, all fixed, in 52 minutes on average.
                  The AC in Room 401 has needed 3 repairs this month. Worth replacing?
                </p>
                <time>09:02</time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="fine example">Example data.</p>
    </section>
  );
}
