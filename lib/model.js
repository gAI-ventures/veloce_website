// Savings model. Pure function so it can be tested and reused.
export const CURRENCIES = {
  EUR: { locale: 'en-IE', adr: 110, min: 40, max: 400, step: 5, rate: 25 },
  USD: { locale: 'en-US', adr: 140, min: 50, max: 500, step: 5, rate: 30 },
  AED: { locale: 'en-AE', adr: 550, min: 150, max: 2500, step: 25, rate: 90 },
  INR: { locale: 'en-IN', adr: 4500, min: 1500, max: 20000, step: 250, rate: 400 },
};

export const DEFAULT_ASSUMPTIONS = {
  issue: 14,     // % of stays with a problem (J.D. Power 2023: 86% had none)
  report: 25,    // % of problems guests report unprompted (2019 survey)
  capture: 80,   // % of problems caught with Veloce (our estimate)
  gap: 1.2,      // rating points lost on a stay with an unfixed problem (our estimate)
  elas: 1.42,    // % RevPAR per 1% reputation (Cornell CHR 2012)
  retFix: 42,    // % who return after a fixed problem (2019 survey)
  retNo: 4,      // % who return after an unfixed problem (J.D. Power 2015)
  hIss: 1.5,     // hours chasing each issue today (our estimate)
  hIssV: 0.3,    // hours per issue with Veloce (our estimate)
  hProp: 3,      // coordination hours per property per month today (our estimate)
  hPropV: 1,     // with Veloce (our estimate)
  rate: 25,      // cost of an hour of ops time, in the selected currency
  stay: 3,       // average nights per stay
};

export function computeModel({ properties, adr, occupancy, rating }, a) {
  const occ = occupancy / 100;
  const stay = Math.max(1, a.stay);
  const issue = a.issue / 100;
  const report = a.report / 100;
  const capture = Math.max(report, a.capture / 100);

  const nights = properties * 365 * occ;
  const stays = nights / stay;
  const problemStays = stays * issue;

  const ratingLift = Math.min(4.95 - rating, issue * (capture - report) * a.gap);
  const reputationPct = (ratingLift / rating) * 100;
  const revparPct = a.elas * reputationPct;
  const occWith = Math.min(0.99, occ * (1 + 0.0054 * reputationPct));

  const revenue = nights * adr;
  const revenueWith = revenue * (1 + revparPct / 100);

  const returned = problemStays * (report * a.retFix / 100 + (1 - report) * a.retNo / 100);
  const returnedWith = problemStays * (capture * a.retFix / 100 + (1 - capture) * a.retNo / 100);

  const perMonth = problemStays / 12;
  const hours = perMonth * a.hIss + properties * a.hProp;
  const hoursWith = perMonth * a.hIssV + properties * a.hPropV;
  const hoursSaved = Math.max(0, hours - hoursWith);

  const revenueGain = Math.max(0, revenueWith - revenue);
  const timeValue = hoursSaved * 12 * a.rate;

  return {
    problemStays,
    caught: problemStays * report,
    caughtWith: problemStays * capture,
    rating,
    ratingWith: rating + ratingLift,
    ratingLift,
    occ,
    occWith,
    revenue,
    revenueWith,
    revparPct,
    returned,
    returnedWith,
    hours,
    hoursWith,
    hoursSaved,
    revenueGain,
    timeValue,
    total: revenueGain + timeValue,
    fte: hoursSaved / 160,
  };
}
