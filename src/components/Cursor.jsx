import { useEffect, useRef } from "react";

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
    if (reduce || !c) return () => { mo.disconnect(); root.classList.remove("pixel-cursor"); };

    // pixel wake: the 8px grid cells you pass over light up and fade out.
    // clicks throw a small burst of squares along the grid.
    const ctx = c.getContext("2d");
    const G = 8;
    let cells = new Map();
    let sparks = [];
    let raf = 0, running = false, dpr = 1;
    const size = () => {
      dpr = window.devicePixelRatio || 1;
      c.width = innerWidth * dpr; c.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const fg = getComputedStyle(root).getPropertyValue("--fg").trim();
      ctx.fillStyle = fg;
      const now = performance.now();
      cells.forEach((t, key) => {
        const age = (now - t) / 550;
        if (age >= 1) { cells.delete(key); return; }
        const [gx, gy] = key.split(",").map(Number);
        ctx.globalAlpha = 0.14 * (1 - age);
        ctx.fillRect(gx * G + 1, gy * G + 1, G - 2, G - 2);
      });
      sparks = sparks.filter((s) => {
        const age = (now - s.t) / 420;
        if (age >= 1) return false;
        const d = Math.round((age * 4) + 1) * G;
        ctx.globalAlpha = 0.6 * (1 - age);
        ctx.fillRect(s.x + s.dx * d - 2, s.y + s.dy * d - 2, 4, 4);
        return true;
      });
      ctx.globalAlpha = 1;
      if (cells.size || sparks.length) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };

    let lx = null, ly = null;
    const move = (e) => {
      const gx = Math.floor(e.clientX / G), gy = Math.floor(e.clientY / G);
      // fill the cells between the last and current point so fast moves leave a line, not dots
      if (lx !== null) {
        const steps = Math.max(Math.abs(gx - lx), Math.abs(gy - ly));
        for (let i = 1; i < steps; i++) cells.set(`${Math.round(lx + ((gx - lx) * i) / steps)},${Math.round(ly + ((gy - ly) * i) / steps)}`, performance.now());
      }
      cells.set(`${gx},${gy}`, performance.now());
      lx = gx; ly = gy;
      kick();
    };
    const click = (e) => {
      const x = Math.floor(e.clientX / G) * G + G / 2, y = Math.floor(e.clientY / G) * G + G / 2;
      [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].forEach(([dx, dy]) => sparks.push({ x, y, dx, dy, t: performance.now() }));
      kick();
    };
    const leave = () => { lx = ly = null; };

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

  return <canvas ref={canvas} className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" aria-hidden="true" />;
};

export default Cursor;
