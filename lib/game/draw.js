// Pixel art renderer for /play. Everything is drawn on a W x H grid, then scaled
// up with nearest-neighbour so the pixels stay sharp. Colours follow the site tokens.
import { W, H, STREET_Y, OFFICE, PROPS, timeLeft, live } from './engine';

const C = {
  grass: '#cbd9c3', grass2: '#bfcfb6', grass3: '#d6e2cf',
  road: '#e7e0cc', road2: '#f6f2e6', curb: '#d5ccb4',
  wall: '#f5f1e6', wall2: '#e4dccb', shade: '#cfc6b1',
  roof1: '#377863', roof2: '#0a5c4a', roof3: '#2e6653', deep: '#0c4a3c',
  win: '#2c3430', glass: '#9ec3b4', door: '#0c4a3c',
  ink: '#0f1311', ink3: '#434c47', white: '#ffffff',
  ok: '#377863', warn: '#c48c1e', danger: '#b42318',
  skin: '#e2b48f', skin2: '#b9825c', hair: '#2c3430',
  amber: '#c48c1e', amber2: '#8a5a06', sage: '#8fb8a4', sage2: '#5f8f7a', brand: '#0a5c4a',
  tree: '#5f8f7a', tree2: '#377863', trunk: '#8a6a4a', water: '#9ec9c9', water2: '#c5e2de',
  mark1: '#9fc4b3', mark2: '#5f9a84',
};

const ICONS = {
  ac: ['...#...', '.#.#.#.', '..###..', '#######', '..###..', '.#.#.#.', '...#...'],
  drop: ['...#...', '..###..', '..###..', '.#####.', '.###o#.', '.##o##.', '..###..'],
  bolt: ['....##.', '...##..', '..##...', '.#####.', '...##..', '..##...', '.##....'],
  towel: ['#######', '.ooooo.', '.ooooo.', '.#####.', '.ooooo.', '.ooooo.', '.o.o.o.'],
  broom: ['......#', '.....#.', '....#..', '...#...', '.ooo...', 'ooooo..', 'o.o.o..'],
  key: ['.......', '.##....', '#..#...', '#..####', '.##..#.', '.....#.', '.......'],
  note: ['..#####', '..#...#', '..#...#', '..#...#', '###.###', '###.###', '.......'],
  clock: ['..###..', '.#...#.', '#..#..#', '#..##.#', '#.....#', '.#...#.', '..###..'],
  phone: ['.##....', '###....', '##.....', '##.....', '###..##', '.######', '..####.'],
  chat: ['.#####.', '#ooooo#', '#o###o#', '#ooooo#', '.#####.', '.#.....', '#......'],
};
const ICON_COLOR = {
  ac: ['#3f7fa6'], drop: ['#3f7fa6', '#c5e2de'], bolt: [C.warn], towel: [C.sage2, '#a9cbbb'], broom: [C.amber2, C.warn],
  key: [C.amber2], note: [C.ink3], clock: [C.brand], phone: [C.danger], chat: [C.ok, C.white],
};
const STAR = ['..#..', '#####', '.###.', '.#.#.', '#...#'];
const MARK = ['a.b..##..', '.a.b..##.', '..a.b..##', '.a.b..##.', 'a.b..##..'];
const DIGITS = {
  1: ['.#.', '##.', '.#.', '.#.', '###'],
  2: ['##.', '..#', '.#.', '#..', '###'],
  3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '##.', '..#', '##.'],
};
const QUESTION = ['.##.', '#..#', '..#.', '....', '..#.'];

