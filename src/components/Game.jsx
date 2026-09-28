import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";

// "Catch the ghost": the logo escapes the header and runs around the screen.
// It dodges the cursor and gets faster every time you catch it. 30 seconds a round.
const ROUND = 30;
const SIZE = 40;
const BEST_KEY = "mb-ghost-best";

const readBest = () => { try { return +localStorage.getItem(BEST_KEY) || 0; } catch { return 0; } };
const saveBest = (n) => { try { localStorage.setItem(BEST_KEY, String(n)); } catch { /* ignore */ } };

export const startGhostGame = () => window.dispatchEvent(new Event("ghost:play"));

const LINES = ["too slow", "nope", "missed me", "try harder", "almost", "hehe"];

const Game = () => {
  const [phase, setPhase] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [left, setLeft] = useState(ROUND);
  const [best, setBest] = useState(readBest);
  const [mood, setMood] = useState("normal");
  const [bursts, setBursts] = useState([]);
  const [taunt, setTaunt] = useState(null);

  const ghost = useRef(null);
  const st = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, mx: -999, my: -999, caught: 0, stun: 0 });
  const raf = useRef(0);
  const timer = useRef(0);

  const newTarget = () => {
    const s = st.current;
    s.tx = 40 + Math.random() * (innerWidth - 80 - SIZE);
    s.ty = 90 + Math.random() * (innerHeight - 140 - SIZE);
  };

  const start = useCallback(() => {
    const s = st.current;
    const logo = document.querySelector("[data-ghost-home]")?.getBoundingClientRect();
    s.x = logo ? logo.left : 40; s.y = logo ? logo.top : 20;
    s.vx = 2; s.vy = 3; s.caught = 0; s.stun = 0;
    newTarget();
    setScore(0); setMisses(0); setLeft(ROUND); setMood("normal"); setBursts([]); setTaunt(null);
    setPhase("playing");
    document.documentElement.classList.add("ghost-out");
    window.__lenis?.stop();
  }, []);

  const stop = useCallback((finished) => {
    cancelAnimationFrame(raf.current);
    clearInterval(timer.current);
    document.documentElement.classList.remove("ghost-out");
    window.__lenis?.start();
    setPhase(finished ? "over" : "idle");
  }, []);

  // round over
  useEffect(() => {
    if (phase !== "playing" || left > 0) return;
    stop(true);
    if (score > readBest()) { saveBest(score); setBest(score); }
  }, [left, phase, score, stop]);

  useEffect(() => {
    const play = () => start();
    window.addEventListener("ghost:play", play);
    return () => window.removeEventListener("ghost:play", play);
  }, [start]);

  // game loop
  useEffect(() => {
    if (phase !== "playing") return;
    const s = st.current;
    const touch = !window.matchMedia("(pointer: fine)").matches;

    timer.current = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);

    const tick = () => {
      const level = s.caught;
      const maxV = (touch ? 3.2 : 2.6) + level * 0.55;
      if (s.stun > 0) { s.stun -= 1; s.vx *= 0.8; s.vy *= 0.8; }
      else {
        // wander toward a target
        const dx = s.tx - s.x, dy = s.ty - s.y, d = Math.hypot(dx, dy);
        if (d < 30) newTarget();
        s.vx += (dx / (d || 1)) * 0.18;
        s.vy += (dy / (d || 1)) * 0.18;
        // run from the cursor
        const cx = s.x + SIZE / 2, cy = s.y + SIZE / 2;
        const fx = cx - s.mx, fy = cy - s.my, fd = Math.hypot(fx, fy);
        const fear = 110 + level * 12;
        if (fd < fear) {
          const k = (1 - fd / fear) * (1.1 + level * 0.12);
          s.vx += (fx / (fd || 1)) * k;
          s.vy += (fy / (fd || 1)) * k;
          if (fd < 70) newTarget();
        }
        const sp = Math.hypot(s.vx, s.vy);
        if (sp > maxV) { s.vx = (s.vx / sp) * maxV; s.vy = (s.vy / sp) * maxV; }
        setMood((m) => { const nm = fd < fear * 0.7 ? "scared" : "normal"; return m === nm ? m : nm; });
      }
      s.x += s.vx; s.y += s.vy;
      // bounce off the edges
      const maxX = innerWidth - SIZE - 8, maxY = innerHeight - SIZE - 8;
      if (s.x < 8) { s.x = 8; s.vx = Math.abs(s.vx); }
      if (s.x > maxX) { s.x = maxX; s.vx = -Math.abs(s.vx); }
      if (s.y < 64) { s.y = 64; s.vy = Math.abs(s.vy); }
      if (s.y > maxY) { s.y = maxY; s.vy = -Math.abs(s.vy); }
      if (ghost.current) {
        const tilt = Math.max(-14, Math.min(14, s.vx * 3));
        const bob = Math.sin(performance.now() / 160) * 2;
        ghost.current.style.transform = `translate3d(${Math.round(s.x)}px, ${Math.round(s.y + bob)}px, 0) rotate(${tilt.toFixed(1)}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const move = (e) => { s.mx = e.clientX; s.my = e.clientY; };
    const key = (e) => { if (e.key === "Escape") stop(false); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf.current);
      clearInterval(timer.current);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("keydown", key);
    };
  }, [phase, stop]);

  const burst = (x, y) => {
    const id = Math.random();
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((q) => q.id !== id)), 600);
  };

  const onBoard = (e) => {
    if (phase !== "playing") return;
    const s = st.current;
    const pad = 8;
    const hit = e.clientX > s.x - pad && e.clientX < s.x + SIZE + pad && e.clientY > s.y - pad && e.clientY < s.y + SIZE + pad;
    if (hit) {
      s.caught += 1;
      s.stun = 26;
      setScore((n) => n + 1);
      setMood("caught");
      burst(s.x + SIZE / 2, s.y + SIZE / 2);
      setTimeout(() => {
        // respawn on the far side of the screen
        s.x = s.x > innerWidth / 2 ? 40 + Math.random() * 120 : innerWidth - 160 + Math.random() * 100;
        s.y = 90 + Math.random() * (innerHeight - 200);
        s.vx = s.vy = 0; newTarget(); setMood("normal");
      }, 380);
    } else {
      setMisses((m) => m + 1);
      setTaunt({ text: LINES[Math.floor(Math.random() * LINES.length)], x: s.x + SIZE / 2, y: s.y - 10, id: Math.random() });
    }
  };

  useEffect(() => { if (!taunt) return; const t = setTimeout(() => setTaunt(null), 700); return () => clearTimeout(t); }, [taunt]);

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[150] select-none" onPointerDown={onBoard}>
      {phase === "playing" && (
        <>
          {/* HUD */}
          <div className="pointer-events-none fixed left-1/2 top-3 z-10 -translate-x-1/2">
            <div className="btn-dark flex items-center gap-3 rounded-full px-3 py-1.5 font-mono text-xs shadow-lg">
              <span>caught {score}</span>
              <span className="opacity-40">|</span>
              <span className={left <= 5 ? "animate-pulse" : ""}>{left}s</span>
              <span className="opacity-40">|</span>
              <span className="opacity-60">esc to quit</span>
            </div>
          </div>
          <div ref={ghost} className="pointer-events-none fixed left-0 top-0 text-fg will-change-transform" style={{ width: SIZE, height: SIZE }}>
            <Logo className="h-full w-full drop-shadow-[0_4px_0_rgba(0,0,0,.12)]" mood={mood} />
          </div>
          {taunt && (
            <span key={taunt.id} className="swap-enter pointer-events-none fixed chip rounded-md px-1.5 py-0.5 font-mono text-[11px] text-muted" style={{ left: taunt.x, top: taunt.y, transform: "translate(-50%, -100%)" }}>{taunt.text}</span>
          )}
        </>
      )}

      {bursts.map((b) => (
        <span key={b.id} className="pointer-events-none fixed" style={{ left: b.x, top: b.y }}>
          {[[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].map(([dx, dy], i) => (
            <span key={i} className="ghost-spark absolute size-1.5 bg-fg" style={{ "--dx": `${dx * 34}px`, "--dy": `${dy * 34}px` }} />
          ))}
          <span className="ghost-plus absolute -translate-x-1/2 font-mono text-sm font-medium">+1</span>
        </span>
      ))}

      {phase === "over" && (
        <div className="fixed inset-0 grid place-items-center bg-black/30 px-4 backdrop-blur-[2px]" onPointerDown={(e) => e.stopPropagation()}>
          <div className="swap-enter w-full max-w-xs rounded-xl border border-line bg-card p-5 text-center shadow-2xl">
            <Logo className="mx-auto h-10 w-auto" mood={score > 0 ? "caught" : "normal"} />
            <p className="mt-3 text-lg font-medium">{score === 0 ? "He got away." : `You caught him ${score} time${score === 1 ? "" : "s"}.`}</p>
            <p className="mt-1 font-mono text-xs text-faint">
              {misses} missed · best {best}{score > 0 && score === best ? " · new best" : ""}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={start} className="btn-dark rounded-lg px-3 py-1.5 text-sm font-medium">Play again</button>
              <button onClick={() => setPhase("idle")} className="chip rounded-lg px-3 py-1.5 text-sm">Back to site</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
