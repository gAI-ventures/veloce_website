import ChatHero from './ChatHero';
import { Icon } from './Icons';
import Assure from './Assure';
import Soc2Badge from './Soc2Badge';
import { DEMO_URL, ext } from '@/lib/siteConfig';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-panel">
          <div className="hero-copy">
            <div className="hero-badges">
              <Soc2Badge tone="dark" className="hero-soc2" />
              <span className="wa-pill"><Icon name="chat" />Now native to WhatsApp</span>
            </div>
            <h1>Better ratings, repeat stays and referrals, run from WhatsApp</h1>
            <p className="lede">
              Veloce is a hospitality operations platform that works inside WhatsApp. Your guests, staff and owners
              use the chat they already have, and Veloce fixes issues, runs bookings and keeps your books.
            </p>
            <div className="cta-row">
              <a className="btn btn-light" href="#trial">Start your free month</a>
              <a className="btn btn-on-dark" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
            </div>
            <Assure />
            <p className="hero-trust"><Icon name="chat" />Works in the WhatsApp your guests and team already use</p>
          </div>
          <div className="hero-ui">
            <ChatHero />
          </div>
        </div>
      </div>
    </section>
  );
}