function sprite(ctx, rows, x, y, colors) {
  for (let j = 0; j < rows.length; j++) {
    const row = rows[j];
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '.') continue;
      ctx.fillStyle = colors[ch] || colors['#'];
      ctx.fillRect(x + i, y + j, 1, 1);
    }
  }
}
function rect(ctx, x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

// ---------- static background ----------
function tree(ctx, x, y) {
  rect(ctx, x + 2, y + 6, 2, 3, C.trunk);
  rect(ctx, x + 1, y, 4, 1, C.tree);
  rect(ctx, x, y + 1, 6, 4, C.tree);
  rect(ctx, x + 1, y + 5, 4, 1, C.tree);
  rect(ctx, x + 1, y + 1, 2, 2, C.sage);
}

export function drawBackground(ctx) {
  rect(ctx, 0, 0, W, H, C.grass);
  // Deterministic grass texture.
  let s = 7;
  for (let i = 0; i < 260; i++) {
    s = (s * 9301 + 49297) % 233280;
    const x = s % W;
    s = (s * 9301 + 49297) % 233280;
    const y = s % H;
    rect(ctx, x, y, 1, 1, i % 3 ? C.grass2 : C.grass3);
  }
  // Street with a dashed centre line.
  rect(ctx, 0, STREET_Y - 7, W, 1, C.curb);
  rect(ctx, 0, STREET_Y - 6, W, 13, C.road);
  rect(ctx, 0, STREET_Y + 7, W, 1, C.curb);
  for (let x = 2; x < W; x += 8) rect(ctx, x, STREET_Y, 4, 1, C.road2);
  // Paths from every door to the street.
  const doors = [...PROPS, OFFICE];
  for (const p of doors) {
    if (p.y < STREET_Y) rect(ctx, p.x - 1, p.y, 3, STREET_Y - 6 - p.y, C.road);
    else rect(ctx, p.x - 1, STREET_Y + 7, 3, p.y - STREET_Y - 7, C.road);
  }
  // Scenery.
  [[28, 6], [66, 10], [124, 4], [160, 12], [4, 112], [44, 116], [94, 110], [140, 114], [184, 108], [106, 18]].forEach(
    ([x, y]) => tree(ctx, x, y),
  );
  rect(ctx, 84, 104, 18, 9, C.water);
  rect(ctx, 85, 105, 16, 7, C.water2);
  rect(ctx, 86, 106, 14, 5, C.water);
}

// ---------- buildings ----------
function size(p) {
  return {
    wide: p.kind === 'hotel' ? 26 : p.kind === 'flat' ? 18 : 22,
    tall: p.kind === 'flat' ? 22 : p.kind === 'hotel' ? 20 : 16,
  };
}
// Where a property's complaint bubble sits: above the roof, or above the door on the street.
function bubbleTop(p) {
  if (p.y > STREET_Y) return p.y - 13;
  const { tall } = size(p);
  return p.y - tall - (p.kind === 'villa' ? 3 : 0) - 14;
}

// Bottom-row bubbles sit beside the door so staff standing there do not cover them.
const bubbleX = (p) => (p.y > STREET_Y ? p.x + 10 : p.x);

function building(ctx, p, locked, highlight) {
  const up = p.y < STREET_Y; // door faces down onto the street
  const { wide, tall } = size(p);
  const x = p.x - Math.floor(wide / 2);
  const y = up ? p.y - tall : p.y + (p.kind === 'villa' ? 4 : 1);
  if (locked) {
    // Empty plot with a fence until the property joins the portfolio.
    for (let i = 0; i < wide; i += 3) {
      rect(ctx, x + i, y + (up ? tall - 2 : 0), 1, 2, C.shade);
    }
    rect(ctx, x, y + (up ? tall - 1 : 1), wide, 1, C.shade);
    return;
  }
  const roof = p.kind === 'flat' ? C.roof2 : p.kind === 'hotel' ? C.roof3 : C.roof1;
  if (highlight) {
    rect(ctx, x - 2, y - (up ? 6 : 2), wide + 4, tall + 8, C.warn);
    rect(ctx, x - 1, y - (up ? 5 : 1), wide + 2, tall + 6, C.grass);
  }
  // Shadow, walls, roof.
  rect(ctx, x + 1, y + 1, wide, tall, C.shade);
  rect(ctx, x, y, wide, tall, C.wall);
  rect(ctx, x, y + tall - 1, wide, 1, C.wall2);
  const roofH = p.kind === 'flat' ? 3 : 5;
  const ry = y - (p.kind === 'villa' ? 3 : 0);
  if (p.kind === 'villa') {
    for (let k = 0; k < 4; k++) rect(ctx, x - 1 + k, ry + k, wide + 2 - 2 * k < 0 ? 0 : wide + 2 - 2 * k, 1, roof);
    rect(ctx, x - 1, ry + 3, wide + 2, roofH - 1, roof);
  } else {
    rect(ctx, x - 1, ry, wide + 2, roofH, roof);
  }
  // Windows.
  const rows = p.kind === 'flat' ? 3 : 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < Math.floor((wide - 4) / 5); c++) {
      const wx = x + 3 + c * 5;
      const wy = y + roofH + 2 + r * 5;
      if (wy + 3 > y + tall - 5) continue;
      rect(ctx, wx, wy, 3, 3, C.win);
      rect(ctx, wx, wy, 1, 1, C.glass);
    }
  }
  // Door on the street side.
  // Door on the street side: bottom wall for the top row, just under the roof for the bottom row.
  if (up) rect(ctx, p.x - 1, y + tall - 5, 3, 5, C.door);
  else {
    rect(ctx, p.x - 2, ry + roofH, 5, 1, C.shade);
    rect(ctx, p.x - 1, ry + roofH, 3, 5, C.door);
  }
  if (p.kind === 'villa' && !up) {
    rect(ctx, x + wide + 2, y + 8, 6, 5, C.water);
    rect(ctx, x + wide + 3, y + 9, 4, 3, C.water2);
  }
}

