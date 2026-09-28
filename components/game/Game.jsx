'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createGame, step, rating, answer, dispatch, decide, activatePower, canDispatch, timeLeft, live,
  W, H, DURATION, POWER_AT, PROPS, CHANNELS, ROLES, WIN_RATING,
} from '@/lib/game/engine';
import { drawBackground, drawFrame, propAt, ICONS, ICON_COLOR, MARK, COLORS, LOOK } from '@/lib/game/draw';
import { createMusic } from '@/lib/game/music';
import { DEMO_URL, ext } from '@/lib/siteConfig';

// ---------- small pixel pieces for the DOM ----------
function Pixels({ rows, colors, scale = 3, label }) {
  const w = rows[0].length;
  const h = rows.length;
  const rects = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch !== '.') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[ch] || colors['#']} />);
    });
  });
  return (
    <svg
      className="px"
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {rects}
    </svg>
  );
}

function IssueIcon({ name, scale = 3 }) {
  const cols = ICON_COLOR[name] || [COLORS.ink];
  return <Pixels rows={ICONS[name]} colors={{ '#': cols[0], o: cols[1] || cols[0] }} scale={scale} />;
}

function VeloceMark({ scale = 2 }) {
  return <Pixels rows={MARK} colors={{ a: COLORS.mark1, b: COLORS.mark2, '#': COLORS.brand }} scale={scale} />;
}

const PERSON = ['.hhh.', '.sss.', '.sss.', 'bbbbb', 'bbbbb', 'bbbbb', '.l.l.', '.l.l.', '.l.l.'];
function Avatar({ s }) {
  const look = LOOK[s.role];
  return (
    <Pixels
      rows={PERSON}
      colors={{ h: s.id === 'c2' ? COLORS.amber2 : COLORS.hair, s: COLORS.skin, b: look.body, l: look.legs }}
      scale={3}
    />
  );
}

const CHANNEL_ICON = { call: 'phone', whatsapp: 'chat', caretaker: 'key', owner: 'clock' };
function channelIcon(ch) {
  if (ch === 'caretaker' || ch === 'owner') return null;
  return CHANNEL_ICON[ch];
}

