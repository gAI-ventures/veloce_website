// Free trial settings. Values that change per deployment come from Vercel environment variables.

// The demo agent's WhatsApp number, digits only with country code, e.g. 919800000000.
// When empty, the "Try it on WhatsApp" step is hidden and the trial form still works.
const DEMO_WA_NUMBER = (process.env.NEXT_PUBLIC_DEMO_WA_NUMBER || '').replace(/\D/g, '');

// The message a visitor sends the demo agent, prefilled so they only have to press send.
export const DEMO_WA_TEXT =
  process.env.NEXT_PUBLIC_DEMO_WA_TEXT || 'Hi, the AC in my room isn’t cooling.';

export const demoWaUrl = DEMO_WA_NUMBER
  ? `https://wa.me/${DEMO_WA_NUMBER}?text=${encodeURIComponent(DEMO_WA_TEXT)}`
  : '';

// Trial signups are emailed to sooraj@gai.ventures through FormSubmit, straight from the visitor's browser.
// The id below stands in for the email address so it isn't exposed in the page. Activated for https://www.veloce7.com/.
// A new domain (for example a Vercel preview) needs one activation: the first signup from it sends an
// "Activate Form" email to sooraj@gai.ventures.
const FORM_ID = process.env.NEXT_PUBLIC_TRIAL_FORM_ID || '38f835756bbbb2e0d9f6a64d36788f1a';
export const TRIAL_FORM_URL = `https://formsubmit.co/ajax/${FORM_ID}`;

export const TRIAL = {
  length: 'a month',
  setup: 'within a working day',
};

// Fields on the trial form. Kept short on purpose.
export const UNIT_BANDS = ['1 to 9', '10 to 29', '30 to 59', '60 to 150', 'More than 150'];
export const CURRENT_TOOLS = ['Spreadsheets and WhatsApp groups', 'A PMS', 'A PMS and other tools', 'Something else'];
