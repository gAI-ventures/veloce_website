import Convergence from './Convergence';
import { Icon } from './Icons';
import { DEMO_URL, ext } from '@/lib/siteConfig';

export default function Hero() {
  return (
    <section className="wrap hero" id="top">
      <div className="hero-copy">
        <h1>Higher ratings, more bookings, less time on operations</h1>
        <p className="lede">Veloce is a hospitality operations platform. It catches guest issues during the stay, gets the right person to fix them, and keeps every property in one place.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
          <a className="btn btn-ghost" href="#gains">See what you'd gain</a>
        </div>
        <ul className="assure">
          <li><Icon name="check" />Works alongside your PMS</li>
          <li><Icon name="check" />Staff work from WhatsApp</li>
        </ul>
      </div>
      <Convergence />
    </section>
  );
}