const first = (name) => name.split(' ').pop();
const fmtTime = (s) => {
  const v = Math.max(0, Math.ceil(s));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`;
};
const fmtRating = (r) => (Math.floor(r * 10 + 1e-9) / 10).toFixed(1);

function Stars({ value }) {
  return (
    <span className="g-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="g-star">
            <span style={{ width: `${Math.round(fill * 100)}%` }} />
          </span>
        );
      })}
    </span>
  );
}

function staffStatus(g, s) {
  if (s.state === 'going') return 'On the way';
  if (s.state === 'fixing') return 'Fixing';
  if (s.state === 'wrong') return 'Wrong job';
  if (s.state === 'returning') return 'Coming back';
  if (s.queue.length) return `${s.queue.length} queued`;
  return canDispatch(g, s) ? 'Ready' : 'Busy';
}

function ticketStatus(g, tk) {
  const s = tk.staffId && g.staff.find((x) => x.id === tk.staffId);
  if (!tk.answered) return 'Tap to answer';
  if (tk.role === 'owner') return 'Needs you. Tap to approve';
  if (tk.status === 'queued') return `Veloce sent this to ${first(s.name)}`;
  if (tk.status === 'assigned') return g.veloce && tk.told ? `Veloce sent ${first(s.name)}, guest told` : `${first(s.name)} is on the way`;
  if (tk.status === 'fixing') return `${first(s.name)} is fixing it`;
  return 'Who should fix this?';
}

// ---------- the game ----------
export default function Game() {
  const [phase, setPhase] = useState('start'); // start, play, paused, over
  const [, setFrame] = useState(0);
  const [selTicket, setSelTicket] = useState(null);
  const [selStaff, setSelStaff] = useState(null);
  const [toast, setToast] = useState(null);
  const [banner, setBanner] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const gRef = useRef(null);
  const uiRef = useRef({ selectedTicket: null, selectedStaff: null, pops: [], reduced: false });
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const workRef = useRef(null);
  const toastTimer = useRef(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const musicRef = useRef(null);
  const soundRef = useRef(soundOn);
  soundRef.current = soundOn;

  const sfx = useCallback((kind) => {
    if (soundRef.current && musicRef.current) musicRef.current.sfx(kind);
  }, []);

  uiRef.current.selectedTicket = selTicket;
  uiRef.current.selectedStaff = selStaff;

  const say = useCallback((text) => {
    setToast({ text, id: Math.random() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  // Offscreen canvases: one for the static background, one for the frame.
  useEffect(() => {
    uiRef.current.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bg = document.createElement('canvas');
    bg.width = W;
    bg.height = H;
    drawBackground(bg.getContext('2d'));
    bgRef.current = bg;
    const work = document.createElement('canvas');
    work.width = W;
    work.height = H;
    workRef.current = work;
    gRef.current = createGame();
    paint(performance.now());
    try {
      if (window.localStorage.getItem('veloce-game-sound') === 'off') setSoundOn(false);
    } catch (e) {
      // Storage can be blocked; sound stays on.
    }
    return () => {
      clearTimeout(toastTimer.current);
      if (musicRef.current) musicRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paint = useCallback((now) => {
    const canvas = canvasRef.current;
    const work = workRef.current;
    if (!canvas || !work || !gRef.current) return;
    const wctx = work.getContext('2d');
    drawFrame(wctx, bgRef.current, gRef.current, uiRef.current, now);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(work, 0, 0, canvas.width, canvas.height);
  }, []);

  // Keep the canvas backing store matched to its on-screen size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(W, Math.round(canvas.clientWidth * dpr));
      canvas.width = w;
      canvas.height = Math.round((w * H) / W);
      paint(performance.now());
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [paint]);

  // Main loop.
  useEffect(() => {
    if (phase !== 'play') return undefined;
    let raf;
    let last = performance.now();
    let lastUi = 0;
    let unlocked = gRef.current.unlocked;
    const loop = (now) => {
      const g = gRef.current;
      step(g, (now - last) / 1000);
      last = now;

      for (const e of g.events) {
        if (e.type === 'review') {
          uiRef.current.pops.push({ ...e, born: now });
          if (e.stars >= 4) sfx('good');
          else if (e.stars <= 2) sfx('bad');
        } else if (e.type === 'wrong') {
          sfx('wrong');
          const s = g.staff.find((x) => x.id === e.staffId);
          say(`${first(s.name)} went to ${PROPS[e.prop].name}, but it is not their job`);
        } else if (e.type === 'toast') say(e.text);
        else if (e.type === 'power') {
          sfx('power');
          if (soundRef.current && musicRef.current) musicRef.current.play('veloce');
          setBanner(true);
          setTimeout(() => setBanner(false), 4200);
        }
      }
      g.events.length = 0;
      if (musicRef.current) musicRef.current.setIntensity(g.t / POWER_AT);
      uiRef.current.pops = uiRef.current.pops.filter((p) => now - p.born < 1400);
      if (g.unlocked !== unlocked) {
        unlocked = g.unlocked;
        say(`${PROPS[unlocked - 1].name} joins your portfolio. You now run ${unlocked} properties`);
      }

      // Drop selections that are no longer valid.
      const ui = uiRef.current;
      if (ui.selectedTicket) {
        const tk = g.tickets.find((t) => t.id === ui.selectedTicket);
        if (!tk || tk.status !== 'open') setSelTicket(null);
      }
      if (ui.selectedStaff) {
        const s = g.staff.find((x) => x.id === ui.selectedStaff);
        if (!canDispatch(g, s)) setSelStaff(null);
      }

      paint(now);
      if (now - lastUi > 90) {
        lastUi = now;
        setFrame((f) => f + 1);
      }
      if (g.over) {
        setSelTicket(null);
        setSelStaff(null);
        setPhase('over');
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, paint, say, sfx]);

  // Music follows the game: plays while playing, holds while paused, jingle at the end.
  useEffect(() => {
    const m = musicRef.current;
    if (!m) return;
    if (!soundOn) {
      m.pause();
      return;
    }
    if (phase === 'play') {
      m.resume();
      m.play(gRef.current.veloce ? 'veloce' : 'rush');
    } else if (phase === 'paused') m.pause();
    else if (phase === 'over') {
      m.stop();
      m.sfx(gRef.current.result === 'win' ? 'win' : 'lose');
    }
  }, [phase, soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      try {
        window.localStorage.setItem('veloce-game-sound', on ? 'off' : 'on');
      } catch (e) {
        // Ignore blocked storage.
      }
      return !on;
    });
  }, []);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && phaseRef.current === 'play') setPhase('paused');
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const start = () => {
    // Audio can only start from a tap or click, so create it here.
    if (!musicRef.current) musicRef.current = createMusic();
    if (musicRef.current) musicRef.current.stop();
    gRef.current = createGame();
    uiRef.current.pops = [];
    setSelTicket(null);
    setSelStaff(null);
    setToast(null);
    setBanner(false);
    setPhase('play');
  };

  const g = gRef.current;
  const playing = phase === 'play';

  const pickTicket = (tk) => {
    if (!playing || !tk || !live(tk)) return;
    if (!tk.answered) {
      if (answer(g, tk.id)) sfx('tap');
    } else if (tk.role === 'owner') {
      decide(g, tk.id);
    } else if (tk.status === 'open') {
      if (selStaff) {
        const s = g.staff.find((x) => x.id === selStaff);
        if (dispatch(g, tk.id, s.id)) {
          sfx('send');
          setSelStaff(null);
          setSelTicket(null);
        }
      } else {
        setSelTicket(selTicket === tk.id ? null : tk.id);
        sfx('tap');
      }
    }
    setFrame((f) => f + 1);
  };

  const pickStaff = (s) => {
    if (!playing) return;
    if (!canDispatch(g, s)) {
      say(g.veloce ? `${first(s.name)} is busy. Veloce will queue the next job` : `${first(s.name)} is out. Staff come back to the office for each new job`);
      return;
    }
    if (selTicket) {
      if (dispatch(g, selTicket, s.id)) {
        sfx('send');
        setSelTicket(null);
        setSelStaff(null);
      }
    } else {
      setSelStaff(selStaff === s.id ? null : s.id);
      sfx('tap');
    }
    setFrame((f) => f + 1);
  };

  const powerUp = () => {
    if (activatePower(g)) setFrame((f) => f + 1);
  };

  // Keyboard: 1 to 4 pick staff, V switches on Veloce, M mutes, Space pauses.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('input, textarea')) return;
      const p = phaseRef.current;
      if (e.key === 'm' || e.key === 'M') {
        toggleSound();
        return;
      }
      if (e.code === 'Space' && (p === 'play' || p === 'paused')) {
        e.preventDefault();
        setPhase(p === 'play' ? 'paused' : 'play');
        return;
      }
      if (p !== 'play') return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4) pickStaff(gRef.current.staff[n - 1]);
      if (e.key === 'v' || e.key === 'V') powerUp();
      if (e.key === 'Escape') {
        setSelTicket(null);
        setSelStaff(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const onMapTap = (e) => {
    if (!playing) return;
    const r = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * W;
    const my = ((e.clientY - r.top) / r.height) * H;
    const hitStaff = g.staff.find((s) => Math.abs(s.x - mx) < 5 && my > s.y - 12 && my < s.y + 3);
    if (hitStaff) return pickStaff(hitStaff);
    const i = propAt(g, mx, my);
    if (i < 0) return undefined;
    const tk = g.tickets.find((t) => t.prop === i && live(t));
    return tk ? pickTicket(tk) : undefined;
  };

  const r = g ? rating(g) : 4.4;
  const tone = r >= 4.5 ? 'good' : r >= 3.8 ? 'mid' : 'bad';
  const tickets = g ? g.tickets.filter(live) : [];

  return (
    <div className={`game sheet ${g && g.veloce ? 'is-veloce' : ''}`}>
      <div className="g-hud">
        <div className={`g-rating ${tone}`} aria-label={`Property rating ${fmtRating(r)} out of 5`}>
          <Stars value={r} />
          <b>{fmtRating(r)}</b>
        </div>
        <div className="g-time" aria-label="Time left">
          <span>Time</span>
          <b>{fmtTime(g ? DURATION - g.t : DURATION)}</b>
        </div>
        <div className="g-props">
          <span>Properties</span>
          <b>{g ? g.unlocked : 3}</b>
        </div>
        {g && g.veloce && (
          <div className="g-on"><VeloceMark /> Veloce on</div>
        )}
        <button
          type="button"
          className="g-pause g-sound"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Mute music and sound' : 'Turn on music and sound'}
        >
          <svg viewBox="0 0 10 10" width="16" height="16" aria-hidden="true">
            <path d="M1 3.5h2l2.5-2v7l-2.5-2h-2z" fill="currentColor" />
            {soundOn ? (
              <path d="M7 3.5v3M8.5 2.5v5" stroke="currentColor" strokeWidth="1" />
            ) : (
              <path d="M6.8 3.3l2.4 3.4M9.2 3.3L6.8 6.7" stroke="currentColor" strokeWidth="1" />
            )}
          </svg>
        </button>
        <button
          type="button"
          className="g-pause"
          onClick={() => setPhase(phase === 'play' ? 'paused' : 'play')}
          disabled={phase !== 'play' && phase !== 'paused'}
          aria-label={phase === 'paused' ? 'Resume game' : 'Pause game'}
        >
          {phase === 'paused' ? (
            <svg viewBox="0 0 10 10" width="14" height="14" aria-hidden="true"><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 10 10" width="14" height="14" aria-hidden="true"><path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" /></svg>
          )}
        </button>
      </div>

      <div className="g-stage">
        <div className="g-map">
          <canvas
            ref={canvasRef}
            className="g-canvas"
            onPointerDown={onMapTap}
            role="img"
            aria-label="Map of your properties, the office and your staff"
          />
          {g && g.power === 'available' && playing && (
            <button type="button" className="g-power" onClick={powerUp}>
              <VeloceMark scale={3} />
              <span>
                <b>Switch on Veloce</b>
                <small>Calls and messages logged and routed for you</small>
              </span>
            </button>
          )}
          {banner && (
            <div className="g-banner" role="status">
              <VeloceMark scale={3} />
              <p><b>Veloce is on.</b> Every complaint is logged and sent straight to the right person. Your staff get their next job without coming back to the office.</p>
            </div>
          )}
          {toast && !banner && <p className="g-toast" key={toast.id} role="status">{toast.text}</p>}
        </div>

        <div className="g-side">
          <div className="g-team" role="group" aria-label="Your staff">
            {g && g.staff.map((s, i) => {
              const ready = playing && canDispatch(g, s);
              const want = selTicket && ready;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`g-staff ${ready ? 'ready' : ''} ${selStaff === s.id ? 'sel' : ''} ${want ? 'want' : ''}`}
                  onClick={() => pickStaff(s)}
                  aria-pressed={selStaff === s.id}
                  aria-label={`${s.name}, ${ROLES[s.role].job}, ${staffStatus(g, s)}. Key ${i + 1}`}
                >
                  <Avatar s={s} />
                  <span className="g-staff-t">
                    <b>{first(s.name)}</b>
                    <small>{ROLES[s.role].label}</small>
                    <em>{staffStatus(g, s)}</em>
                  </span>
                  <kbd aria-hidden="true">{i + 1}</kbd>
                </button>
              );
            })}
          </div>

          <div className="g-inbox" aria-label="Complaints" role="list">
            {tickets.length === 0 && <p className="g-empty">No open complaints.</p>}
            {tickets.map((tk) => {
              const frac = Math.max(0, timeLeft(g, tk) / tk.patience);
              const actionable = playing && (!tk.answered || (tk.status === 'open'));
              const ch = channelIcon(tk.channel);
              return (
                <div role="listitem" key={tk.id}>
                  <button
                    type="button"
                    className={`g-ticket ${!tk.answered ? 'ringing' : ''} ${tk.role === 'owner' && tk.answered ? 'owner' : ''} ${selTicket === tk.id ? 'sel' : ''} ${tk.status !== 'open' ? 'moving' : ''}`}
                    onClick={() => pickTicket(tk)}
                    disabled={!actionable}
                    aria-pressed={selTicket === tk.id}
                  >
                    <span className="g-tk-top">
                      <b>{PROPS[tk.prop].name}</b>
                      <span className="g-ch">
                        {ch && <IssueIcon name={ch} scale={2} />}
                        {!tk.answered ? 'Incoming call' : CHANNELS[tk.channel]}
                      </span>
                    </span>
                    <span className="g-tk-body">
                      {tk.answered ? <IssueIcon name={tk.icon} /> : <IssueIcon name="phone" />}
                      <span>{tk.answered ? tk.text : 'A guest is calling'}</span>
                    </span>
                    <span className="g-tk-foot">
                      {tk.status === 'queued' || (tk.told && tk.status !== 'open') ? <VeloceMark scale={1} /> : null}
                      {ticketStatus(g, tk)}
                    </span>
                    <span className="g-bar" aria-hidden="true">
                      <span className={frac > 0.5 ? 'ok' : frac > 0.25 ? 'mid' : 'bad'} style={{ width: `${frac * 100}%` }} />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {phase === 'start' && <StartScreen onStart={start} />}
      {phase === 'paused' && (
        <div className="g-over">
          <div className="g-card">
            <h2>Paused</h2>
            <p>The clock has stopped. Your guests will wait.</p>
            <div className="g-actions">
              <button type="button" className="btn btn-primary" onClick={() => setPhase('play')}>Resume</button>
            </div>
          </div>
        </div>
      )}
      {phase === 'over' && g && <EndScreen g={g} onAgain={start} />}
    </div>
  );
}

function StartScreen({ onStart }) {
  return (
    <div className="g-over">
      <div className="g-card">
        <h2>Keep your rating up</h2>
        <p>
          Guests report problems by phone, on WhatsApp, through caretakers and through property owners. Send each
          one to the right person before it turns into a bad review.
        </p>
        <ul className="g-legend">
          <li><IssueIcon name="ac" /><IssueIcon name="drop" /><IssueIcon name="bolt" /><span><b>Caretakers</b> repair AC, water and power</span></li>
          <li><IssueIcon name="towel" /><IssueIcon name="broom" /><span><b>Housekeeper</b> handles towels, sheets and cleaning</span></li>
          <li><IssueIcon name="key" /><IssueIcon name="note" /><span><b>Ops manager</b> sorts out keys, door codes and noise</span></li>
          <li><IssueIcon name="clock" /><span><b>You</b> approve late check-outs and extra nights</span></li>
        </ul>
        <p className="g-how">
          Tap a complaint, then tap who should fix it. Answer calls first. Staff come back to the office after every
          job. The game lasts two minutes and has music, which you can mute.
        </p>
        <div className="g-actions">
          <button type="button" className="btn btn-primary" onClick={onStart}>Start the game</button>
        </div>
        <p className="g-keys">On a keyboard: 1 to 4 pick staff, M mutes, Space pauses.</p>
      </div>
    </div>
  );
}

function EndScreen({ g, onAgain }) {
  const end = rating(g);
  const win = g.result === 'win';
  return (
    <div className="g-over">
      <div className="g-card">
        <h2>{win ? `You reached a ${WIN_RATING} rating` : `Time is up. Your rating is ${fmtRating(end)}`}</h2>
        <div className="g-compare">
          <div className="bad">
            <span>Before Veloce</span>
            <b>{fmtRating(g.low)}</b>
            <small>Lowest rating while you routed every complaint yourself</small>
          </div>
          <div className="good">
            <span>With Veloce</span>
            <b>{fmtRating(Math.max(g.highAfter, end))}</b>
            <small>Highest rating once complaints were logged and routed for you</small>
          </div>
        </div>
        <p>
          {g.handled} complaints resolved, {g.routedDone} of them routed by Veloce. In a real portfolio, Veloce
          brings complaints from calls, WhatsApp, caretakers and owners into one place and gets the right person to
          fix them.
        </p>
        <div className="g-actions">
          <a className="btn btn-primary" href={DEMO_URL} {...ext}>Book a 30-minute call</a>
          <button type="button" className="btn btn-ghost" onClick={onAgain}>Play again</button>
        </div>
      </div>
    </div>
  );
}
