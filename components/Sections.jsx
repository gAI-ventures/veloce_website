import { Icon } from './Icons';

const PROPERTY_TYPES = [
  'Short-term rentals', 'Serviced apartments', 'Boutique hotels', 'Villa collections', 'Holiday homes',
  'Resorts', 'Heritage stays', 'Aparthotels', 'Guesthouses', 'Homestays', 'Bed and breakfasts',
  'Hostels', 'Corporate housing', 'Co-living spaces', 'Hotel groups',
];

// A slow ticker. The second copy of the list is only there to make the loop seamless.
export function Operators() {
  return (
    <section className="ops" aria-labelledby="ops-h">
      <p className="ops-lead" id="ops-h">Made for the people running</p>
      <div className="ticker">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {PROPERTY_TYPES.map((o) => <li key={o}>{o}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

const TODAY = [
  { t: 'Day 1, 21:40', p: 'Your guest tells the caretaker the AC isn’t cooling.', w: 'Caretaker’s phone', icon: 'user' },
  { t: 'Day 1, 22:05', p: 'The caretaker rings the owner, who says to look at it tomorrow.', w: 'Owner’s phone', icon: 'phone' },
  { t: 'Day 2, 10:15', p: 'Your ops manager spots it in a group chat and asks which room.', w: 'WhatsApp group', icon: 'chat' },
  { t: 'Day 2, 13:30', p: 'The AC technician can’t come until Thursday.', w: 'Vendor call', icon: 'wrench' },
  { t: 'Day 2, 20:10', p: 'The guest complains again, this time at the front desk.', w: 'Front desk', icon: 'loop', again: true },
  { t: 'Day 3, 11:00', p: 'They check out. Nobody ever confirmed a fix.', w: 'Front desk', icon: 'desk' },
  { t: 'Day 10', p: 'A 3-star review: “The AC never worked.”', w: 'Review site', icon: 'star', bad: true },
];

const WITH = [
  { t: 'Day 1, 18:22', p: 'On the check-in call, the guest mentions the AC.', w: 'Voice call', icon: 'phone' },
  { t: '18:24', p: 'It’s logged for Room 401 and sent to Ravi on WhatsApp.', w: 'Veloce', icon: 'chat' },
  { t: '19:06', p: 'Fixed before dinner, and the guest hears back.', w: 'Closed', icon: 'check', good: true },
  { t: 'Day 4', p: 'A 5-star review: “They sorted the AC within the hour.”', w: 'Review site', icon: 'star', good: true },
];

const OUTCOMES = {
  today: ['Average rating drops', 'Fewer bookings', 'Lower occupancy'],
  with: ['Average rating rises', 'More bookings', 'Higher occupancy'],
};

function Lane({ title, meta, items, variant }) {
  const up = variant === 'with';
  return (
    <div className={`lane lane-${variant}`}>
      <div className="lane-head"><h3>{title}</h3><span>{meta}</span></div>
      <ol className="tl">
        {items.map((s) => (
          <li key={s.t} className={s.bad ? 'bad' : s.good ? 'good' : ''}>
            <span className="pin" aria-hidden="true"><Icon name={s.icon} /></span>
            <time>{s.t}</time>
            <p>{s.p}</p>
            <small>{s.again && <Icon name="loop" />}{s.w}</small>
          </li>
        ))}
      </ol>
      <ul className={`outcome ${up ? 'up' : 'down'}`} aria-label={up ? 'What follows with Veloce' : 'What follows today'}>
        {OUTCOMES[variant].map((o) => (
          <li key={o}><Icon name={up ? 'trend' : 'fall'} />{o}</li>
        ))}
      </ul>
    </div>
  );
}

export function Problem() {
  return (
    <section className="wrap section" id="problem" aria-labelledby="problem-h">
      <div className="sec-head split">
        <h2 id="problem-h">Most guest problems reach you after checkout</h2>
        <p className="lede">They get lost between phones and group chats, so the first you hear of it is often the review.</p>
      </div>

      <div className="compare" aria-label="The same complaint, today and with Veloce">
        <Lane title="Today" meta="6 handoffs, 10 days" items={TODAY} variant="today" />
        <Lane title="With Veloce" meta="Fixed in 44 minutes" items={WITH} variant="with" />
      </div>
      <p className="fine example">One complaint at one property, as an example.</p>
    </section>
  );
}

function Frame({ title, meta, children, className = '' }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-top"><b>{title}</b>{meta && <span>{meta}</span>}</div>
      {children}
    </div>
  );
}

function CallVisual() {
  return (
    <div className="stack" aria-hidden="true">
      <Frame title="Check-in call, Room 401" meta="1:14" className="call">
        <div className="wave">{[6, 12, 18, 10, 22, 14, 26, 16, 9, 20, 12, 24, 8, 15, 11, 19, 7, 13].map((h, i) => <i key={i} style={{ height: h }} />)}</div>
        <ul className="lines">
          <li><span className="who v">Veloce</span><p>Hi, just checking in. Is the room set up as you expected?</p></li>
          <li><span className="who">Guest</span><p>Mostly. But <mark>the AC hasn’t really been cooling</mark> since we got in.</p></li>
          <li><span className="who v">Veloce</span><p>Sorry about that. I’ll get someone on it now.</p></li>
        </ul>
      </Frame>
      <Frame title="New issue" meta="18:23" className="ticket">
        <dl>
          <div><dt>Room</dt><dd>401</dd></div>
          <div><dt>Issue</dt><dd>AC not cooling</dd></div>
          <div><dt>Priority</dt><dd><span className="tag t-danger">High</span></dd></div>
          <div><dt>From</dt><dd>Guest, check-in call</dd></div>
        </dl>
      </Frame>
    </div>
  );
}

const TRAIL = [
  { t: '18:24', h: 'Ravi, maintenance', s: 'Sent on WhatsApp', icon: 'chat' },
  { t: '18:24', h: 'Ops manager copied', s: 'High priority, in-house guest', icon: 'user' },
  { t: '18:50', h: 'Reminder sent', s: 'No update after 25 minutes', icon: 'alert' },
  { t: '19:05', h: 'Photo of the fix', s: 'Ravi, from Room 401', icon: 'check' },
  { t: '19:06', h: 'Guest told', s: 'WhatsApp message', icon: 'phone', done: true },
];

function RouteVisual() {
  return (
    <Frame title="AC not cooling, Room 401" meta={<span className="tag t-ok">Fixed</span>} className="route">
      <ol className="trail" aria-hidden="true">
        {TRAIL.map((r) => (
          <li key={r.h} className={r.done ? 'done' : ''}>
            <i><Icon name={r.icon} /></i>
            <div><b>{r.h}</b><span>{r.s}</span></div>
            <time>{r.t}</time>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

const BOARD = [
  { p: 'Harbour House', open: 3, rep: 2, flag: 'AC, Room 401', warn: true },
  { p: 'Park View', open: 1, rep: 0, flag: '' },
  { p: 'City Suites', open: 4, rep: 1, flag: 'Lock, 2B' },
  { p: 'Villa 7', open: 0, rep: 0, flag: '' },
];

function BoardVisual() {
  return (
    <div className="stack" aria-hidden="true">
      <Frame title="All properties" meta="This month" className="board">
        <table>
          <thead><tr><th>Property</th><th>Open</th><th>Repeat faults</th></tr></thead>
          <tbody>
            {BOARD.map((b) => (
              <tr key={b.p}>
                <td>{b.p}</td>
                <td>{b.open}</td>
                <td>{b.rep ? <span className={`tag ${b.warn ? 't-warn' : 't-mute'}`}>{b.flag}</span> : <span className="none">None</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Frame>
      <div className="fault-card">
        <b>AC, Room 401</b>
        <span>4 repairs in 14 days. Worth replacing?</span>
        <div className="bars">{[30, 22, 55, 18, 70, 62, 90].map((h, i) => <i key={i} className={h > 50 ? 'w' : ''} style={{ height: `${h}%` }} />)}</div>
      </div>
    </div>
  );
}

const ROWS = [
  { h: 'Hear it early', p: 'Guests get a quick call or WhatsApp during their stay. Caretakers and owners report into the same list.', v: <CallVisual /> },
  { h: 'Get it fixed', p: 'The right person gets it on WhatsApp and a nudge until it’s done. Then the guest hears back.', v: <RouteVisual /> },
  { h: 'Learn what breaks', p: 'When the same thing keeps breaking, you find out before the next guest does.', v: <BoardVisual /> },
];

export function Steps() {
  return (
    <section className="wrap section" id="helps" aria-labelledby="helps-h">
      <div className="sec-head split">
        <h2 id="helps-h">How Veloce takes operations off your plate</h2>
        <p className="lede">Three things happen for every issue, whichever way it reaches you.</p>
      </div>
      <div className="rows">
        {ROWS.map((r) => (
          <div className="row" key={r.h}>
            <div className="row-copy">
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </div>
            <div className="stage row-vis">{r.v}</div>
          </div>
        ))}
      </div>
      <p className="via">
        <span className="chan"><Icon name="phone" />Voice calls</span>
        <span className="chan"><Icon name="chat" />WhatsApp</span>
        <span className="txt">in your guest’s own language</span>
      </p>
      <p className="fine example center">Screens show example data.</p>
    </section>
  );
}

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

export function Housekeeping() {
  return (
    <section className="wrap section" id="housekeeping" aria-labelledby="hk-h">
      <div className="hk">
        <div className="hk-copy">
          <h2 id="hk-h">Housekeeping in the same place</h2>
          <p>Turnover checklists come off paper. Housekeepers tick rooms off on their phone, and you can see which rooms are ready before check-in.</p>
        </div>
        <div className="stage hk-stage">
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
