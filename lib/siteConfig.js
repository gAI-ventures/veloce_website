// Public destinations. Same variable names as before, so the values already set
// in Vercel keep working. The fallbacks are used when a variable is not set.
export const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL || 'https://main.d3r6z57jqeqvlu.amplifyapp.com/login/';

export const CONTACT_URL =
  process.env.NEXT_PUBLIC_CONTACT_URL || 'https://mail.google.com/mail/?view=cm&fs=1&to=sooraj%40gai.ventures';

export const QUESTION_URL =
  process.env.NEXT_PUBLIC_QUESTION_URL ||
  'https://mail.google.com/mail/?view=cm&fs=1&to=sooraj%40gai.ventures&su=Veloce%20enquiry';

export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || 'https://calendly.com/sooraj-gai/veloce-demo';

export const CONTACT_EMAIL = 'sooraj@gai.ventures';
export const COMPANY_URL = 'https://all-shift.netlify.app/';

// Links that leave the site open in a new tab.
export const ext = { target: '_blank', rel: 'noopener noreferrer' };

export const SOURCES = {
  report: {
    label: 'Guest survey, Smart Meetings, 2019',
    short: 'Guest survey, 2019',
    url: 'https://www.smartmeetings.com/news/121927/study-only-25-of-hotel-guests-report-service-issues',
  },
  jdp2015: {
    label: 'J.D. Power Hotel Guest Satisfaction Index, 2015',
    short: 'J.D. Power, 2015',
    url: 'https://www.prnewswire.com/news-releases/hotel-guest-satisfaction-reaches-all-time-high-incidence-of-problems-hits-record-low-300112394.html',
  },
  jdp2023: {
    label: 'J.D. Power, 2023',
    short: 'J.D. Power, 2023',
    url: 'https://www.hotelmanagement-network.com/news/hotel-staff-guest-satisfaction/',
  },
  cornell: {
    label: 'Cornell Center for Hospitality Research, 2012',
    short: 'Cornell CHR, 2012',
    url: 'https://ecommons.cornell.edu/handle/1813/71194',
  },
};
