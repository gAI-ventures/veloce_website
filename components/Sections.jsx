import { Icon } from './Icons';
import { SOURCES, ext } from '@/lib/siteConfig';

const PROPERTY_TYPES = [
  'Short-term rentals', 'Serviced apartments', 'Boutique hotels', 'Villa collections', 'Holiday homes',
  'Resorts', 'Heritage stays', 'Aparthotels', 'Guesthouses', 'Homestays', 'Bed and breakfasts',
  'Hostels', 'Corporate housing', 'Co-living spaces', 'Hotel groups',
];

// A slow ticker. The second copy of the list is only there to make the loop seamless.
export function Operators() {
  return (
    <section className="ops" aria-labelledby="ops-h">
      <p className="ops-lead" id="ops-h">Made for the people running</p>
      <div className="ticker">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {PROPERTY_TYPES.map((o) => <li key={o}>{o}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

const TODAY = [
  { t: 'Day 1, 21:40', p: 'Your guest tells the caretaker the AC isn’t cooling.', w: 'Caretaker’s phone', icon: 'user' },
  { t: 'Day 1, 22:05', p: 'The caretaker rings the owner, who says to look at it tomorrow.', w: 'Owner’s phone', icon: 'phone' },
  { t: 'Day 2, 10:15', p: 'Your ops manager spots it in a group chat and asks which room.', w: 'WhatsApp group', icon: 'chat' },
  { t: 'Day 2, 13:30', p: 'The AC technician can’t come until Thursday.', w: 'Vendor call', icon: 'wrench' },
  { t: 'Day 2, 20:10', p: 'The guest complains again, this time at the front desk.', w: 'Front desk', icon: 'loop', again: true },
  { t: 'Day 3, 11:00', p: 'They check out. Nobody ever confirmed a fix.', w: 'Front desk', icon: 'desk' },
  { t: 'Day 10', p: 'A 3-star review: “The AC never worked.”', w: 'Review site', icon: 'star', bad: true },
];

const WITH = [
  { t: 'Day 1, 18:22', p: 'On the check-in call, the guest mentions the AC.', w: 'Voice call', icon: 'phone' },
  { t: '18:24', p: 'It’s logged for Room 401 and sent to Ravi on WhatsApp.', w: 'Veloce', icon: 'chat' },
  { t: '19:06', p: 'Fixed before dinner, and the guest hears back.', w: 'Closed', icon: 'check', good: true },
  { t: 'Day 4', p: 'A 5-star review: “They sorted the AC within the hour.”', w: 'Review site', icon: 'star', good: true },
];

const OUTCOMES = {
  today: ['Average rating drops', 'Fewer bookings', 'Lower occupancy'],
  with: ['Average rating rises', 'More bookings', 'Higher occupancy'],
};

function Lane({ title, meta, items, variant }) {
  const up = variant === 'with';
  return (
    <div className={`lane lane-${variant}`}>
      <div className="lane-head"><h3>{title}</h3><span>{meta}</span></div>
      <ol className="tl">
        {items.map((s) => (
          <li key={s.t} className={s.bad ? 'bad' : s.good ? 'good' : ''}>
            <span className="pin" aria-hidden="true"><Icon name={s.icon} /></span>
            <time>{s.t}</time>
            <p>{s.p}</p>
            <small>{s.again && <Icon name="loop" />}{s.w}</small>
          </li>
        ))}
      </ol>
      <ul className={`outcome ${up ? 'up' : 'down'}`} aria-label={up ? 'What follows with Veloce' : 'What follows today'}>
        {OUTCOMES[variant].map((o) => (
          <li key={o}><Icon name={up ? 'trend' : 'fall'} />{o}</li>
        ))}
      </ul>
    </div>
  );
}

export function Problem() {
  return (
    <section className="wrap section" id="problem" aria-labelledby="problem-h">
      <div className="sec-head split">
        <h2 id="problem-h">A guest problem you hear about late costs you bookings and rate</h2>
        <p className="lede">
          It turns up in a review and lowers your rating. Cornell found each 1% of reputation is worth up to 1.42% in
          revenue per room (<a href={SOURCES.cornell.url} {...ext}>{SOURCES.cornell.short}</a>).
        </p>
      </div>

      <div className="compare" aria-label="The same complaint, today and with Veloce">
        <Lane title="Today" meta="6 handoffs, 10 days" items={TODAY} variant="today" />
        <Lane title="With Veloce" meta="Fixed in 44 minutes" items={WITH} variant="with" />
      </div>
      <p className="fine example">One complaint at one property, as an example.</p>
    </section>
  );
}
