// Real proof for the site. The only place these values live.
//
// Rules:
// - Only our own measured data goes here. Never estimates, never rounded-up hopes.
// - No customer names or logos. Describe customers anonymously.
// - Anything left empty does not render at all. Leave a value empty rather than guess.

// How long a new operator takes to go live, e.g. '7 days'.
// When set, "Live in 7 days" is added to the reassurance list under the call buttons.
export const setupTime = '';

// Up to 3 measured product numbers, shown as large figures under the hero.
// value: the number as it should read, e.g. '6 min', '82%', '11 hrs'
// label: what it measures, in a few words, e.g. 'Median time from complaint to ticket'
// note:  where it comes from, e.g. 'Across 40 units, March to May 2026'
// Example: { value: '6 min', label: 'Median time from complaint to ticket', note: 'Across 40 units, March to May 2026' }
export const metrics = [];

// One anonymous before and after story. Leave as null to hide it.
// descriptor: who it is, without a name, e.g. 'A serviced-apartment operator in Bengaluru, 40 units'
// beforeAfter: up to 3 rows, e.g. { label: 'Average guest rating', before: '4.2', after: '4.6' }
// quote: optional, the operator's own words, unattributed. Use '' to leave it out.
export const caseStudy = null;

// A wa.me link, e.g. 'https://wa.me/919800000000'. The NEXT_PUBLIC_WHATSAPP_URL variable in Vercel wins if set.
// When empty, every "Message us on WhatsApp" button and the footer WhatsApp link disappear.
export const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || '';

// Only filled-in items count.
export const shownMetrics = metrics.filter((m) => m && m.value && m.label).slice(0, 3);
export const shownCase =
  caseStudy && caseStudy.descriptor && (caseStudy.beforeAfter || []).some((r) => r.label && r.before && r.after)
    ? { ...caseStudy, beforeAfter: caseStudy.beforeAfter.filter((r) => r.label && r.before && r.after).slice(0, 3) }
    : null;
