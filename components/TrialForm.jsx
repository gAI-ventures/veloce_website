'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { UNIT_BANDS, CURRENT_TOOLS, TRIAL, TRIAL_FORM_URL } from '@/lib/trial';
import { ext } from '@/lib/siteConfig';

const EMPTY = { name: '', whatsapp: '', email: '', units: '', tools: '', botcheck: false };

export default function TrialForm({ demoWaUrl }) {
  const [f, setF] = useState(EMPTY);
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (f.botcheck) return;
    setState('sending');
    try {
      const res = await fetch(TRIAL_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Veloce free trial: ${f.name} (${f.units} units)`,
          _template: 'table',
          _captcha: 'false',
          _replyto: f.email,
          Name: f.name,
          WhatsApp: f.whatsapp,
          Email: f.email,
          Units: f.units,
          'Using today': f.tools,
          Page: window.location.href,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setState(res.ok && String(data.success) === 'true' ? 'done' : 'error');
    } catch (err) {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="trial-form trial-done" role="status">
        <span className="trial-ok" aria-hidden="true"><Icon name="check" /></span>
        <h3>You’re in, {f.name.split(' ')[0] || 'thanks'}</h3>
        <p>We’ll message you on WhatsApp {TRIAL.setup} to set up your first homes.</p>
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
      {/* Left unticked by people; bots tick it. */}
      <input type="checkbox" className="tf-hp" tabIndex={-1} aria-hidden="true" checked={f.botcheck} onChange={(e) => setF((s) => ({ ...s, botcheck: e.target.checked }))} />
      <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Starting your free month' : 'Start my free month'}
      </button>
      {state === 'error' && <p className="tf-err" role="alert">That didn’t go through. Please try again in a moment.</p>}
      <p className="fine">Free for {TRIAL.length}. No card needed. We only use your number to set you up.</p>
    </form>
  );
}
