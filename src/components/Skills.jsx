import { skills } from "../data";
import Section from "./Section";
import { Reveal } from "./Reveal";
import { BRAND, LINE, REAL } from "./skillIcons";

const SkillIcon = ({ k }) => {
  if (BRAND[k]) {
    return (
      <svg viewBox="0 0 24 24" className="skill-ico size-3.5 shrink-0 fill-current" aria-hidden="true">
        <path d={BRAND[k].d} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="skill-ico size-3.5 shrink-0" aria-hidden="true">
      <path d={LINE[k]} />
    </svg>
  );
};

const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="divide-y divide-dashed divide-[color:var(--line)]">
      {skills.map((g, gi) => (
        <Reveal key={g.group} delay={gi * 50} className="px-4 py-3.5 sm:px-6">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-faint">{g.group}</span>
            {g.note && <span className="text-[11px] text-faint">· {g.note}</span>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map(([name, k]) => (
              <span
                key={name}
                className="group chip inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[color:var(--faint)]"
                style={{ "--brand": (k in REAL ? REAL[k] : BRAND[k]?.hex) || "var(--fg)" }}
              >
                <SkillIcon k={k} />
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Skills;
