// Hero visual: a real screenshot of the Veloce web app (demo account, from the Maintenance help video)
// next to example WhatsApp and iMessage chats. Keep the chats telling the same story as the screenshot:
// ticket T-0029, the AC at AM-101 Arvind Meadows.
import { Mark } from './Icons';

const WA = [
  { from: 'in', t: '21:36', p: <><b>New ticket T-0029, high</b><br />AC, AM-101 Arvind Meadows. Guest in house says it stops cooling after an hour. Fix within 4 hours.</> },
  { from: 'out', t: '21:38', p: 'On my way' },
  { from: 'out', t: '22:41', p: 'Done. Topped up the gas and cleaned the filter.' },
  { from: 'in', t: '22:42', p: 'Thanks. Guest told, T-0029 closed.' },
];

const IM = [
  { from: 'in', p: 'The guest in AM-102 asks for a 1 PM check-out tomorrow. The next guest arrives at 4 PM, so there’s time to clean.' },
  { from: 'out', p: 'Yes, approve it.' },
  { from: 'in', p: 'Done. I’ve told the guest and moved housekeeping to 1:30 PM.' },
];

function WebApp() {
  return (
    <div className="mk mk-web">
      <div className="mk-bar"><i /><i /><i /><span>Veloce</span></div>
      <picture>
        <source media="(max-width: 760px)" srcSet="/app-maintenance-mobile.webp" width="900" height="950" />
        <img
          src="/app-maintenance.webp"
          width="1600"
          height="888"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}

// iPhone status bar: time, signal, wifi, battery.
function StatusBar() {
  return (
    <div className="mk-status">
      <b>9:41</b>
      <svg viewBox="0 0 48 12" aria-hidden="true" focusable="false">
        <rect x="0" y="8" width="3" height="4" rx=".8" /><rect x="4.5" y="6" width="3" height="6" rx=".8" />
        <rect x="9" y="3.5" width="3" height="8.5" rx=".8" /><rect x="13.5" y="1" width="3" height="11" rx=".8" />
        <path d="M25 3.2a8.6 8.6 0 0 1 6 2.4l1.1-1.2a10.2 10.2 0 0 0-14.2 0L19 5.6a8.6 8.6 0 0 1 6-2.4zm0 3.2a5.4 5.4 0 0 1 3.8 1.5l1.1-1.2a7 7 0 0 0-9.8 0l1.1 1.2A5.4 5.4 0 0 1 25 6.4zm0 3.2a2.2 2.2 0 0 1 1.5.6L25 11.8l-1.5-1.6a2.2 2.2 0 0 1 1.5-.6z" />
        <rect x="34.5" y="1.5" width="11" height="9" rx="2.6" fill="none" stroke="currentColor" opacity=".45" />
        <rect x="36" y="3" width="8" height="6" rx="1.4" />
        <rect x="46.3" y="4.5" width="1.2" height="3" rx=".6" opacity=".45" />
      </svg>
    </div>
  );
}

const ticks = (
  <svg className="mk-ticks" viewBox="0 0 16 11" aria-hidden="true" focusable="false">
    <path d="M11.1.7 5.3 8 2.6 5.5l-.9 1L5.4 10l6.7-8.5zM15.1.7 9.3 8l-.9-.8-.8 1L9.4 10l6.7-8.5z" />
  </svg>
);

function WhatsAppPhone() {
  return (
    <div className="mk mk-phone mk-wa">
      <StatusBar />
      <div className="mk-wa-head">
        <svg className="mk-back" viewBox="0 0 10 18" aria-hidden="true" focusable="false"><path d="M8.5 1.5 1.5 9l7 7.5" /></svg>
        <span className="mk-av"><Mark /></span>
        <span className="mk-wa-name"><b>Veloce</b><small>Business account</small></span>
        <svg className="mk-wa-ic mk-vid" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="6" width="13" height="12" rx="3" /><path d="m15.5 10.5 6-3.5v10l-6-3.5" /></svg>
        <svg className="mk-wa-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3.5h2.6l1.4 4-2 1.4a11 11 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6A2 2 0 0 1 18.5 21 15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" /></svg>
      </div>
      <div className="mk-chat">
        <span className="mk-day">Today</span>
        {WA.map((m, i) => (
          <div key={i} className={`mk-b mk-${m.from}`}>
            {m.p}
            <time>{m.t}{m.from === 'out' && ticks}</time>
          </div>
        ))}
      </div>
      <div className="mk-wa-input">
        <span className="mk-plus">+</span>
        <span className="mk-field" />
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8.5A2 2 0 0 1 6 6.5h2l1.5-2h5l1.5 2h2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
      </div>
      <i className="mk-home" />
    </div>
  );
}

function IMessagePhone() {
  return (
    <div className="mk mk-phone mk-im">
      <StatusBar />
      <div className="mk-im-head">
        <span className="mk-av"><Mark /></span>
        <small>Veloce</small>
      </div>
      <div className="mk-chat">
        <span className="mk-when"><b>Today</b> 6:12 PM</span>
        {IM.map((m, i) => <div key={i} className={`mk-b mk-${m.from}`}>{m.p}</div>)}
        <span className="mk-read">Read 6:14 PM</span>
      </div>
      <div className="mk-im-input">
        <span className="mk-plus">+</span>
        <span className="mk-field">iMessage</span>
      </div>
      <i className="mk-home" />
    </div>
  );
}

export default function ChannelMockups() {
  return (
    <figure className="channels">
      <p className="sr-only">
        A screenshot of the Veloce web app showing live maintenance tickets across properties. Beside it, a
        technician gets an AC ticket on WhatsApp and closes it, and the operator approves a late check-out on
        iMessage.
      </p>
      <div className="channels-stage" aria-hidden="true">
        <div className="ch-slot ch-web"><span className="ch-label">Web app</span><WebApp /></div>
        <div className="ch-slot ch-wa"><span className="ch-label">WhatsApp</span><WhatsAppPhone /></div>
        <div className="ch-slot ch-im"><span className="ch-label">iMessage</span><IMessagePhone /></div>
      </div>
      <figcaption>Veloce web app with demo data. Chats are examples.<span className="ch-swipe"> Swipe to see WhatsApp and iMessage.</span></figcaption>
    </figure>
  );
}
