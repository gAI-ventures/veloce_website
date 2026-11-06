import { Icon } from './Icons';
import { setupTime } from '@/lib/proof';

// Facts that make booking a call feel low-risk. Shown under the call buttons.
// noWhatsapp: the hero already says this in its WhatsApp line.
export default function Assure({ noWhatsapp = false }) {
  const items = ['No PMS needed, or keep yours'];
  if (!noWhatsapp) items.push('Staff use WhatsApp, no new app');
  if (setupTime) items.push(`Live in ${setupTime}`);
  return (
    <ul className="assure">
      {items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
    </ul>
  );
}
