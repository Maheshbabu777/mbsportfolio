import { useEffect, useMemo, useRef, useState } from "react";

// hand-drawn 5x7 bitmap letters
const GLYPHS = {
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
};

// Bitmap text as SVG squares. On hover the pixels scatter and snap back.
export const BitText = ({ text, px = 3, gap = 1, className = "", interactive = true }) => {
  const [burst, setBurst] = useState(0);
  const timer = useRef(null);
  const cells = useMemo(() => {
    const out = [];
    text.split("").forEach((ch, li) => {
      (GLYPHS[ch] || []).forEach((row, y) => row.split("").forEach((b, x) => {
        if (b === "1") out.push({ x: li * 6 + x, y, k: `${li}-${x}-${y}` });
      }));
    });
    return out;
  }, [text]);

  const offsets = useMemo(
    () => cells.map(() => [(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, Math.random() * 120]),
    [cells, burst]
  );

  const [scatter, setScatter] = useState(false);
  const play = () => {
    if (!interactive || scatter) return;
    setBurst((b) => b + 1);
    setScatter(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setScatter(false), 180);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const cols = text.length * 6 - 1;
  const step = px + gap;
  return (
    <svg
      onMouseEnter={play}
      width={cols * step - gap}
      height={7 * step - gap}
      viewBox={`0 0 ${cols * step - gap} ${7 * step - gap}`}
      className={`overflow-visible ${className}`}
      role="img"
      aria-label={text}
    >
      {cells.map((c, i) => {
        const [dx, dy, d] = offsets[i];
        return (
          <rect
            key={c.k}
            x={c.x * step}
            y={c.y * step}
            width={px}
            height={px}
            fill="currentColor"
            style={{
              transform: scatter ? `translate(${dx}px, ${dy}px)` : "none",
              opacity: scatter ? 0.35 : 1,
              transition: scatter ? "transform .16s ease-out, opacity .16s" : `transform .5s cubic-bezier(.2,1.4,.3,1) ${d}ms, opacity .4s ${d}ms`,
            }}
          />
        );
      })}
    </svg>
  );
};

const FACES = ["Square", "Grid", "Circle", "Triangle", "Line"];

// Text that morphs through the Geist Pixel families letter by letter on hover
export const PixelMorph = ({ text, className = "" }) => {
  const [faces, setFaces] = useState(() => text.split("").map(() => 0));
  const timers = useRef([]);
  const play = () => {
    timers.current.forEach(clearTimeout); timers.current = [];
    text.split("").forEach((_, i) => {
      FACES.forEach((__, step) => {
        timers.current.push(setTimeout(() => {
          setFaces((f) => { const n = [...f]; n[i] = (step + 1) % FACES.length; return n; });
        }, i * 40 + step * 80));
      });
    });
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return (
    <span onMouseEnter={play} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ fontFamily: `"Geist Pixel ${FACES[faces[i]]}", monospace` }}>{ch}</span>
      ))}
    </span>
  );
};

export default BitText;
