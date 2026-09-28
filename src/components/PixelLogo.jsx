import { useEffect, useRef, useState } from "react";

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
    <span onMouseEnter={play} className={className}>
      <span className="sr-only">{text}</span>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ fontFamily: `"Geist Pixel ${FACES[faces[i]]}", monospace` }}>{ch}</span>
      ))}
    </span>
  );
};

