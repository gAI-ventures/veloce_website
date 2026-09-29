// Game rules for /play. Plain JavaScript with no React or DOM, so it can run
// headless for tuning. The component calls step() every frame and draws the state.

export const W = 192;
export const H = 128;
export const STREET_Y = 64;
export const DURATION = 60;
export const POWER_AT = 40; // Veloce runs the last 20 seconds
export const POWER_AUTO = 0; // Veloce switches itself on at POWER_AT
export const WIN_RATING = 4.8;
export const WINDOW = 8; // the rating is the average of the last 8 reviews
const SEED_REVIEWS = [5, 4, 5, 4, 5, 4, 5, 4];
const SPEED = 34; // map pixels per second
const TOLD = 3;

export const OFFICE = { x: 96, y: 50 };

// Property slots in unlock order. Doors sit on the street side of each building.
export const PROPS = [
  { name: 'Palm villa', kind: 'villa', x: 24, y: 78 },
  { name: 'Harbour flat', kind: 'flat', x: 144, y: 50 },
  { name: 'Olive suites', kind: 'hotel', x: 120, y: 78 },
  { name: 'Lake house', kind: 'villa', x: 48, y: 50 },
  { name: 'Cedar villa', kind: 'villa', x: 168, y: 78 },
  { name: 'Marina loft', kind: 'flat', x: 72, y: 78 },
  { name: 'Hill cabin', kind: 'villa', x: 180, y: 50 },
  { name: 'Rose apartments', kind: 'hotel', x: 12, y: 50 },
];
const UNLOCK_AT = [6, 13, 20, 28, 46];

export const ROLES = {
  repair: { label: 'Caretaker', job: 'Repairs' },
  clean: { label: 'Housekeeper', job: 'Cleaning and linen' },
  guest: { label: 'Ops manager', job: 'Check-in, keys, noise' },
  owner: { label: 'You', job: 'Decisions' },
};

const FIX = { repair: 3.4, clean: 2.8, guest: 2 };

export const ISSUES = [
  { key: 'ac', role: 'repair', icon: 'ac', text: 'The AC is not cooling' },
  { key: 'leak', role: 'repair', icon: 'drop', text: 'Water is leaking under the sink' },
  { key: 'hot', role: 'repair', icon: 'drop', text: 'No hot water in the shower' },
  { key: 'power', role: 'repair', icon: 'bolt', text: 'Power is out in the bedroom' },
  { key: 'towels', role: 'clean', icon: 'towel', text: 'No fresh towels in the room' },
  { key: 'sheets', role: 'clean', icon: 'towel', text: 'The bed sheets were not changed' },
  { key: 'dirty', role: 'clean', icon: 'broom', text: 'The kitchen was not cleaned' },
  { key: 'keybox', role: 'guest', icon: 'key', text: 'We cannot find the key box' },
  { key: 'code', role: 'guest', icon: 'key', text: 'The door code is not working' },
  { key: 'noise', role: 'guest', icon: 'note', text: 'The neighbours are very loud' },
  { key: 'late', role: 'owner', icon: 'clock', text: 'Can we check out late tomorrow?' },
  { key: 'extend', role: 'owner', icon: 'clock', text: 'Can we stay one more night?' },
];
const ROLE_WEIGHT = { repair: 0.42, clean: 0.21, guest: 0.22, owner: 0.15 };

export const CHANNELS = {
  call: 'Call',
  whatsapp: 'WhatsApp',
  caretaker: 'From caretaker',
  owner: 'From property owner',
};
const CHANNEL_WEIGHT = { call: 0.36, whatsapp: 0.36, caretaker: 0.14, owner: 0.14 };

const lerp = (a, b, k) => a + (b - a) * Math.min(1, Math.max(0, k));

