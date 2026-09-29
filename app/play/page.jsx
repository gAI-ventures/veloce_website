import Logo from '@/components/Logo';
import Game from '@/components/game/Game';
import './play.css';

export const metadata = {
  title: 'Keep your rating up | Veloce',
  description:
    'A one-minute game for hospitality operators. Route guest complaints from calls, WhatsApp, caretakers and owners, then watch Veloce take over for the last 20 seconds.',
  openGraph: {
    title: 'Keep your rating up | Veloce',
    description: 'A one-minute game about guest complaints across a portfolio of properties.',
    url: 'https://www.veloce7.com/play',
    siteName: 'Veloce',
    type: 'website',
  },
};

export default function PlayPage() {
  return (
    <div className="play-page">
      <header className="play-top wrap">
        <Logo href="/" height={34} />
        <a className="btn btn-quiet btn-sm" href="/">Back to the site</a>
      </header>
      <main className="play wrap">
        <h1 className="sr">Keep your rating up, a Veloce game</h1>
        <Game />
        <p className="fine play-note">The properties, guests and staff in this game are made up.</p>
      </main>
    </div>
  );
}
