/**
 * The five distinct demo cards that appear next to each step of the pipeline.
 * Each one is a different visual, on purpose — voice → capture → route →
 * housekeeping → ask. Kept in one file so they're easy to compare and tweak
 * together.
 */

/* ------- 01 · VOICE ------- */
export function VoiceCard() {
  const lines = [
    { who: 'a', label: 'AI', t: <>Hi Daniel, this is Veloce calling from The Yard, room 401. Just checking in a couple of hours after check-in, is everything set up as you expected?</> },
    { who: 'g', label: 'GST', t: <>Mostly, yes. The room's great. But the <span className="hi">AC hasn't really been cooling</span> since we got in.</> },
    { who: 'a', label: 'AI', t: <>Sorry to hear that. Since check-in, so about two hours?</> },
    { who: 'g', label: 'GST', t: <>Yeah, since we came in. It's warm outside and the room isn't dropping.</> },
    { who: 'a', label: 'AI', t: <>Understood. I'll get someone on it now, before evening. Anything else you need before I let you go?</> }
  ]
  return (
    <div className="demo-voice">
      <div className="head">
        <div className="ring">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-17.76-17.76A2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.79a2 2 0 0 1-.45 2.11L8.09 9.85a16 16 0 0 0 6 6l1.23-1.23a2 2 0 0 1 2.11-.45c.9.35 1.83.59 2.79.72A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.9" />
          </svg>
        </div>
        <div className="meta">
          <b>Daniel Ross · Room 401</b>
          <div className="m2">check-in day · 14:22 · English</div>
        </div>
        <div className="dur">01:14</div>
      </div>
      <div className="body">
        {lines.map((m, i) => (
          <div className="msg" key={i}>
            <span className={`who ${m.who}`}>{m.label}</span>
            <span className="t">{m.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------- 02 · CAPTURE ------- */
export function CaptureCard() {
  return (
    <div className="demo-cap">
      <div className="head">
        <div className="id">T-4172 · created 14:23</div>
        <div className="sev">HIGH</div>
      </div>
      <div className="rows">
        <Row k="room" v="401" />
        <Row k="guest" v={<>Daniel Ross<span className="badge">check-in day</span></>} />
        <Row k="asset" v="AC" mint />
        <Row k="category" v="cooling" mint />
        <Row k="issue" v="not cooling since check-in" />
        <Row k="source" v="voice, check-in call" />
      </div>
      <div className="foot">
        <span>reservation R-8891</span>
        <span><b>chronic:</b> 4th AC ticket, Room 401, 14d</span>
      </div>
    </div>
  )
}
function Row({ k, v, mint }) {
  return (
    <div className="r">
      <div className="k">{k}</div>
      <div className={`v ${mint ? 'mint' : ''}`}>{v}</div>
    </div>
  )
}

/* ------- 03 · ROUTE (notification cascade) ------- */
export function RouteCard() {
  const rows = [
    {
      done: true, time: '14:23',
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.8"/></svg>,
      title: 'Ops manager pinged', kicker: 'WhatsApp · Arjun R.'
    },
    {
      done: true, time: '14:23',
      icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v12H4z M4 6l8 7 8-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
      title: "GM cc'd on email", kicker: 'meera@urbannest.in'
    },
    {
      done: true, time: '14:24',
      icon: <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      title: 'Housekeeping tablet', kicker: 'assigned to floor 4 supervisor'
    },
    {
      done: false, time: '14:23',
      icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      title: 'SLA clock started', kicker: '30 min · severity=high'
    }
  ]
  return (
    <div className="demo-notif">
      <div className="n-head">Cascade · T-4172</div>
      {rows.map((r, i) => (
        <div className={`n-row ${r.done ? 'done' : ''}`} key={i}>
          <div className="ic">{r.icon}</div>
          <div className="body">
            <b>{r.title}</b>
            <span className="k">{r.kicker}</span>
          </div>
          <div className="time">{r.time}</div>
        </div>
      ))}
    </div>
  )
}

/* ------- 04 · HOUSEKEEPING CHECKLIST ------- */
export function HousekeepingCard() {
  const items = [
    { state: 'done', txt: 'Beds stripped and remade', who: '14:02' },
    { state: 'done', txt: 'Bathroom scrubbed, mirrors wiped', who: '14:08' },
    { state: 'done', txt: 'Amenities restocked', who: '14:11' },
    { state: 'done', txt: 'Kitchen wiped, kettle descaled', who: '14:15' },
    { state: 'flag', txt: 'AC filter check · flag from ticket T-4172', who: 'pending' },
    { state: 'todo', txt: 'Vacuum floors and rug', who: '' },
    { state: 'todo', txt: 'Supervisor final walkthrough', who: '' }
  ]
  return (
    <div className="demo-hk">
      <div className="head">
        <div className="room">Room 214 · turnover<span className="sub">Sunita B.</span></div>
        <div className="prog">7 / 9 done</div>
      </div>
      <div className="checklist">
        {items.map((it, i) => (
          <div className={`item ${it.state === 'done' ? 'done' : ''} ${it.state === 'flag' ? 'flag' : ''}`} key={i}>
            <div className="box">
              {it.state === 'done' && (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="txt">{it.txt}</div>
            {it.who && <div className="who">{it.who}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------- 05 · ASK VELOCE (in-app) ------- */
export function AskCard() {
  return (
    <div className="demo-ask">
      <div className="a-in">
        <span className="q">what needs attention across all my properties today?</span>
      </div>
      <div className="a-out">
        3 priorities. <b>Harbour House</b> has recurring AC faults, <b>Park View</b> has two arrivals awaiting confirmation, and <b>City Suites</b> has four housekeeping checks due before 2 PM.
      </div>
      <div className="a-actions">
        <div className="head">recommended actions</div>
        <div className="a-action">
          <span className="mark">1</span>
          <div><b>Inspect the recurring AC faults</b><span>Harbour House · Rooms 401, 305, and 218</span></div>
        </div>
        <div className="a-action">
          <span className="mark">2</span>
          <div><b>Confirm the two arriving stays</b><span>Park View · Both guests arrive today</span></div>
        </div>
        <div className="a-action">
          <span className="mark">3</span>
          <div><b>Rebalance the housekeeping team</b><span>City Suites · Four checks due by 2 PM</span></div>
        </div>
      </div>
    </div>
  )
}
