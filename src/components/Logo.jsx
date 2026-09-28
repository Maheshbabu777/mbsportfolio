import { useEffect, useRef, useState } from "react";

// Mahesh's ghost mark. The two square eyes look toward the cursor and blink now and then.
const Logo = ({ className = "h-8 w-auto" }) => {
  const ref = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 160);
        // whole-unit steps keep the pixel eyes crisp
        setLook({ x: Math.round((dx / d) * 1.6 * k), y: Math.round((dy / d) * 1.6 * k) });
      });
    };
    window.addEventListener("mousemove", move, { passive: true });

    let t;
    const schedule = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        schedule();
      }, 2800 + Math.random() * 3200);
    };
    schedule();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);

  const eye = (x) => (
    <rect
      x={x}
      y={17 + (blink ? 1.5 : 0)}
      width="4"
      height={blink ? 1 : 4}
      fill="var(--bg)"
      style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: "transform .15s steps(2)" }}
    />
  );

  return (
    <svg ref={ref} viewBox="0 0 30 32" className={className} role="img" aria-label="Mahesh logo" shapeRendering="geometricPrecision">
      <g fill="currentColor">
        <path d="M0 0H5.66V27.86L0 26.95V0Z" />
        <path d="M0 0C2.21 0 5.67 0 5.67 0L15 12.61L17.65 16.48L10.58 19.1L0 0Z" />
        <path d="M30 0C27.79 0 24.34 0 24.34 0V27.86L30 26.95V0Z" />
        <path d="M30 0C27.79 0 24.33 0 24.33 0L15.04 12.67L12.35 16.48L19.42 19.1C19.42 19.1 25.87 7.46 30 0Z" />
        <path d="M9.71 32L7.94 29.09L6.18 32L4.41 29.09L2.65 32L0 26.95V.7L15 12.61L30 .7V26.95L27.35 32L25.59 29.09L23.82 32L22.06 29.09L20.29 32L18.53 29.09L16.76 32L15 29.09L13.24 32L11.47 29.09L9.71 32Z" />
      </g>
      {eye(6)}
      {eye(20)}
    </svg>
  );
};

export default Logo;
