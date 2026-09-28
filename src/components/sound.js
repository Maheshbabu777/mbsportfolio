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

// Only things you click make a sound: a short two-step 8-bit blip, plus catch/miss in the ghost game.
const SOUNDS = {
  click: (c) => { tone(c, { f: 880, dur: 0.028, vol: 0.022, type: "square" }); tone(c, { f: 1320, t: 0.03, dur: 0.03, vol: 0.016, type: "square" }); },
  catch: (c) => [523, 659, 784, 1047].forEach((f, i) => tone(c, { f, t: i * 0.045, dur: 0.07, vol: 0.03, type: "square" })),
  miss: (c) => tone(c, { f: 180, f2: 110, dur: 0.12, vol: 0.035, type: "square" }),
};

export const play = (name) => {
  if (!enabled) return;
  const c = ac();
  if (!c) return;
  try { SOUNDS[name]?.(c); } catch { /* ignore */ }
};

// one click sound for anything pressable; the ghost game plays its own sounds instead
export const wireSounds = () => {
  const down = (e) => {
    if (e.button !== 0) return;
    if (document.documentElement.classList.contains("ghost-out")) return;
    if (e.target.closest?.("a, button, [role=button], summary")) play("click");
  };
  document.addEventListener("pointerdown", down);
  return () => document.removeEventListener("pointerdown", down);
};
