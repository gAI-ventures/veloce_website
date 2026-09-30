import Convergence from './Convergence';
import { Icon } from './Icons';
import Soc2Badge from './Soc2Badge';
import { DEMO_URL, ext } from '@/lib/siteConfig';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-panel">
          <div className="hero-copy">
            <Soc2Badge tone="dark" className="hero-soc2" />
            <h1>Higher ratings, more bookings, less time on operations</h1>
            <p className="lede">
              Veloce is a hospitality operations platform. It hears about the broken AC while your guest is still in
              the room, gets it to the right person, and keeps all your properties in one place.
            </p>
            <div className="cta-row">
              <a className="btn btn-light" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
              <a className="btn btn-on-dark" href="#gains">See what you'd gain</a>
            </div>
            <ul className="assure">
              <li><Icon name="check" />Works alongside your PMS</li>
              <li><Icon name="check" />Your staff stay on WhatsApp</li>
            </ul>
          </div>
          <div className="hero-ui">
            <Convergence />
          </div>
        </div>
      </div>
    </section>
  );
}
