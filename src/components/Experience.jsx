import { useState } from "react";
import { experience } from "../data";
import Section from "./Section";
import { Reveal } from "./Reveal";
import { Arrow, Chevron } from "./Icons";
import OrgLogo from "./OrgLogo";

const Row = ({ e, i }) => {
  const [open, setOpen] = useState(i === 0);
  return (
    <Reveal delay={i * 80} className={i > 0 ? "border-t border-dashed border-line" : ""}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6"
        aria-expanded={open}
        data-cursor={open ? "close" : "expand"}
      >
        <OrgLogo name={e.logo} alt={`${e.company} logo`} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 font-medium">
            {e.company}
            {e.current && <span className="chip rounded-full px-1.5 py-px font-mono text-[11px] text-muted">now</span>}
          </span>
          <span className="block text-sm text-muted">{e.role} · {e.meta}</span>
        </span>
        <span className="hidden font-mono text-xs text-faint sm:block">{e.date}</span>
        <Chevron className={`size-4 shrink-0 text-faint transition-transform duration-300 group-hover:text-fg ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className={`px-4 pb-5 pl-[68px] transition-opacity duration-500 sm:px-6 sm:pl-[80px] ${open ? "opacity-100" : "opacity-0"}`}>
            <p className="font-mono text-xs text-faint sm:hidden">{e.date}</p>
            <p className="mt-1 text-sm text-fg sm:mt-0">{e.summary}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2.5"><span className="mt-2 size-1 shrink-0 bg-[color:var(--deco)]" aria-hidden="true" />{p}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {e.tags.map((t) => <span key={t} className="chip rounded-md px-2 py-0.5 font-mono text-[11px] text-muted">{t}</span>)}
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs text-muted ulink hover:text-fg">
                {e.link.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]} <Arrow className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const Experience = () => (
  <Section id="experience" title="Experience">
    {experience.map((e, i) => <Row key={e.company} e={e} i={i} />)}
  </Section>
);

export default Experience;
