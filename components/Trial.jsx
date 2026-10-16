import { Icon } from './Icons';
import TrialForm from './TrialForm';
import { demoWaUrl, TRIAL } from '@/lib/trial';
import { ext } from '@/lib/siteConfig';

// The free trial. Step one is the "aha": message the demo agent as a guest and watch it handle the issue.
export default function Trial() {
  const steps = [
    demoWaUrl && {
      h: 'Try it as a guest',
      p: 'Message our demo home on WhatsApp about a broken AC. See how Veloce replies and sends it to maintenance. It takes two minutes.',
      cta: <a className="btn btn-ghost btn-sm" href={demoWaUrl} {...ext}><Icon name="chat" />Try it on WhatsApp</a>,
    },
    { h: 'Tell us about your homes', p: 'A few quick questions. No card needed.' },
    { h: `Live ${TRIAL.setup}`, p: `We connect your first homes and your team’s WhatsApp. Free for ${TRIAL.length}.` },
  ].filter(Boolean);

  return (
    <section className="wrap section" id="trial" aria-labelledby="trial-h">
      <div className="trial">
        <div className="trial-copy">
          <h2 id="trial-h">Try Veloce free for a month</h2>
          <ol className="trial-steps">
            {steps.map((s, i) => (
              <li key={s.h}>
                <span className="trial-n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  {s.cta && <div className="trial-cta">{s.cta}</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <TrialForm demoWaUrl={demoWaUrl} />
      </div>
    </section>
  );
}