// Seconds between new complaints. Ramps until the power-up, then keeps creeping up.
export function spawnGap(t) {
  return t < POWER_AT ? lerp(2.2, 1.2, t / POWER_AT) : lerp(1.6, 1.5, (t - POWER_AT) / (DURATION - POWER_AT));
}
function patienceAt(t) {
  return lerp(13, 10, t / POWER_AT);
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickWeighted(rng, weights) {
  let r = rng();
  for (const [k, w] of Object.entries(weights)) {
    if ((r -= w) <= 0) return k;
  }
  return Object.keys(weights)[0];
}

function makeStaff() {
  const s = (id, role, name, dx) => ({
    id, role, name, x: OFFICE.x + dx, y: OFFICE.y, home: OFFICE.x + dx,
    state: 'idle', ticketId: null, path: [], timer: 0, queue: [], face: 1,
  });
  return [
    s('c1', 'repair', 'Caretaker Ravi', -9),
    s('c2', 'repair', 'Caretaker Ana', -3),
    s('hk', 'clean', 'Housekeeper Mei', 3),
    s('om', 'guest', 'Ops manager Sam', 9),
  ];
}

export function rating(g) {
  const r = g.reviews.slice(-WINDOW);
  return r.reduce((a, b) => a + b, 0) / r.length;
}

export function createGame({ seed = Date.now() } = {}) {
  const g = {
    t: 0, over: false, result: null, rng: mulberry32(seed), nextId: 1, nextSpawn: 1.2,
    tickets: [], staff: makeStaff(), reviews: [...SEED_REVIEWS], unlocked: 3,
    veloce: false, power: 'none', flagged: {}, faults: {}, events: [],
    low: 5, highAfter: 0, handled: 0, routedDone: 0,
  };
  g.low = rating(g);
  return g;
}

export const live = (tk) => tk.status !== 'done' && tk.status !== 'expired';
export const timeLeft = (g, tk) => tk.patience - (g.t - tk.born);
export const atOffice = (s) => s.state === 'idle' && Math.abs(s.y - OFFICE.y) < 0.5 && Math.abs(s.x - s.home) < 0.5;

function emit(g, e) {
  g.events.push({ ...e, at: g.t });
}

function review(g, stars, tk) {
  g.reviews.push(stars);
  const p = PROPS[tk.prop];
  emit(g, { type: 'review', stars, x: p.x, y: p.y - 22, prop: tk.prop });
  const r = rating(g);
  if (!g.veloce) g.low = Math.min(g.low, r);
  else g.highAfter = Math.max(g.highAfter, r);
}

function starsFor(g, tk) {
  const f = (g.t - tk.born) / tk.patience;
  if (f <= 0.5) return 5;
  if (f <= 0.75) return 4;
  if (f <= 1) return 3;
  return 2;
}

function spawn(g) {
  const busy = new Set(g.tickets.filter(live).map((tk) => tk.prop));
  const free = [];
  for (let i = 0; i < g.unlocked; i++) if (!busy.has(i)) free.push(i);
  if (!free.length) return;
  const prop = free[Math.floor(g.rng() * free.length)];
  const role = pickWeighted(g.rng, ROLE_WEIGHT);
  let options = ISSUES.filter((i) => i.role === role && !g.flagged[`${prop}:${i.key}`]);
  if (!options.length) options = ISSUES.filter((i) => i.role === 'clean');
  const issue = options[Math.floor(g.rng() * options.length)];
  let channel = pickWeighted(g.rng, CHANNEL_WEIGHT);
  if (issue.role === 'owner' && channel === 'caretaker') channel = 'whatsapp';
  const tk = {
    id: g.nextId++, prop, issue: issue.key, role: issue.role, icon: issue.icon, text: issue.text, channel,
    answered: g.veloce || channel !== 'call', born: g.t, patience: patienceAt(g.t), status: 'open', staffId: null,
  };
  g.tickets.push(tk);

  // Repeat-fault tracking. Only Veloce acts on it.
  if (issue.role === 'repair') {
    const k = `${prop}:${issue.key}`;
    g.faults[k] = (g.faults[k] || 0) + 1;
    if (g.veloce && g.faults[k] >= 2 && !g.flagged[k]) {
      g.flagged[k] = true;
      emit(g, { type: 'toast', text: `Repeat fault flagged: ${issue.key === 'ac' ? 'AC' : issue.text.toLowerCase()} at ${PROPS[prop].name}` });
    }
  }
}

function routeTo(s, to) {
  s.path = [{ x: s.x, y: STREET_Y }, { x: to.x, y: STREET_Y }, { x: to.x, y: to.y }];
}

function sendTo(g, s, tk) {
  s.state = 'going';
  s.ticketId = tk.id;
  tk.status = 'assigned';
  tk.staffId = s.id;
  routeTo(s, PROPS[tk.prop]);
}

function nextJob(g, s) {
  s.ticketId = null;
  while (g.veloce && s.queue.length) {
    const tk = g.tickets.find((x) => x.id === s.queue[0]);
    s.queue.shift();
    if (tk && live(tk)) {
      sendTo(g, s, tk);
      return;
    }
  }
  if (g.veloce) {
    s.state = 'idle';
    s.path = [];
  } else {
    s.state = 'returning';
    routeTo(s, { x: s.home, y: OFFICE.y });
  }
}

// Player actions. Each returns true when it did something.
export function answer(g, id) {
  const tk = g.tickets.find((x) => x.id === id);
  if (!tk || tk.answered || !live(tk)) return false;
  tk.answered = true;
  return true;
}

export function canDispatch(g, s) {
  return !g.over && s.state === 'idle' && (g.veloce || atOffice(s));
}

export function dispatch(g, ticketId, staffId) {
  const tk = g.tickets.find((x) => x.id === ticketId);
  const s = g.staff.find((x) => x.id === staffId);
  if (!tk || !s || tk.status !== 'open' || !tk.answered || tk.role === 'owner' || !canDispatch(g, s)) return false;
  sendTo(g, s, tk);
  return true;
}

export function decide(g, id) {
  const tk = g.tickets.find((x) => x.id === id);
  if (!tk || tk.role !== 'owner' || tk.status !== 'open' || !tk.answered) return false;
  tk.status = 'done';
  g.handled++;
  review(g, starsFor(g, tk), tk);
  return true;
}

export function activatePower(g) {
  if (g.power !== 'available') return false;
  g.power = 'on';
  g.veloce = true;
  for (const tk of g.tickets) if (live(tk)) tk.answered = true;
  emit(g, { type: 'power' });
  return true;
}

function autoRoute(g) {
  const open = g.tickets
    .filter((tk) => tk.status === 'open' && tk.role !== 'owner')
    .sort((a, b) => timeLeft(g, a) - timeLeft(g, b));
  for (const tk of open) {
    const team = g.staff.filter((s) => s.role === tk.role);
    const load = (s) => s.queue.length + (s.state === 'idle' ? 0 : 1);
    team.sort((a, b) => load(a) - load(b) || Math.abs(a.x - PROPS[tk.prop].x) - Math.abs(b.x - PROPS[tk.prop].x));
    const s = team[0];
    // Veloce tells the guest someone is on the way, which buys time.
    tk.patience *= TOLD;
    tk.told = true;
    if (s.state === 'idle' || s.state === 'returning') sendTo(g, s, tk);
    else {
      s.queue.push(tk.id);
      tk.status = 'queued';
      tk.staffId = s.id;
    }
    emit(g, { type: 'route', ticketId: tk.id, staffId: s.id });
  }
}

function moveStaff(g, s, dt) {
  let budget = SPEED * dt;
  while (budget > 0 && s.path.length) {
    const p = s.path[0];
    const dx = p.x - s.x;
    const dy = p.y - s.y;
    const d = Math.abs(dx) + Math.abs(dy);
    if (dx) s.face = dx > 0 ? 1 : -1;
    if (d <= budget) {
      s.x = p.x;
      s.y = p.y;
      budget -= d;
      s.path.shift();
    } else {
      // Paths are axis aligned, so only one of dx, dy is non-zero.
      s.x += Math.sign(dx) * Math.min(Math.abs(dx), budget);
      s.y += Math.sign(dy) * Math.min(Math.abs(dy), budget);
      budget = 0;
    }
  }
  return s.path.length === 0;
}

function updateStaff(g, s, dt) {
  const tk = s.ticketId ? g.tickets.find((x) => x.id === s.ticketId) : null;
  if (s.state === 'going') {
    if (!tk || !live(tk)) return nextJob(g, s);
    if (!moveStaff(g, s, dt)) return;
    if (tk.role !== s.role) {
      s.state = 'wrong';
      s.timer = 1.2;
      tk.status = 'open';
      tk.staffId = null;
      emit(g, { type: 'wrong', staffId: s.id, prop: tk.prop });
    } else {
      s.state = 'fixing';
      s.timer = FIX[s.role];
      tk.status = 'fixing';
    }
  } else if (s.state === 'fixing') {
    s.timer -= dt;
    if (s.timer > 0) return;
    if (tk && live(tk)) {
      tk.status = 'done';
      g.handled++;
      if (tk.told) g.routedDone++;
      review(g, starsFor(g, tk), tk);
    }
    nextJob(g, s);
  } else if (s.state === 'wrong') {
    s.timer -= dt;
    if (s.timer <= 0) nextJob(g, s);
  } else if (s.state === 'returning') {
    if (moveStaff(g, s, dt)) s.state = 'idle';
  }
}

export function step(g, dt) {
  if (g.over) return;
  dt = Math.min(dt, 0.1);
  g.t += dt;

  g.unlocked = 3 + UNLOCK_AT.filter((u) => g.t >= u).length;
  if (g.power === 'none' && g.t >= POWER_AT) {
    g.power = 'available';
    emit(g, { type: 'powerReady' });
  }
  if (g.power === 'available' && g.t >= POWER_AT + POWER_AUTO) activatePower(g);

  while (g.t >= g.nextSpawn) {
    spawn(g);
    g.nextSpawn += spawnGap(g.t) * (0.7 + g.rng() * 0.6);
  }

  for (const tk of g.tickets) {
    if ((tk.status === 'open' || tk.status === 'assigned' || tk.status === 'queued') && timeLeft(g, tk) <= 0) {
      tk.status = 'expired';
      review(g, 1, tk);
    }
  }
  for (const s of g.staff) {
    s.queue = s.queue.filter((id) => {
      const tk = g.tickets.find((x) => x.id === id);
      return tk && live(tk);
    });
    updateStaff(g, s, dt);
  }
  if (g.veloce) autoRoute(g);

  // Drop finished tickets once nothing points at them.
  if (g.tickets.length > 40) g.tickets = g.tickets.filter((tk) => live(tk) || g.t - tk.born < 30);

  // The game always runs the full minute. It counts as a win if the rating ends at WIN_RATING or above.
  if (g.t >= DURATION) {
    g.over = true;
    g.result = rating(g) >= WIN_RATING - 1e-9 ? 'win' : 'time';
  }
}
