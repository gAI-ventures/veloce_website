import { Hanken_Grotesk, Newsreader } from 'next/font/google';
import './globals.css';
import { CONTACT_EMAIL } from '@/lib/siteConfig';

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
    parentOrganization: { '@type': 'Organization', name: 'gAI Ventures' },
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
    publisher: { '@type': 'Organization', name: 'gAI Ventures' },
  },
];

// Meta Pixel (Facebook ads). Loads in the head and records a PageView on every page load.
const META_PIXEL_ID = '2765120437215374';
const metaPixel = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;
const metaPixelNoscript = `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: metaPixel }} />
        {/* Raw HTML so Next.js does not turn the image into a preload, which would send a second PageView. */}
        <noscript dangerouslySetInnerHTML={{ __html: metaPixelNoscript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
