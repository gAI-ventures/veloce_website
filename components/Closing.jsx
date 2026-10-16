import { Icon } from './Icons';
import Logo from './Logo';
import Soc2Badge from './Soc2Badge';
import { DEMO_URL, LOGIN_URL, CONTACT_URL, QUESTION_URL, CONTACT_EMAIL, COMPANY_URL, ext } from '@/lib/siteConfig';
import { FAQS } from '@/lib/faq';
import { whatsappUrl } from '@/lib/proof';

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
      <div className="cta cta-center">
        <p className="eyebrow eyebrow-dark">Ready when you are</p>
        <h2 id="contact-h">Run every home from one WhatsApp thread</h2>
        <p>Free for your first month. We set up your first homes within a working day.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#trial">Start your free month</a>
          <a className="btn btn-on-dark" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
          {whatsappUrl && <a className="btn btn-on-dark" href={whatsappUrl} {...ext}>Message us on WhatsApp</a>}
        </div>
        <p className="cta-mail">Or email <a href={CONTACT_URL} {...ext}>{CONTACT_EMAIL}</a>. Sooraj replies within a working day. NDA on request.</p>
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
          <p>A hospitality operations platform that runs on WhatsApp: guest messages, maintenance, housekeeping, bookings and finance.</p>
          <p className="fine">Built by <a href={COMPANY_URL} {...ext}>gAI Ventures</a></p>
          <Soc2Badge className="foot-soc2" />
        </div>
        <div>
          <h4>Veloce</h4>
          <ul>
            <li><a href="#loop">The loop</a></li>
            <li><a href="#maintenance">Maintenance</a></li>
            <li><a href="#housekeeping">Housekeeping</a></li>
            <li><a href="#finance">Finance</a></li>
            <li><a href="#platform">Platform</a></li>
            <li><a href="#compare">Why Veloce</a></li>
            <li><a href="#gains">See the impact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/play">Play the game</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li><a href="#trial">Start your free month</a></li>
            <li><a href={DEMO_URL} {...ext}>Book a call</a></li>
            <li><a href={CONTACT_URL} {...ext}>Email Sooraj</a></li>
            {whatsappUrl && <li><a href={whatsappUrl} {...ext}>WhatsApp</a></li>}
            <li><a href={LOGIN_URL}>Log in</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bar"><span>&copy; 2026 gAI Ventures</span><a href={CONTACT_URL} {...ext}>{CONTACT_EMAIL}</a></div>
    </footer>
  );
}
