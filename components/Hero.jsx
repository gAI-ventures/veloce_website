import Convergence from './Convergence';
import { DEMO_URL, ext } from '@/lib/siteConfig';

export default function Hero() {
  return (
    <section className="wrap hero" id="top">
      <div className="hero-copy">
        <p className="kicker">Hospitality operations platform</p>
        <h1>Higher ratings, more bookings, less time on operations</h1>
        <p className="lede">Veloce catches guest issues during the stay, gets the right person to fix them, and keeps every property in one place.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
          <a className="btn btn-ghost" href="#gains">See what you'd gain</a>
        </div>
      </div>
      <Convergence />
    </section>
  );
}
