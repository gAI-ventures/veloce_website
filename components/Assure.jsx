import { Icon } from './Icons';
import { setupTime } from '@/lib/proof';

// Facts that make booking a call feel low-risk. Shown under the call buttons.
// noChat: the hero already says this in its channel line.
export default function Assure({ noChat = false }) {
  const items = ['No PMS needed, or keep yours'];
  if (!noChat) items.push('Staff use the chat app they already have');
  if (setupTime) items.push(`Live in ${setupTime}`);
  return (
    <ul className="assure">
      {items.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
    </ul>
  );
}