function office(ctx, g, blink) {
  const x = OFFICE.x - 14;
  const y = OFFICE.y - 22;
  rect(ctx, x + 1, y + 1, 28, 22, C.shade);
  rect(ctx, x, y, 28, 22, '#fbf8f0');
  rect(ctx, x - 1, y - 1, 30, 5, C.deep);
  rect(ctx, x + 3, y + 7, 22, 6, C.win);
  rect(ctx, x + 4, y + 8, 20, 4, g.veloce ? '#cfe6db' : C.glass);
  // The owner at the desk behind the window.
  rect(ctx, x + 13, y + 8, 2, 2, C.skin);
  rect(ctx, x + 12, y + 10, 4, 2, C.win);
  if (g.veloce) sprite(ctx, MARK, x + 10, y - 7, { a: C.mark1, b: C.mark2, '#': C.brand });
  else if (g.power === 'available' && blink) {
    rect(ctx, x + 8, y - 10, 13, 9, C.white);
    sprite(ctx, MARK, x + 10, y - 8, { a: C.mark1, b: C.mark2, '#': C.brand });
  }
}

// ---------- people ----------
const LOOK = {
  repair: { body: C.amber, legs: C.amber2 },
  clean: { body: C.sage, legs: C.sage2 },
  guest: { body: C.brand, legs: C.deep },
};

function person(ctx, s, frame, selected) {
  const x = Math.round(s.x) - 2;
  const y = Math.round(s.y) - 9;
  const look = LOOK[s.role];
  if (selected) {
    rect(ctx, x - 2, y + 9, 9, 2, C.warn);
  }
  rect(ctx, x + 1, y, 3, 1, s.id === 'c2' ? C.amber2 : C.hair);
  rect(ctx, x + 1, y + 1, 3, 2, C.skin);
  rect(ctx, x, y + 3, 5, 3, look.body);
  if (s.id === 'om') rect(ctx, x + 2, y + 3, 1, 3, C.white);
  const step = frame && s.path.length ? 1 : 0;
  rect(ctx, x + 1, y + 6, 1, 3 - step, look.legs);
  rect(ctx, x + 3, y + 6, 1, 2 + step, look.legs);
}

function bubble(ctx, x, y, icon, frac, ringing, shake) {
  const bx = x - 5 + (ringing && shake ? (Math.floor(shake) % 2 ? 1 : -1) : 0);
  rect(ctx, bx, y, 11, 10, C.ink);
  rect(ctx, bx + 1, y + 1, 9, 8, C.white);
  rect(ctx, x, y + 10, 1, 1, C.ink);
  const cols = ICON_COLOR[icon] || [C.ink];
  sprite(ctx, ICONS[icon], bx + 2, y + 2, { '#': cols[0], o: cols[1] || cols[0] });
  // Patience bar.
  const c = frac > 0.5 ? C.ok : frac > 0.25 ? C.warn : C.danger;
  rect(ctx, bx, y - 3, 11, 2, C.shade);
  rect(ctx, bx, y - 3, Math.max(1, Math.round(11 * frac)), 2, c);
}

