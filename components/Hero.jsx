import ChannelMockups from './ChannelMockups';
import Assure from './Assure';
import Soc2Badge from './Soc2Badge';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-panel">
          <div className="hero-copy">
            <Soc2Badge tone="light" className="hero-soc2" />
            <h1>Higher ratings, more bookings, less time on operations</h1>
            <p className="lede">
              Veloce is a hospitality operations platform. It hears about the broken AC while your guest is still in
              the room, gets it to the right person, and keeps all your properties in one place.
            </p>
            <p className="chan-line">
              Your staff and guests reach Veloce on WhatsApp or iMessage, and you see everything in the web app.
              Nothing to install for your team.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#trial">Start your free month</a>
            </div>
            <p className="cta-note">Setup takes a day. We load your properties and staff numbers with you on a 30-minute call.</p>
            <Assure noChat />
          </div>
          <div className="hero-ui">
            <ChannelMockups />
          </div>
        </div>
      </div>
    </section>
  );
}
