// Tiny synth for UI sounds. Everything is generated with WebAudio, no audio files.
const KEY = "mb-sound";
let ctx = null;
let enabled = (() => { try { return localStorage.getItem(KEY) !== "off"; } catch { return true; } })();
const listeners = new Set();

export const soundOn = () => enabled;
export const setSound = (v) => {
  enabled = v;
  try { localStorage.setItem(KEY, v ? "on" : "off"); } catch { /* ignore */ }
  listeners.forEach((f) => f(v));
  if (v) play("toggle");
};
export const onSoundChange = (f) => { listeners.add(f); return () => listeners.delete(f); };

const ac = () => {
  if (!ctx) {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    ctx = new A();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const tone = (c, { f = 440, f2, type = "sine", t = 0, dur = 0.06, vol = 0.05 }) => {
  const o = c.createOscillator();
  const g = c.createGain();
  const now = c.currentTime + t;
  o.type = type;
  o.frequency.setValueAtTime(f, now);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, now + dur);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  o.connect(g).connect(c.destination);
  o.start(now);
  o.stop(now + dur + 0.02);
};

const SOUNDS = {
  hover: (c) => tone(c, { f: 2100, dur: 0.018, vol: 0.012, type: "triangle" }),
  click: (c) => tone(c, { f: 520, f2: 260, dur: 0.07, vol: 0.05 }),
  toggle: (c) => { tone(c, { f: 660, dur: 0.05, vol: 0.04, type: "triangle" }); tone(c, { f: 990, t: 0.05, dur: 0.06, vol: 0.035, type: "triangle" }); },
  open: (c) => tone(c, { f: 380, f2: 760, dur: 0.09, vol: 0.035, type: "triangle" }),
  // 8-bit bits for the ghost game
  catch: (c) => [523, 659, 784, 1047].forEach((f, i) => tone(c, { f, t: i * 0.045, dur: 0.07, vol: 0.03, type: "square" })),
  miss: (c) => tone(c, { f: 180, f2: 110, dur: 0.12, vol: 0.04, type: "square" }),
  start: (c) => [392, 523, 659].forEach((f, i) => tone(c, { f, t: i * 0.08, dur: 0.09, vol: 0.03, type: "square" })),
  over: (c) => [659, 523, 392, 523].forEach((f, i) => tone(c, { f, t: i * 0.11, dur: 0.12, vol: 0.03, type: "square" })),
  tired: (c) => tone(c, { f: 300, f2: 200, dur: 0.2, vol: 0.025, type: "sawtooth" }),
};

export const play = (name) => {
  if (!enabled) return;
  const c = ac();
  if (!c) return;
  try { SOUNDS[name]?.(c); } catch { /* ignore */ }
};

// global wiring: soft tick on hovering interactive things, a click on press
let lastHover = 0;
let lastEl = null;
export const wireSounds = () => {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};
  const over = (e) => {
    const el = e.target.closest?.("a, button, [data-sound]");
    if (!el || el === lastEl) return;
    lastEl = el;
    const now = performance.now();
    if (now - lastHover < 45) return;
    lastHover = now;
    if (ctx) play("hover"); // only after the first click unlocks audio
  };
  const out = (e) => { if (!e.relatedTarget?.closest?.("a, button, [data-sound]")) lastEl = null; };
  const down = (e) => { if (e.target.closest?.("a, button, [role=button]")) play("click"); };
  document.addEventListener("pointerover", over);
  document.addEventListener("pointerout", out);
  document.addEventListener("pointerdown", down);
  return () => {
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerout", out);
    document.removeEventListener("pointerdown", down);
  };
};
