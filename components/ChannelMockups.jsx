import { Icon, Mark } from './Icons';

// Hero visual: the same jobs seen in the web app, on a plumber's WhatsApp and on the operator's iMessage.
// Example data only. Keep the three screens telling one story: the geyser job and the late check-out
// in the web app are the two chats on the phones.

const JOBS = [
  { h: 'Geyser not heating', s: 'Indiranagar 2BHK, Ravi', via: 'WhatsApp', icon: 'chat', st: 'Fixed', tone: 'ok' },
  { h: 'Late check-out, 1 PM', s: 'Villa 7, you', via: 'iMessage', icon: 'chat', st: 'Approved', tone: 'ok' },
  { h: 'Lock sticking', s: 'City Suites 2B, Anita', via: 'Call', icon: 'phone', st: 'Assigned', tone: 'mute' },
  { h: 'Extra towels for 4', s: 'Park View, housekeeping', via: 'Web', icon: 'screen', st: 'Open', tone: 'warn' },
  { h: 'AC filter due', s: 'Harbour House, Ravi', via: 'Web', icon: 'screen', st: 'Scheduled', tone: 'mute' },
];

const NAV = [
  { n: 'Jobs', icon: 'wrench', on: true },
  { n: 'Homes', icon: 'home' },
  { n: 'Calendar', icon: 'cal' },
  { n: 'Finance', icon: 'receipt' },
];

const WA = [
  { from: 'in', t: '10:42', p: 'New job at Indiranagar 2BHK: the geyser in the master bathroom isn’t heating. Guest’s photo attached. They check out Sunday.' },
  { from: 'out', t: '10:44', p: 'On my way, 30 minutes.' },
  { from: 'out', t: '11:31', photo: true, p: 'Fixed. Replaced the heating element.' },
  { from: 'in', t: '11:32', p: 'Thanks Ravi. I’ve told the guest and closed the job.' },
];

const IM = [
  { from: 'in', p: 'The guest at Villa 7 asks for a 1 PM check-out tomorrow. The next guest arrives at 4 PM, so there’s time to clean.' },
  { from: 'out', p: 'Yes, approve it.' },
  { from: 'in', p: 'Done. I’ve told the guest and moved housekeeping to 1:30 PM.' },
];

function WebApp() {
  return (
    <div className="mk mk-web">
      <div className="mk-bar"><i /><i /><i /><span>Veloce</span></div>
      <div className="mk-app">
        <aside className="mk-side">
          <span className="mk-logo"><Mark />Veloce</span>
          {NAV.map((n) => <span key={n.n} className={n.on ? 'on' : undefined}><Icon name={n.icon} />{n.n}</span>)}
        </aside>
        <div className="mk-main">
          <div className="mk-head"><b>Jobs</b><span>Today</span></div>
          <div className="mk-rows">
            {JOBS.map((j) => (
              <div className="mk-row" key={j.h}>
                <span className="mk-job"><b>{j.h}</b><small>{j.s}</small></span>
                <span className="mk-via"><Icon name={j.icon} />{j.via}</span>
                <span className={`mk-st t-${j.tone}`}>{j.st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppPhone() {
  return (
    <div className="mk mk-phone mk-wa">
      <div className="mk-wa-head">
        <span className="mk-av"><Mark /></span>
        <span><b>Veloce</b><small>online</small></span>
      </div>
      <div className="mk-chat">
        {WA.map((m, i) => (
          <div key={i} className={`mk-b mk-${m.from}`}>
            {m.photo && <span className="mk-photo" />}
            {m.p}
            <time>{m.t}</time>
          </div>
        ))}
      </div>
    </div>
  );
}

function IMessagePhone() {
  return (
    <div className="mk mk-phone mk-im">
      <div className="mk-im-head">
        <span className="mk-av"><Mark /></span>
        <small>Veloce</small>
      </div>
      <div className="mk-chat">
        <span className="mk-when">Today 6:12 PM</span>
        {IM.map((m, i) => <div key={i} className={`mk-b mk-${m.from}`}>{m.p}</div>)}
      </div>
    </div>
  );
}

export default function ChannelMockups() {
  return (
    <figure className="channels">
      <p className="sr-only">
        Example screens. The Veloce web app lists today’s jobs. A plumber gets a job and closes it on WhatsApp, and
        the operator approves a late check-out on iMessage. Both jobs show up in the web app.
      </p>
      <div className="channels-stage" aria-hidden="true">
        <div className="ch-slot ch-web"><span className="ch-label">Web app</span><WebApp /></div>
        <div className="ch-slot ch-wa"><span className="ch-label">WhatsApp</span><WhatsAppPhone /></div>
        <div className="ch-slot ch-im"><span className="ch-label">iMessage</span><IMessagePhone /></div>
      </div>
      <figcaption>Example screens and data.</figcaption>
    </figure>
  );
}