// ---------- frame ----------
export function drawFrame(ctx, bg, g, ui, now) {
  ctx.drawImage(bg, 0, 0);
  const blink = ui.reduced ? true : Math.floor(now / 350) % 2 === 0;
  const frame = ui.reduced ? 0 : Math.floor(now / 160) % 2;

  const selTk = g.tickets.find((t) => t.id === ui.selectedTicket);
  PROPS.forEach((p, i) => building(ctx, p, i >= g.unlocked, selTk && selTk.prop === i));
  office(ctx, g, blink);

  // Routes Veloce has sent staff on.
  if (g.veloce) {
    for (const s of g.staff) {
      if (s.state !== 'going' || !s.path.length) continue;
      let px = s.x;
      let py = s.y;
      for (const q of s.path) {
        const dx = Math.sign(q.x - px);
        const dy = Math.sign(q.y - py);
        let n = 0;
        while ((px !== q.x || py !== q.y) && n < 400) {
          if (n % 3 === 0) rect(ctx, px, py, 1, 1, C.ok);
          px = dx ? px + dx : px;
          py = dy ? py + dy : py;
          if (Math.abs(px - q.x) < 1) px = q.x;
          if (Math.abs(py - q.y) < 1) py = q.y;
          n++;
        }
      }
    }
  }

  // Complaint bubbles above each property.
  for (const tk of g.tickets) {
    if (!live(tk)) continue;
    const p = PROPS[tk.prop];
    const top = bubbleTop(p);
    const bx = bubbleX(p);
    const frac = Math.max(0, timeLeft(g, tk) / tk.patience);
    const icon = tk.answered ? tk.icon : 'phone';
    bubble(ctx, bx, Math.max(3, top), icon, frac, !tk.answered, ui.reduced ? 0 : now / 80);
    if (tk.status === 'queued' || (g.veloce && tk.told && tk.status === 'assigned')) {
      sprite(ctx, MARK, bx + 7, Math.max(3, top), { a: C.mark1, b: C.mark2, '#': C.brand });
    }
  }

  // Staff.
  for (const s of g.staff) {
    person(ctx, s, frame, ui.selectedStaff === s.id);
    const x = Math.round(s.x);
    const y = Math.round(s.y) - 9;
    if (s.state === 'fixing') {
      const pct = 1 - s.timer / (s.role === 'repair' ? 3.4 : s.role === 'clean' ? 2.8 : 2);
      rect(ctx, x - 4, y - 4, 9, 2, C.shade);
      rect(ctx, x - 4, y - 4, Math.max(1, Math.round(9 * pct)), 2, C.ok);
    } else if (s.state === 'wrong') {
      rect(ctx, x - 3, y - 8, 6, 7, C.white);
      sprite(ctx, QUESTION, x - 2, y - 7, { '#': C.danger });
    }
  }

  // Review pops.
  for (const e of ui.pops) {
    const age = (now - e.born) / 1000;
    if (age > 1.3) continue;
    const rise = ui.reduced ? 0 : Math.round(age * 10);
    const col = e.stars >= 4 ? C.ok : e.stars === 3 ? C.warn : C.danger;
    const p = PROPS[e.prop];
    const x = bubbleX(p) - 5;
    const y = Math.max(1, bubbleTop(p) - 2 - rise);
    rect(ctx, x - 1, y - 1, 12, 7, C.white);
    sprite(ctx, STAR, x, y, { '#': col });
    sprite(ctx, DIGITS[e.stars], x + 7, y, { '#': col });
  }
}

// Which property sits under a map point, for taps on the map.
export function propAt(g, mx, my) {
  for (let i = 0; i < g.unlocked; i++) {
    const p = PROPS[i];
    const up = p.y < STREET_Y;
    const top = up ? p.y - 40 : p.y - 18;
    const bottom = up ? p.y : p.y + 24;
    if (mx >= p.x - 14 && mx <= p.x + 14 && my >= top && my <= bottom) return i;
  }
  return -1;
}

export { W, H };

export { ICONS, ICON_COLOR, MARK, C as COLORS, LOOK };
