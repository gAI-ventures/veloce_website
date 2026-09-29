import { Pixelify_Sans } from 'next/font/google';
import Logo from '@/components/Logo';
import Game from '@/components/game/Game';
import './play.css';

const pixel = Pixelify_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--pixel', display: 'swap' });

export const metadata = {
  title: 'Keep your rating up | Veloce',
  description:
    'A two-minute game for hospitality operators. Route guest complaints from calls, WhatsApp, caretakers and owners before they turn into bad reviews.',
  openGraph: {
    title: 'Keep your rating up | Veloce',
    description: 'A two-minute game about guest complaints across a portfolio of properties.',
    url: 'https://www.veloce7.com/play',
    siteName: 'Veloce',
    type: 'website',
  },
};

export default function PlayPage() {
  return (
    <div className={`play-page ${pixel.variable}`}>
      <div className="field" aria-hidden="true"><i className="a1" /><i className="a2" /><i className="a3" /></div>
      <header className="play-top wrap">
        <Logo href="/" height={34} />
        <a className="btn btn-ghost btn-sm" href="/">Back to the site</a>
      </header>
      <main className="play wrap">
        <h1 className="sr">Keep your rating up, a Veloce game</h1>
        <Game />
        <p className="fine play-note">The properties, guests and staff in this game are made up.</p>
      </main>
    </div>
  );
}
