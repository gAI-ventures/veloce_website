'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

/**
 * Product concept screenshots — three mockups you can tab between.
 * Each is a hand-built HTML/CSS "screenshot" of one screen you'd
 * genuinely use if Veloce were running against your property. Not the
 * five little pipeline demo cards — larger, whole-page-feel views.
 */

const TABS = [
  { id: 'fleet', label: 'Fleet health' },
  { id: 'call',  label: 'Call · captured' },
  { id: 'brief', label: 'Morning brief' },
]

export default function ProductPeek() {
  const [active, setActive] = useState('fleet')
  const introRef = useReveal()
  const frameRef = useReveal()

  return (
    <section className="pad">
      <div className="wrap">
        <div className="reveal" ref={introRef} style={{ maxWidth: 720 }}>
          <div className="kicker">concept screens</div>
          <h2 className="sec-h">
            What it looks like when Veloce is <b>actually running</b>.
          </h2>
          <p className="sec-lede">
            Three views from the app. A fleet-wide health board for the person running multiple properties, one captured call end to end, and the morning brief that lands before anyone at your properties has walked in.
          </p>
        </div>

        <div className="peek-frame reveal" ref={frameRef}>
          <div className="peek-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                className={`peek-tab ${active === t.id ? 'on' : ''}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="peek-body">
            {active === 'fleet' && <FleetScreen />}
            {active === 'call'  && <CallScreen />}
            {active === 'brief' && <BriefScreen />}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ SCREEN 1 · fleet health ============ */
function FleetScreen() {
  const properties = [
    { name: 'Casa Blanca · Lisbon',    rooms: 42, calls: 68, tickets: 3, chronic: 0, health: 'green'  },
    { name: 'Urban Nest · Bangalore',  rooms: 30, calls: 47, tickets: 8, chronic: 2, health: 'amber'  },
    { name: 'Villa Cielo · Tulum',     rooms: 18, calls: 24, tickets: 1, chronic: 0, health: 'green'  },
    { name: 'The Yard · Brooklyn',     rooms: 24, calls: 39, tickets: 5, chronic: 1, health: 'amber'  },
    { name: 'Marmara Suites · Bodrum', rooms: 56, calls: 91, tickets:14, chronic: 3, health: 'red'    },
  ]
  return (
    <>
      <div className="peek-appbar">
        <div className="peek-appbar-l">
          <span className="peek-crumb">Fleet</span>
          <span className="peek-sep">/</span>
          <span className="peek-here">All properties</span>
        </div>
        <div className="peek-appbar-r">
          <span className="peek-live"><span className="peek-livedot" /> live</span>
          <span className="peek-user">MK</span>
        </div>
      </div>
      <div className="peek-fleet-kpis">
        <FKpi k="Properties" v="5" note="3 countries" />
        <FKpi k="Rooms live" v="170" note="all in-house today" />
        <FKpi k="Calls · 24h" v="269" note="204 outbound · 65 inbound" tone="mint" />
        <FKpi k="Open tickets" v="31" note="6 severity=high" tone="amber" />
        <FKpi k="Chronic flags" v="6" note="↑2 vs last week" tone="red" />
      </div>
      <div className="peek-table">
        <div className="peek-th">
          <span>Property</span>
          <span>Rooms</span>
          <span>Calls · 24h</span>
          <span>Open</span>
          <span>Chronic</span>
          <span>Health</span>
        </div>
        {properties.map((p, i) => (
          <div className="peek-tr" key={i}>
            <span className="peek-tname">{p.name}</span>
            <span>{p.rooms}</span>
            <span>{p.calls}</span>
            <span>{p.tickets}</span>
            <span>{p.chronic}</span>
            <span><span className={`peek-dot peek-dot-${p.health}`} /></span>
          </div>
        ))}
      </div>
    </>
  )
}

function FKpi({ k, v, note, tone }) {
  return (
    <div className={`peek-kpi ${tone ? `peek-kpi-${tone}` : ''}`}>
      <div className="peek-kpi-k">{k}</div>
      <div className="peek-kpi-v">{v}</div>
      <div className="peek-kpi-n">{note}</div>
    </div>
  )
}

/* ============ SCREEN 2 · call captured ============ */
function CallScreen() {
  return (
    <>
      <div className="peek-appbar">
        <div className="peek-appbar-l">
          <span className="peek-crumb">Casa Blanca · Lisbon</span>
          <span className="peek-sep">/</span>
          <span className="peek-here">Calls</span>
          <span className="peek-sep">/</span>
          <span className="peek-here">C-8821</span>
        </div>
        <div className="peek-appbar-r">
          <span className="peek-user">MK</span>
        </div>
      </div>
      <div className="peek-call-grid">
        <div className="peek-call-l">
          <div className="peek-call-head">
            <div>
              <div className="peek-call-guest">Isabel Ferreira · Room 214</div>
              <div className="peek-call-meta">outbound · check-in day · 15:04 WET · Portuguese</div>
            </div>
            <div className="peek-call-dur">01:32</div>
          </div>
          <div className="peek-transcript">
            <div className="peek-msg"><span className="peek-who peek-a">AI</span><span>Olá Isabel, aqui é a Veloce a ligar do Casa Blanca. Já se instalou bem no quarto 214?</span></div>
            <div className="peek-msg"><span className="peek-who peek-g">GST</span><span>Sim, obrigada. Mas <mark>o ar condicionado está a fazer um barulho estranho</mark>, um zumbido.</span></div>
            <div className="peek-msg"><span className="peek-who peek-a">AI</span><span>Compreendo, um zumbido no ar condicionado. Desde quando é que reparou?</span></div>
            <div className="peek-msg"><span className="peek-who peek-g">GST</span><span>Desde que cheguei. Consigo dormir, mas é irritante.</span></div>
            <div className="peek-msg"><span className="peek-who peek-a">AI</span><span>Vou marcar isto como prioridade média e alguém vem ver ainda hoje.</span></div>
          </div>
        </div>
        <div className="peek-call-r">
          <div className="peek-panel-h">Captured</div>
          <div className="peek-ticket">
            <div className="peek-ticket-head">
              <span>T-4809 · 15:06</span>
              <span className="peek-sev peek-sev-m">MED</span>
            </div>
            <PeekRow k="room"     v="214" />
            <PeekRow k="guest"    v="Isabel Ferreira" />
            <PeekRow k="asset"    v="AC" mint />
            <PeekRow k="category" v="noise" mint />
            <PeekRow k="issue"    v="humming since check-in" />
            <PeekRow k="sentiment" v="mild irritation" />
          </div>
          <div className="peek-panel-h" style={{marginTop:20}}>Then</div>
          <div className="peek-then">
            <div className="peek-thenrow"><span className="peek-thendot" />Housekeeping tech assigned</div>
            <div className="peek-thenrow"><span className="peek-thendot" />Front desk cc'd on the ticket</div>
            <div className="peek-thenrow"><span className="peek-thendot" />SLA clock started · 4h</div>
          </div>
        </div>
      </div>
    </>
  )
}
function PeekRow({ k, v, mint }) {
  return (
    <div className="peek-tk-row">
      <div className="peek-tk-k">{k}</div>
      <div className={`peek-tk-v ${mint ? 'mint' : ''}`}>{v}</div>
    </div>
  )
}

/* ============ SCREEN 3 · morning brief ============ */
function BriefScreen() {
  return (
    <>
      <div className="peek-appbar">
        <div className="peek-appbar-l">
          <span className="peek-crumb">Casa Blanca · Lisbon</span>
          <span className="peek-sep">/</span>
          <span className="peek-here">Morning brief · 07:00 WET</span>
        </div>
        <div className="peek-appbar-r">
          <span className="peek-user">MK</span>
        </div>
      </div>
      <div className="peek-brief">
        <h3 className="peek-brief-h">Overnight · Tue, 18 Aug 2026</h3>
        <p className="peek-brief-p">
          Twelve outbound calls made, all answered. Three inbound calls picked up between midnight and 05:00. Two new tickets, neither high severity. One chronic flag cleared. Occupancy 88%. The plumbing issue in 312 was resolved and the guest confirmed on the check-out call.
        </p>

        <div className="peek-brief-band">
          <div className="peek-band-k">
            <div className="peek-band-lbl">Needs your eyes</div>
            <div className="peek-band-item"><b>Room 214.</b> AC noise, ongoing. Housekeeping tech went in at 16:12 yesterday, ticket still open. Guest departing tomorrow.</div>
            <div className="peek-band-item"><b>Room 407.</b> Guest raised the wifi twice in three days. Chronic flag fired. Router replacement recommended.</div>
          </div>
          <div className="peek-band-k">
            <div className="peek-band-lbl">Going well</div>
            <div className="peek-band-item"><b>Reviews.</b> Three new reviews overnight, all 5-star. Two mention the front desk by name.</div>
            <div className="peek-band-item"><b>Checkout calls.</b> 8 of 9 answered. Average call length 1m14s. No new complaints raised.</div>
          </div>
        </div>

        <div className="peek-brief-foot">
          <div className="peek-brief-stat"><span className="peek-brief-num">12</span> outbound calls</div>
          <div className="peek-brief-stat"><span className="peek-brief-num">3</span> inbound calls</div>
          <div className="peek-brief-stat"><span className="peek-brief-num">2</span> new tickets</div>
          <div className="peek-brief-stat"><span className="peek-brief-num" style={{color:'var(--mint)'}}>1</span> chronic cleared</div>
        </div>
      </div>
    </>
  )
}
