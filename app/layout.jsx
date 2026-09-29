import { Hanken_Grotesk, Newsreader } from 'next/font/google';
import './globals.css';

const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });

export const metadata = {
  title: 'Veloce | Hospitality operations platform',
  description:
    'Veloce hears about guest problems while the guest is still there, gets them to the right person, and keeps every property in one place. Higher ratings, more bookings, less time on operations.',
  metadataBase: new URL('https://www.veloce7.com'),
  openGraph: {
    title: 'Veloce | Hospitality operations platform',
    description: 'Higher ratings, more bookings, less time on operations.',
    url: 'https://www.veloce7.com',
    siteName: 'Veloce',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
