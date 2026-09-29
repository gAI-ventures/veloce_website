'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon, Mark } from './Icons';

const ISSUES = [
  {
    from: { icon: 'phone', who: 'Guest, check-in call', text: 'The AC isn’t cooling.' },
    to: { icon: 'check', tag: 'Fixed before checkout', title: 'AC repaired, Room 401', sub: '42 min after the call' },
  },
  {
    from: { icon: 'chat', who: 'Guest, WhatsApp', text: 'No hot water in the shower.' },
    to: { icon: 'check', tag: 'Assigned', title: 'Plumber at 10:00', sub: 'Guest updated' },
  },
  {
    from: { icon: 'user', who: 'Caretaker', text: 'The lock in 2B is sticking again.' },
    to: { icon: 'alert', tag: 'Repeat fault', title: 'Lock in 2B flagged', sub: 'Third time this month' },
  },
  {
    from: { icon: 'phone', who: 'Owner', text: 'A guest at Villa 7 called me.' },
    to: { icon: 'check', tag: 'Handled', title: 'Villa 7 issue logged', sub: 'Owner kept in the loop' },
  },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Starts false on the server and on first paint, then follows the media query.
function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Convergence() {
  const compact = useMedia('(max-width: 760px)');
  const reduce = useMedia('(prefers-reduced-motion: reduce)');

  const gridRef = useRef(null);
  const coreRef = useRef(null);
  const dotRef = useRef(null);
  const srcRefs = useRef([]);
  const outRefs = useRef([]);
  const inPaths = useRef([]);
  const outPaths = useRef([]);

  const [wires, setWires] = useState({ ins: [], outs: [] });
  const [active, setActive] = useState({ src: -1, out: -1, wire: null });
  const [done, setDone] = useState(() => new Set());
  const [pulse, setPulse] = useState(0);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    const core = coreRef.current;
    if (!grid || !core || compact) return;
    const g = grid.getBoundingClientRect();
    const rel = (el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - g.left, r: r.right - g.left, cy: r.top - g.top + r.height / 2 };
    };
    const curve = (x1, y1, x2, y2) => {
      const m = (x1 + x2) / 2;
      return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`;
    };
    const k = rel(core);
    setWires({
      ins: srcRefs.current.map((el) => { const a = rel(el); return curve(a.r, a.cy, k.l, k.cy); }),
      outs: outRefs.current.map((el) => { const a = rel(el); return curve(k.r, k.cy, a.l, a.cy); }),
    });
  }, [compact]);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (reduce) {
      setDone(new Set(ISSUES.map((_, i) => i)));
      return undefined;
    }
    let alive = true;

    const travel = (path, ms) => new Promise((resolve) => {
      const dot = dotRef.current;
      if (compact || !path || !dot) { setTimeout(resolve, 550); return; }
      const len = path.getTotalLength();
      let t0 = null;
      dot.style.opacity = '1';
      const step = (ts) => {
        if (!alive) return;
        if (t0 === null) t0 = ts;
        const u = Math.min(1, (ts - t0) / ms);
        const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        const pt = path.getPointAtLength(len * e);
        dot.style.transform = `translate(${pt.x - 5}px, ${pt.y - 5}px)`;
        if (u < 1) requestAnimationFrame(step);
        else { dot.style.opacity = '0'; resolve(); }
      };
      requestAnimationFrame(step);
    });

    (async () => {
      while (alive) {
        setDone(new Set());
        for (let i = 0; i < ISSUES.length && alive; i += 1) {
          setActive({ src: i, out: -1, wire: `in${i}` });
          await travel(inPaths.current[i], 900);
          if (!alive) return;
          setPulse((p) => p + 1);
          await wait(250);
          setActive({ src: -1, out: i, wire: `out${i}` });
          await travel(outPaths.current[i], 900);
          if (!alive) return;
          setDone((d) => new Set(d).add(i));
          setActive({ src: -1, out: i, wire: null });
          await wait(700);
          setActive({ src: -1, out: -1, wire: null });
        }
        await wait(3200);
      }
    })();

    return () => { alive = false; };
  }, [compact, reduce]);

  const renderSrc = (item, i, measured) => (
    <div ref={measured ? (el) => { srcRefs.current[i] = el; } : undefined} className={`src ${active.src === i ? 'hot' : ''}`}>
      <small><Icon name={item.icon} />{item.who}</small>
      <p>&ldquo;{item.text}&rdquo;</p>
    </div>
  );
  const renderOut = (item, i, measured) => (
    <div ref={measured ? (el) => { outRefs.current[i] = el; } : undefined} className={`out ${done.has(i) ? 'done' : ''} ${active.out === i ? 'hot' : ''}`}>
      <small><Icon name={item.icon} />{item.tag}</small>
      <b>{item.title}</b>
      <span>{item.sub}</span>
    </div>
  );

  return (
    <div className="conv" role="img" aria-label="Four issues from a guest call, a guest WhatsApp message, a caretaker and an owner, each handled in one place by Veloce">
      <div className="conv-top" aria-hidden="true"><span>Coming in</span><span>Handled</span></div>

      <div className="conv-rows" aria-hidden="true">
        {ISSUES.map((it, i) => (
          <div className="conv-row" key={it.from.who}>
            {renderSrc(it.from, i, false)}
            <span className={`row-arrow ${active.src === i || active.out === i ? 'hot' : ''}`}>
              <Mark className="row-mark" />
            </span>
            {renderOut(it.to, i, false)}
          </div>
        ))}
      </div>

      <div className="conv-grid" ref={gridRef} aria-hidden="true">
        <svg className="cwires">
          {wires.ins.map((d, i) => (
            <path key={`in${i}`} d={d} ref={(el) => { inPaths.current[i] = el; }} className={active.wire === `in${i}` ? 'hot' : ''} />
          ))}
          {wires.outs.map((d, i) => (
            <path key={`out${i}`} d={d} ref={(el) => { outPaths.current[i] = el; }} className={active.wire === `out${i}` ? 'hot' : ''} />
          ))}
        </svg>
        <div className="col">{ISSUES.map((it, i) => <div key={it.from.who}>{renderSrc(it.from, i, true)}</div>)}</div>
        <div className={`core ${pulse % 2 ? 'pulse-a' : 'pulse-b'}`} ref={coreRef}>
          <span className="core-mark"><Mark /></span>
          <small>Veloce</small>
        </div>
        <div className="col">{ISSUES.map((it, i) => <div key={it.to.title}>{renderOut(it.to, i, true)}</div>)}</div>
        <span className="dot" ref={dotRef} />
      </div>
    </div>
  );
}

