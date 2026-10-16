'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon, Mark } from './Icons';

// One guest conversation, as it plays out on WhatsApp. "event" lines are what Veloce does in the background.
const SCRIPT = [
  { k: 'in', t: 'Hi, the AC in the bedroom isn’t cooling.', at: '21:40' },
  { k: 'out', t: 'Sorry about that, Priya. Could you check the remote is on the snowflake mode? That sorts it most times.', at: '21:40', tag: 'From your Harbour House guide' },
  { k: 'in', t: 'It is. Still warm.', at: '21:43' },
  { k: 'out', t: 'Thanks for checking. I’ve sent Ravi from maintenance. He’ll be with you in about 15 minutes.', at: '21:43' },
  { k: 'event', icon: 'wrench', t: 'Issue created', to: 'Maintenance, Ravi' },
  { k: 'event', icon: 'check', t: 'Ravi marked it fixed, with a photo' },
  { k: 'out', t: 'Ravi has fixed the AC. The filter was blocked. Is there anything else we can do?', at: '22:18' },
  { k: 'in', t: 'All good now. That was quick, thank you!', at: '22:19' },
  { k: 'event', icon: 'star', t: 'At checkout, Priya is asked for a review' },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ChatHero() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(null);
  const [reduce, setReduce] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (reduce) { setShown(SCRIPT.length); setTyping(null); return undefined; }
    let alive = true;
    (async () => {
      await wait(500);
      while (alive) {
        setShown(0);
        for (let i = 0; i < SCRIPT.length && alive; i += 1) {
          const m = SCRIPT[i];
          if (m.k === 'event') {
            await wait(700);
          } else {
            setTyping(m.k);
            await wait(m.k === 'out' ? 1300 : 1000);
            setTyping(null);
          }
          if (!alive) return;
          setShown(i + 1);
          await wait(m.k === 'event' ? 500 : 900);
        }
        await wait(4200);
      }
    })();
    return () => { alive = false; };
  }, [reduce]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  return (
    <div className="chat" role="img" aria-label="A guest reports a broken AC on WhatsApp. Veloce asks one question, sends maintenance, tells the guest when it is fixed, and asks for a review at checkout.">
      <div className="chat-top" aria-hidden="true">
        <span className="chat-av"><Mark /></span>
        <div><b>Harbour House</b><small>Online, replies day and night</small></div>
      </div>
      <div className="chat-status" aria-hidden="true"><i />Veloce is replying for you</div>
      <div className="chat-body" ref={bodyRef} aria-hidden="true">
        <div className="chat-day">Today</div>
        {SCRIPT.slice(0, shown).map((m, i) => (
          m.k === 'event' ? (
            <div className="chat-event" key={i}><Icon name={m.icon} />{m.t}{m.to && <><Icon name="arrow" /><b>{m.to}</b></>}</div>
          ) : (
            <div className={`bub bub-${m.k}`} key={i}>
              {m.k === 'in' && i === 0 && <small>Priya, Room 401</small>}
              {m.k === 'out' && <small className="bub-from">Veloce</small>}
              <p>{m.t}{m.tag && <span className="bub-tag">{m.tag}</span>}</p>
              <time>{m.at}</time>
            </div>
          )
        ))}
        {typing && (
          <div className={`bub bub-${typing} bub-typing`}><i /><i /><i /></div>
        )}
      </div>
      <div className="chat-input" aria-hidden="true"><span>Message</span><i><Icon name="arrow" /></i></div>
    </div>
  );
}
