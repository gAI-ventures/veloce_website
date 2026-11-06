'use client';

import { useEffect, useRef, useState } from 'react';
import { Mark } from './Icons';

// Swap these for the USD or AED versions later. The story stays the same.
const HOME = 'Indiranagar 2BHK';
const BILL = '₹850';

// One place for the chat copy. from: 'veloce' or 'you'. text: one string per line.
const MESSAGES = [
  { divider: 'Today', from: 'veloce', time: '10:42', text: [
    `Guest at ${HOME} says the geyser in the master bathroom isn't heating. I've raised a maintenance job with the photo they sent.`,
    'Assign to Ravi (plumber)?',
  ] },
  { from: 'you', time: '10:43', text: ['Yes, assign to Ravi.'] },
  { from: 'veloce', time: '10:43', text: [
    "Done. Ravi has the job on WhatsApp with the photo and the guest's check-out time. I'll update you when it's fixed.",
  ] },
  { divider: '1:15 PM', from: 'veloce', time: '1:15 PM', image: 'photo', text: [
    'Ravi has replaced the heating element and sent a photo. Guest confirms hot water is back. Job closed.',
  ] },
  { from: 'you', time: '1:20 PM', text: ['Great, thanks.'] },
  { divider: 'Tomorrow', from: 'veloce', time: '11:05', text: [
    'Guest checked out this morning and left a 5-star review.',
    `Ravi's bill of ${BILL} is logged as an expense for ${HOME} with the receipt attached.`,
    'Nothing pending on your side.',
  ] },
  { from: 'veloce', time: '11:05', text: [
    'Note: this is the second geyser fault at this home in three months. I\'ve flagged it for replacement rather than another repair.',
  ] },
];

const TYPING = 700;   // dots before each Veloce message
const REPLY = 900;    // pause before each of your messages
const GAP = 1100;     // between messages
const DIVIDER = 400;  // divider shows this long before its message
const HOLD = 3500;    // after the last message
const FADE = 400;

// The whole loop as a list of timed steps, so pausing and resuming is just an index.
function buildSteps() {
  const steps = [];
  MESSAGES.forEach((m, i) => {
    if (i > 0) steps.push({ wait: GAP });
    if (m.divider) steps.push({ wait: 0, divider: i }, { wait: DIVIDER });
    if (m.from === 'veloce') steps.push({ wait: 0, typing: true }, { wait: TYPING, show: i });
    else steps.push({ wait: REPLY, show: i });
  });
  steps.push({ wait: HOLD, fade: true }, { wait: FADE, reset: true });
  return steps;
}
const STEPS = buildSteps();

export default function WhatsAppChat() {
  const [dividers, setDividers] = useState(0); // dividers shown up to message index
  const [shown, setShown] = useState(-1);      // last message index shown
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);
  const [running, setRunning] = useState(false);
  const step = useRef(0);
  // The chat body is anchored to the bottom in CSS, so the newest bubble is always in view.
  const frame = useRef(null);

  // Reduced motion: show everything. Otherwise run only while the phone is on screen.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(MESSAGES.length - 1);
      setDividers(MESSAGES.length);
      return;
    }
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.15 });
    io.observe(frame.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let t;
    const tick = () => {
      const s = STEPS[step.current];
      t = setTimeout(() => {
        if (s.divider !== undefined) setDividers(s.divider + 1);
        if (s.typing) setTyping(true);
        if (s.show !== undefined) { setTyping(false); setShown(s.show); setDividers((d) => Math.max(d, s.show + 1)); }
        if (s.fade) setFading(true);
        if (s.reset) { setShown(-1); setDividers(0); setFading(false); }
        step.current = (step.current + 1) % STEPS.length;
        tick();
      }, s.wait);
    };
    tick();
    return () => clearTimeout(t);
  }, [running]);

  return (
    <figure className="wa">
      <p className="sr-only">
        Example: Veloce raises a geyser issue, the operator assigns it to the plumber on WhatsApp, Veloce confirms the
        fix, and reports the guest&apos;s 5-star review and the logged expense.
      </p>
      <div className="wa-phone" ref={frame} aria-hidden="true">
        <div className="wa-head">
          <span className="wa-av"><Mark /></span>
          <span className="wa-name"><b>Veloce</b><small>online</small></span>
        </div>
        <div className={`wa-body${fading ? ' fading' : ''}`}>
          {MESSAGES.map((m, i) => (
            <div key={i} className="wa-item">
              {m.divider && i < dividers && <div className="wa-day"><span>{m.divider}</span></div>}
              {i <= shown && (
                <div className={`wa-msg ${m.from === 'you' ? 'out' : 'in'}`}>
                  {m.image && <div className="wa-img">{m.image}</div>}
                  {m.text.map((line, j) => <p key={j}>{line}</p>)}
                  <time>{m.time}</time>
                </div>
              )}
            </div>
          ))}
          {typing && <div className="wa-msg in wa-typing"><i /><i /><i /></div>}
        </div>
      </div>
      <figcaption>Illustrative conversation.</figcaption>
    </figure>
  );
}
