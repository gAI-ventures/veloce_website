import { NextResponse } from 'next/server'

/**
 * Mock endpoint for the hero "Ask Veloce" widget. Returns a canned answer
 * for a known question, or a preview-mode message for anything else.
 *
 * Replace the body of this handler with a real call to your backend when
 * ready — the client component in components/AskVeloce.jsx does not need
 * to change, because it hits `/api/ask` via TanStack Query either way.
 */

const CANNED = {
  'which rooms had the most ac issues in july?': {
    out: '3 rooms carried more than one open AC ticket in July. **Rm 401** (4 tickets, chronic), **Rm 305** (2 tickets), **Rm 218** (2, reopened). Together 8 tickets across 6 guests.',
    src: 'source · tickets WHERE asset=AC AND created BETWEEN 2026-07-01 AND 2026-07-31',
  },
  'how many in-house calls did we make yesterday?': {
    out: '**21 outbound calls** to in-house guests. 18 answered, 3 unreachable. 4 calls generated a new ticket. Longest call 3m22s (Rm 512, plumbing).',
    src: 'source · voice_calls WHERE direction=outbound AND date=yesterday',
  },
  'what did room 401 complain about this stay?': {
    out: '**Rm 401 · Rohan Mehta.** One issue captured this stay: **AC not cooling**, raised on the mid-stay call at 14:22. Marked chronic (fourth AC ticket for this room in 14 days). Fix in progress.',
    src: 'source · tickets WHERE reservation=R-8891',
  },
}

const PREVIEW = {
  out: 'This is a preview. Real answers pull from your PMS, your ticket store and your call history. Book a demo below and we\'ll wire it against your data.',
  src: 'preview mode',
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const q = (body?.q ?? '').trim().toLowerCase()

  // simulate a little network latency so the loading state is visible
  await new Promise((r) => setTimeout(r, 350))

  const match =
    CANNED[q] ||
    Object.entries(CANNED).find(([key]) => q.length > 8 && key.includes(q))?.[1] ||
    PREVIEW

  return NextResponse.json(match)
}
