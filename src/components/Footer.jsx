import { useEffect, useRef } from "react";
import { profile } from "../data";
import LikeButton from "./LikeButton";
import { Reveal } from "./Reveal";
import { Mail } from "./Icons";
import { PixelMorph } from "./PixelLogo";
import Logo from "./Logo";
import { startGhostGame } from "./Game";

// dot field that swells around the cursor
const DotField = () => {
  const canvas = useRef(null);
  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, dpr, raf, mx = -999, my = -999, visible = false;
    const gap = 12;
    const size = () => {
      dpr = window.devicePixelRatio || 1;
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#000";
      ctx.fillStyle = fg;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const d = Math.hypot(x - mx, y - my);
          const k = Math.max(0, 1 - d / 110);
          const fade = Math.min(1, 0.25 + y / h);
          ctx.globalAlpha = (0.18 + k * 0.8) * fade;
          const r = 0.8 + k * 2.6;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(draw);
    };
    const move = (e) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); draw(); } });
    size(); io.observe(c); draw();
    window.addEventListener("resize", size);
    c.addEventListener("mousemove", move);
    c.addEventListener("mouseleave", leave);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={canvas} className="block h-40 w-full" aria-hidden="true" />;
};

const Footer = () => (
  <footer>
    <div className="hline px-4 py-12 text-center sm:px-6">
      <Reveal>
        <p className="text-4xl sm:text-5xl"><PixelMorph text="Still here?" /></p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">Thanks for scrolling this far. I'm open to AI/ML engineering roles and internships.</p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <a href="#contact" className="btn-dark inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-transform active:scale-95"><Mail className="size-4" /> Get in touch</a>
          <LikeButton />
        </div>
        <button onClick={startGhostGame} className="group mx-auto mt-6 flex items-center gap-2 font-mono text-xs text-faint transition-colors hover:text-fg">
          <Logo className="h-4 w-auto transition-transform group-hover:-rotate-12" /> or go catch the ghost
        </button>
      </Reveal>
    </div>
    <div className="hline px-4 py-5 text-center text-sm text-muted sm:px-6">
      Designed and built by <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="ulink-static text-fg">{profile.name}</a>
      <br /><span className="font-mono text-xs text-faint">© {new Date().getFullYear()}<span className="hidden sm:inline"> · press Ctrl/⌘ K to jump anywhere</span></span>
    </div>
    <div className="hline"><DotField /></div>
  </footer>
);

export default Footer;
