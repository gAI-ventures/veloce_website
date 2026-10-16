// Free trial signups. Forwards the form to TRIAL_WEBHOOK_URL (a Google Apps Script web app that writes
// to a Sheet and emails the team; see scripts/trial-signup.gs). Without the variable it returns 503 and
// the form falls back to a prefilled email, so no signup is lost.

const MAX = 200;
const clean = (v) => String(v ?? '').trim().slice(0, MAX);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: people leave this empty.
  if (clean(body.company)) return Response.json({ ok: true });

  const signup = {
    name: clean(body.name),
    whatsapp: clean(body.whatsapp),
    email: clean(body.email),
    units: clean(body.units),
    tools: clean(body.tools),
    page: clean(body.page),
    at: new Date().toISOString(),
  };

  if (!signup.name || !signup.whatsapp || !/^\S+@\S+\.\S+$/.test(signup.email)) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const url = process.env.TRIAL_WEBHOOK_URL;
  if (!url) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...signup, secret: process.env.TRIAL_WEBHOOK_SECRET || '' }),
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (err) {
    console.error('trial webhook failed', err);
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
