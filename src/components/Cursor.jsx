import { useEffect, useRef, useState } from "react";

// dot follows the pointer exactly, ring trails behind with a lerp.
// Over links/buttons the ring grows, over [data-cursor] it shows a label.
const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let mx = -100, my = -100, rx = -100, ry = -100, scale = 1, target = 1, raf;
    let down = false;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      const el = e.target.closest?.("a, button, [data-cursor], input, [role=button]");
      const lbl = e.target.closest?.("[data-cursor]")?.getAttribute("data-cursor") || "";
      setLabel(lbl);
      target = lbl ? 3.4 : el ? 2 : 1;
    };
    const leave = () => { mx = my = -100; };
    const md = () => { down = true; };
    const mu = () => { down = false; };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += ((down ? target * 0.8 : target) - scale) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-white mix-blend-difference" style={{ willChange: "transform" }}>
        <span className={`font-mono text-[4px] uppercase tracking-wider text-white transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" style={{ willChange: "transform" }} />
    </>
  );
};

export default Cursor;
