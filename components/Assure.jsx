import { Icon } from './Icons';
import { setupTime } from '@/lib/proof';

// Facts that make booking a call feel low-risk. Shown under the call buttons.
export default function Assure() {
  const items = ['Works alongside your PMS', 'Staff use WhatsApp, no new app'];
  if (setupTime) items.push(`Live in ${setupTime}`);
  return (
    <ul className="assure">
      {items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
    </ul>
  );
}
