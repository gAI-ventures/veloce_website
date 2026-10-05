import { Hanken_Grotesk, Newsreader } from 'next/font/google';
import './globals.css';
import { CONTACT_EMAIL, COMPANY_URL } from '@/lib/siteConfig';

const SITE = 'https://www.veloce7.com';
const DESCRIPTION =
  'Veloce hears about guest problems while the guest is still there, gets them to the right person, and keeps every property in one place. Higher ratings, more bookings, less time on operations.';

// Structured data for search engines and AI assistants. No prices.
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Veloce',
    url: SITE,
    logo: `${SITE}/logo.png`,
    email: CONTACT_EMAIL,
    parentOrganization: { '@type': 'Organization', name: 'gAI Ventures', url: COMPANY_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Veloce',
    url: SITE,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Hospitality operations platform',
    operatingSystem: 'Web',
    description: DESCRIPTION,
    audience: { '@type': 'BusinessAudience', audienceType: 'Short-term rental, serviced apartment, boutique hotel and villa operators' },
    publisher: { '@type': 'Organization', name: 'gAI Ventures', url: COMPANY_URL },
  },
];

const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });

export const metadata = {
  title: 'Veloce | Hospitality operations platform',
  description: DESCRIPTION,
  metadataBase: new URL(SITE),
  openGraph: {
    title: 'Veloce | Hospitality operations platform',
    description: 'Higher ratings, more bookings, less time on operations.',
    url: SITE,
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
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
