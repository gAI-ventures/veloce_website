import { Icon } from './Icons';
import { setupTime } from '@/lib/proof';

// Facts that make starting feel low-risk. Shown under the hero and contact buttons.
export default function Assure() {
  const items = ['No PMS needed', 'Staff stay on WhatsApp, no new app', 'First month free'];
  if (setupTime) items.push(`Live in ${setupTime}`);
  return (
    <ul className="assure">
      {items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
    </ul>
  );
}
