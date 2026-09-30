import { Icon } from './Icons';
import Logo from './Logo';
import Soc2Badge from './Soc2Badge';
import { DEMO_URL, LOGIN_URL, CONTACT_URL, QUESTION_URL, CONTACT_EMAIL, COMPANY_URL, ext } from '@/lib/siteConfig';

const FAQS = [
  { q: 'Do my staff need to learn new software?', a: 'No. Caretakers and housekeepers keep using WhatsApp. Managers get a web app with the full picture.' },
  { q: 'Does Veloce replace my PMS?', a: 'No. It sits alongside your PMS and channel manager and looks after what happens during the stay.' },
  { q: 'How do guests hear from Veloce?', a: 'A short call or WhatsApp message during their stay. Whatever they raise goes to your team, and things like refunds are still your call.' },
  { q: 'What does it cost?', a: 'It depends on how many properties you have and which channels you use. We’ll share pricing on the call, with an estimate for your portfolio.' },
];

export function Faq() {
  return (
    <section className="wrap section" id="faq" aria-labelledby="faq-h">
      <div className="faq-grid">
        <div className="faq-head">
          <h2 id="faq-h">Questions operators ask</h2>
          <p>Something else on your mind? <a href={QUESTION_URL} {...ext}>Email a question</a> and Sooraj will get back to you within a working day.</p>
        </div>
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<Icon name="plus" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="wrap contact-sec" id="contact" aria-labelledby="contact-h">
      <div className="cta">
        <div>
          <h2 id="contact-h">Bring one property to a 30-minute call</h2>
          <p>We’ll walk through what Veloce would change there and what it’s worth to you.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
            <a className="btn btn-on-dark" href={QUESTION_URL} {...ext}>Email a question</a>
          </div>
        </div>
        <div className="contact">
          <span className="av">SK</span><b>Sooraj Kamath</b><small>gAI Ventures</small>
          <ul>
            <li><a href={CONTACT_URL} {...ext}>{CONTACT_EMAIL}</a></li>
            <li>Replies within a working day</li>
            <li>NDA on request</li>
            <li>SOC 2 Type II compliant</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <div>
          <Logo height={38} />
          <p>A hospitality operations platform for maintenance, housekeeping and guest engagement.</p>
          <p className="fine">Built by <a href={COMPANY_URL} {...ext}>gAI Ventures</a></p>
          <Soc2Badge className="foot-soc2" />
        </div>
        <div>
          <h4>Veloce</h4>
          <ul>
            <li><a href="#problem">Why it matters</a></li>
            <li><a href="#helps">How it helps</a></li>
            <li><a href="#gains">See the impact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/play">Play the game</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li><a href={DEMO_URL} {...ext}>Book a call</a></li>
            <li><a href={CONTACT_URL} {...ext}>Email Sooraj</a></li>
            <li><a href={LOGIN_URL}>Log in</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bar"><span>&copy; 2026 gAI Ventures</span><a href={CONTACT_URL} {...ext}>{CONTACT_EMAIL}</a></div>
    </footer>
  );
}
