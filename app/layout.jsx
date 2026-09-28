import './globals.css';

export const metadata = {
  title: 'Veloce | Hospitality operations platform',
  description:
    'Veloce catches guest issues during the stay, gets the right person to fix them, and keeps every property in one place. Higher ratings, more bookings, less time on operations.',
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
  themeColor: '#E8ECE5',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
