const SITE = 'https://www.veloce7.com';

export default function sitemap() {
  return [
    { url: SITE, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/play`, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
