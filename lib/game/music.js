// Chiptune music and sound effects for /play, made live with the Web Audio API.
// No audio files. Two loops: a tense minor one that speeds up as the game ramps,
// and a brighter major one once Veloce is on.

const mtof = (m) => 440 * 2 ** ((m - 69) / 12);
const _ = null;

const SONGS = {
  rush: {
    lead: [
      [76, _, 72, _, 69, _, 72, 76, 77, _, 76, _, 72, _, 69, _],
      [77, _, 72, _, 69, _, 72, 77, 79, _, 77, _, 76, _, 72, _],
      [79, _, 74, _, 71, _, 74, 79, 81, _, 79, _, 77, _, 74, _],
      [76, _, 71, _, 68, _, 71, 76, 80, _, 76, _, 74, _, 71, _],
    ],
    bass: [45, 41, 43, 40],
    hat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    wave: 'square',
  },
  veloce: {
    lead: [
      [72, _, _, 76, _, _, 79, _, 84, _, _, 79, _, 76, _, _],
      [71, _, _, 74, _, _, 79, _, 83, _, _, 79, _, 74, _, _],
      [72, _, _, 76, _, _, 81, _, 84, _, _, 81, _, 76, _, _],
      [72, _, _, 77, _, _, 81, _, 84, _, 81, _, 79, _, 77, _],
    ],
    bass: [48, 43, 45, 41],
    hat: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    wave: 'triangle',
  },
};

export function createMusic() {
  const Ctx = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);

  // One second of white noise for hats and the "bad review" buzz.
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  let song = null;
  let bpm = 120;
  let stepIdx = 0;
  let nextAt = 0;
  let timer = null;

  function tone(freq, at, dur, { wave = 'square', vol = 0.08, slideTo } = {}) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = wave;
    o.frequency.setValueAtTime(freq, at);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, at + dur);
    g.gain.setValueAtTime(vol, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(master);
    o.start(at);
    o.stop(at + dur + 0.02);
  }

  function hiss(at, dur, vol = 0.03, hp = 6000) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = hp;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f).connect(g).connect(master);
    src.start(at, Math.random() * 0.5);
    src.stop(at + dur + 0.02);
  }

  function playStep(i, at) {
    const s = SONGS[song];
    const bar = Math.floor(i / 16) % 4;
    const k = i % 16;
    const sixteenth = 60 / bpm / 4;
    const note = s.lead[bar][k];
    if (note) tone(mtof(note), at, sixteenth * (song === 'veloce' ? 2.6 : 1.6), { wave: s.wave, vol: song === 'veloce' ? 0.1 : 0.05 });
    if (k % 2 === 0) {
      const root = s.bass[bar] + (k % 4 === 2 ? 12 : 0);
      tone(mtof(root), at, sixteenth * 1.8, { wave: 'triangle', vol: 0.14 });
    }
    if (k === 0 || k === 8) tone(150, at, 0.12, { wave: 'sine', vol: 0.25, slideTo: 45 });
    if (s.hat[k]) hiss(at, 0.04);
  }

  function schedule() {
    while (nextAt < ctx.currentTime + 0.12) {
      playStep(stepIdx, nextAt);
      stepIdx++;
      nextAt += 60 / bpm / 4;
    }
  }

  function startLoop(name) {
    song = name;
    stepIdx = 0;
    nextAt = ctx.currentTime + 0.06;
    if (!timer) timer = setInterval(schedule, 25);
  }

  function stopLoop() {
    clearInterval(timer);
    timer = null;
    song = null;
  }

  function arp(notes, gap, opts) {
    const t0 = ctx.currentTime + 0.02;
    notes.forEach((n, i) => tone(mtof(n), t0 + i * gap, gap * 2.2, opts));
  }

  return {
    play(name) {
      if (ctx.state === 'suspended') ctx.resume();
      if (song !== name) startLoop(name);
    },
    // 0 at the start of the game, 1 when the power-up arrives.
    setIntensity(k) {
      if (song === 'rush') bpm = 118 + 34 * Math.min(1, Math.max(0, k));
      else bpm = 124;
    },
    pause() {
      if (ctx.state === 'running') ctx.suspend();
    },
    resume() {
      if (ctx.state === 'suspended') ctx.resume();
    },
    stop() {
      stopLoop();
    },
    sfx(kind) {
      if (ctx.state !== 'running') return;
      const t = ctx.currentTime + 0.01;
      if (kind === 'tap') tone(mtof(84), t, 0.05, { vol: 0.05 });
      else if (kind === 'send') arp([79, 86], 0.05, { vol: 0.06 });
      else if (kind === 'good') arp([84, 88, 91], 0.05, { vol: 0.06 });
      else if (kind === 'bad') {
        tone(110, t, 0.25, { wave: 'sawtooth', vol: 0.06, slideTo: 70 });
        hiss(t, 0.15, 0.04, 800);
      } else if (kind === 'wrong') arp([67, 63], 0.08, { vol: 0.06 });
      else if (kind === 'power') arp([60, 64, 67, 72, 76, 79, 84, 88, 91, 96], 0.045, { vol: 0.08 });
      else if (kind === 'win') arp([72, 76, 79, 84, 79, 84, 88], 0.11, { vol: 0.09 });
      else if (kind === 'lose') arp([72, 71, 69, 64], 0.16, { wave: 'triangle', vol: 0.12 });
    },
    close() {
      stopLoop();
      ctx.close();
    },
  };
}
