'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { UNIT_BANDS, CURRENT_TOOLS, TRIAL } from '@/lib/trial';
import { CONTACT_EMAIL, ext } from '@/lib/siteConfig';

const EMPTY = { name: '', whatsapp: '', email: '', units: '', tools: '', company: '' };

// Gmail compose with the details filled in. Used when the signup endpoint is not set or fails,
// so a signup is never lost.
function emailFallback(f) {
  const body = [
    'I would like to start the free month of Veloce.',
    '',
    `Name: ${f.name}`,
    `WhatsApp: ${f.whatsapp}`,
    `Email: ${f.email}`,
    `Units: ${f.units}`,
    `Using today: ${f.tools}`,
  ].join('\n');
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent('Veloce free trial')}&body=${encodeURIComponent(body)}`;
}

export default function TrialForm({ demoWaUrl }) {
  const [f, setF] = useState(EMPTY);
  const [state, setState] = useState('idle'); // idle | sending | done | fallback
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, page: window.location.href }),
      });
      if (res.ok) { setState('done'); return; }
    } catch (err) {
      // Falls through to email.
    }
    setState('fallback');
  };

  if (state === 'done' || state === 'fallback') {
    return (
      <div className="trial-form trial-done" role="status">
        <span className="trial-ok" aria-hidden="true"><Icon name="check" /></span>
        {state === 'done' ? (
          <>
            <h3>You’re in, {f.name.split(' ')[0] || 'thanks'}</h3>
            <p>We’ll message you on WhatsApp {TRIAL.setup} to set up your first homes.</p>
          </>
        ) : (
          <>
            <h3>One more step</h3>
            <p>Send us your details by email and we’ll set you up {TRIAL.setup}.</p>
            <a className="btn btn-primary" href={emailFallback(f)} {...ext}>Send my details by email</a>
          </>
        )}
        {demoWaUrl && (
          <div className="trial-next">
            <p>While you wait, message our demo home as a guest would.</p>
            <a className="btn btn-ghost" href={demoWaUrl} {...ext}><Icon name="chat" />Try it on WhatsApp</a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form className="trial-form" onSubmit={submit}>
      <div className="tf">
        <label htmlFor="tf-name">Your name</label>
        <input id="tf-name" required autoComplete="name" value={f.name} onChange={set('name')} />
      </div>
      <div className="tf-2">
        <div className="tf">
          <label htmlFor="tf-wa">WhatsApp number</label>
          <input id="tf-wa" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98000 00000" value={f.whatsapp} onChange={set('whatsapp')} />
        </div>
        <div className="tf">
          <label htmlFor="tf-email">Work email</label>
          <input id="tf-email" required type="email" autoComplete="email" value={f.email} onChange={set('email')} />
        </div>
      </div>
      <div className="tf-2">
        <div className="tf">
          <label htmlFor="tf-units">Units you run</label>
          <select id="tf-units" required value={f.units} onChange={set('units')}>
            <option value="" disabled>Choose</option>
            {UNIT_BANDS.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div className="tf">
          <label htmlFor="tf-tools">What you use today</label>
          <select id="tf-tools" required value={f.tools} onChange={set('tools')}>
            <option value="" disabled>Choose</option>
            {CURRENT_TOOLS.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      {/* Left empty by people; bots fill it in. */}
      <input className="tf-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.company} onChange={set('company')} />
      <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Starting your free month' : 'Start my free month'}
      </button>
      <p className="fine">Free for {TRIAL.length}. No card needed. We only use your number to set you up.</p>
    </form>
  );
}
