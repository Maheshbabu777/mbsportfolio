import { useRef } from "react";
import semlogic from "../assets/semlogic.webp";
import { moreProjects, projects } from "../data";
import Section from "./Section";
import { Reveal, useInView } from "./Reveal";
import { Arrow, Battery, Github, Note } from "./Icons";


// tilt the media toward the cursor
const useTilt = () => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return { ref, onMove, onLeave };
};

const FraudChart = ({ models }) => {
  const [ref, inView] = useInView();
  const min = 0.9, max = 0.97;
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-3 px-5 py-6 font-mono text-[11px]">
      <div className="flex justify-between text-faint"><span>test AUC</span><span>IEEE-CIS</span></div>
      {models.map((m, i) => (
        <div key={m.n} className="space-y-1">
          <div className="flex justify-between"><span className={i === 0 ? "text-fg" : "text-muted"}>{m.n}</span><span className={i === 0 ? "text-fg" : "text-muted"}>{m.auc.toFixed(3)}</span></div>
          <div className="h-2 overflow-hidden rounded-sm bg-[color:var(--line)]">
            <div
              className={`h-full rounded-sm transition-[width] duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] ${i === 0 ? "bg-fg" : "bg-[color:var(--deco)]"}`}
              style={{ width: inView ? `${((m.auc - min) / (max - min)) * 100}%` : "0%", transitionDelay: `${200 + i * 150}ms` }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 flex items-center gap-2 text-faint">
        <span>recall</span>
        <span className="text-muted line-through decoration-faint">0.59</span>
        <span>→</span>
        <span className="text-fg">0.69</span>
        <span>after threshold tuning</span>
      </div>
    </div>
  );
};

const Media = ({ p }) => {
  const tilt = useTilt();
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-card" onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}>
      <div className="halftone absolute inset-0" />
      <div ref={tilt.ref} className="relative h-full transition-transform duration-300 ease-out will-change-transform">
        {p.kind === "image" ? (
          <div className="h-full p-3">
            <img src={semlogic} alt={`${p.name} screenshot`} className="size-full rounded-lg border border-line object-cover object-top shadow-md" loading="lazy" />
          </div>
        ) : (
          <FraudChart models={p.models} />
        )}
      </div>
    </div>
  );
};

const Card = ({ p, i }) => (
  <Reveal delay={i * 100} className={`flex flex-col gap-3 p-4 sm:p-5 ${i === 0 ? "md:border-r md:border-dashed md:border-line" : "border-t border-dashed border-line md:border-t-0"}`}>
    <a href={p.live || p.code} target="_blank" rel="noopener noreferrer" data-cursor={p.live ? "live demo ↗" : "view code ↗"} aria-label={`Open ${p.name}`}>
      <Media p={p} />
    </a>
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="font-medium">{p.name}</h3>
        <p className="text-xs text-faint">{p.tagline} · {p.date}</p>
      </div>
      <div className="flex shrink-0 gap-1.5">
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live demo`} className="chip inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs">Live <Arrow className="size-3" /></a>
        )}
        <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code`} className="chip inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs"><Github className="size-3" /> Code</a>
      </div>
    </div>
    <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
    {p.stats && (
      <div className="grid grid-cols-3 divide-x divide-dashed divide-[color:var(--line)] rounded-lg border border-dashed border-line">
        {p.stats.map((s) => (
          <div key={s.k} className="px-2 py-2">
            <div className="font-mono text-[13px]">{s.v}</div>
            <div className="text-[11px] uppercase tracking-wider text-faint">{s.k}</div>
          </div>
        ))}
      </div>
    )}
    <div className="mt-auto flex flex-wrap gap-1.5">
      {p.tags.map((t) => <span key={t} className="chip rounded-md px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
    </div>
  </Reveal>
);

const Projects = () => (
  <Section id="work" title="Projects">
    <div className="grid md:grid-cols-2">
      {projects.map((p, i) => <Card key={p.name} p={p} i={i} />)}
    </div>
    <div className="border-t border-dashed border-line px-4 py-3 sm:px-6">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-faint">Earlier</p>
      {moreProjects.map((m, i) => (
        <Reveal key={m.name} delay={i * 60}>
          <a href={m.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-lg py-2.5">
            <span className="chip grid size-8 shrink-0 place-items-center rounded-md">{m.icon === "battery" ? <Battery className="size-4" /> : <Note className="size-4" />}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{m.name}</span>
              <span className="block truncate text-xs text-muted">{m.desc}</span>
            </span>
            <Arrow className="size-3.5 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </a>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Projects;
