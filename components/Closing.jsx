import { Icon } from './Icons';
import Logo from './Logo';
import { DEMO_URL, LOGIN_URL, CONTACT_URL, QUESTION_URL, CONTACT_EMAIL, COMPANY_URL, ext } from '@/lib/siteConfig';

const FAQS = [
  { q: 'Do my staff need to learn new software?', a: 'No. Caretakers and housekeeping can work from WhatsApp. Managers use a web app for the full picture.' },
  { q: 'Does Veloce replace my PMS?', a: 'No. It works alongside your PMS and channel manager, and handles what happens during the stay.' },
  { q: 'How do guests hear from Veloce?', a: 'A short call or WhatsApp message during their stay. Anything they raise goes to your team, and decisions like refunds stay with you.' },
  { q: 'What does it cost?', a: 'It depends on the number of properties and the channels you use. We share pricing on the call, with an estimate for your portfolio.' },
];

export function Faq() {
  return (
    <section className="wrap section" id="faq" aria-labelledby="faq-h">
      <div className="sec-head center"><h2 id="faq-h">Questions operators ask</h2></div>
      <div className="glass faq">
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}<Icon name="plus" /></summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="wrap contact-sec" id="contact" aria-labelledby="contact-h">
      <div className="cta sheet">
        <div>
          <h2 id="contact-h">Bring one property to a 30-minute call</h2>
          <p>We’ll show you what Veloce would change there and what it’s worth.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
            <a className="btn btn-ghost" href={QUESTION_URL} {...ext}>Email a question</a>
          </div>
        </div>
        <div className="glass contact">
          <span className="av">SK</span><b>Sooraj Kamath</b><small>gAI Ventures</small>
          <ul>
            <li><a href={CONTACT_URL} {...ext}>{CONTACT_EMAIL}</a></li>
            <li>Replies within one business day</li>
            <li>NDA on request</li>
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
        </div>
        <div>
          <h4>Veloce</h4>
          <ul>
            <li><a href="#problem">Why it matters</a></li>
            <li><a href="#helps">How it helps</a></li>
            <li><a href="#gains">Your gains</a></li>
            <li><a href="#faq">FAQ</a></li>
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
