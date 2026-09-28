import { useEffect, useRef, useState } from "react";

// Pixel-art cursors drawn from bitmaps. B = outline, W = fill.
// Rendered 1:1 as a native CSS cursor, so it never lags, never blurs and never grows.
const ARROW = [
  "B..........",
  "BB.........",
  "BWB........",
  "BWWB.......",
  "BWWWB......",
  "BWWWWB.....",
  "BWWWWWB....",
  "BWWWWWWB...",
  "BWWWWWWWB..",
  "BWWWWWWWWB.",
  "BWWWWWBBBBB",
  "BWWBWWB....",
  "BWB.BWWB...",
  "BB..BWWB...",
  "B....BWWB..",
  ".....BWWB..",
  "......BB...",
];
const HAND = [
  "....BB..........",
  "...BWWB.........",
  "...BWWB.........",
  "...BWWB.........",
  "...BWWBBB.......",
  "...BWWBWWBBB....",
  "...BWWBWWBWWBB..",
  "BB.BWWBWWBWWBWB.",
  "BWBBWWWWWWWWBWB.",
  "BWWBWWWWWWWWWWB.",
  ".BWWWWWWWWWWWWB.",
  "..BWWWWWWWWWWWB.",
  "..BWWWWWWWWWWB..",
  "...BWWWWWWWWWB..",
  "...BWWWWWWWWB...",
  "....BWWWWWWWB...",
  "....BBBBBBBBB...",
];

const toSvg = (rows, fill, line) => {
  const w = rows[0].length, h = rows.length;
  let rects = "";
  rows.forEach((r, y) => r.split("").forEach((c, x) => {
    if (c === "B") rects += `<rect x='${x}' y='${y}' width='1' height='1' fill='${line}'/>`;
    if (c === "W") rects += `<rect x='${x}' y='${y}' width='1' height='1' fill='${fill}'/>`;
  }));
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' shape-rendering='crispEdges'>${rects}</svg>`)}")`;
};

const Cursor = () => {
  const canvas = useRef(null);
  const spot = useRef(null);
  const chip = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const root = document.documentElement;

    const setCursors = () => {
      const dark = root.classList.contains("dark");
      const fill = dark ? "#0a0a0a" : "#ffffff";
      const line = dark ? "#fafafa" : "#0a0a0a";
      root.style.setProperty("--cur-arrow", `${toSvg(ARROW, fill, line)} 0 0, default`);
      root.style.setProperty("--cur-hand", `${toSvg(HAND, fill, line)} 5 0, pointer`);
    };
    setCursors();
    root.classList.add("pixel-cursor");
    const mo = new MutationObserver(setCursors);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = canvas.current;
    const ctx = c.getContext("2d");
    const G = 8;
    let sparks = [], dpr = 1, running = false, raf = 0;
    let mx = -500, my = -500, sx = -500, sy = -500, cx = -500, cy = -500;

    const size = () => {
      dpr = window.devicePixelRatio || 1;
      c.width = innerWidth * dpr; c.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const loop = () => {
      // spotlight eases behind the pointer, the label chip sticks closer
      sx += (mx - sx) * 0.14; sy += (my - sy) * 0.14;
      cx += (mx - cx) * 0.35; cy += (my - cy) * 0.35;
      if (spot.current) { spot.current.style.setProperty("--sx", `${sx}px`); spot.current.style.setProperty("--sy", `${sy}px`); }
      if (chip.current) chip.current.style.transform = `translate3d(${Math.round(cx + 14)}px, ${Math.round(cy + 20)}px, 0)`;

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (sparks.length) {
        ctx.fillStyle = getComputedStyle(root).getPropertyValue("--fg").trim();
        const now = performance.now();
        sparks = sparks.filter((p) => {
          const age = (now - p.t) / 420;
          if (age >= 1) return false;
          const d = Math.round(age * 4 + 1) * G;
          ctx.globalAlpha = 0.55 * (1 - age);
          ctx.fillRect(p.x + p.dx * d - 2, p.y + p.dy * d - 2, 4, 4);
          return true;
        });
        ctx.globalAlpha = 1;
      }
      const settled = Math.abs(mx - sx) < 0.5 && Math.abs(my - sy) < 0.5 && Math.abs(mx - cx) < 0.5 && !sparks.length;
      if (settled) running = false; else raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };

    const move = (e) => {
      if (sx < -400) { sx = cx = e.clientX; sy = cy = e.clientY; }
      mx = e.clientX; my = e.clientY;
      const t = e.target.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : "");
      kick();
    };
    const click = (e) => {
      if (reduce) return;
      const x = Math.floor(e.clientX / G) * G + G / 2, y = Math.floor(e.clientY / G) * G + G / 2;
      [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].forEach(([dx, dy]) => sparks.push({ x, y, dx, dy, t: performance.now() }));
      kick();
    };
    const leave = () => { mx = my = -500; setLabel(""); kick(); };

    window.addEventListener("resize", size);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", click);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      root.classList.remove("pixel-cursor");
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      {/* dot grid that only exists around the pointer */}
      <div ref={spot} className="cursor-spot pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" aria-hidden="true" />
      {/* context label, e.g. "open", "expand" */}
      <div ref={chip} className="pointer-events-none fixed left-0 top-0 z-[200]" aria-hidden="true">
        <span className={`btn-dark block rounded-md px-1.5 py-0.5 font-mono text-[11px] leading-4 transition-[opacity,transform] duration-150 ${label ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          {label || "\u00a0"}
        </span>
      </div>
    </>
  );
};

export default Cursor;
