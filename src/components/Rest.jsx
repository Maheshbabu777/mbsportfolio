import { achievements, certs, education, skills } from "../data";
import Section from "./Section";
import { Reveal } from "./Reveal";
import { Arrow } from "./Icons";
import OrgLogo from "./OrgLogo";

export const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="divide-y divide-dashed divide-[color:var(--line)]">
      {skills.map((g, gi) => (
        <Reveal key={g.group} delay={gi * 60} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
          <span className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint">{g.group}</span>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <span key={s} className="chip rounded-md px-2 py-1 text-[13px] transition-colors duration-200 hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]">{s}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Item = ({ title, desc, date, link, i }) => {
  const Tag = link ? "a" : "div";
  return (
    <Reveal delay={i * 60} className={i > 0 ? "border-t border-dashed border-line" : ""}>
      <Tag {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-3 px-4 py-3.5 sm:px-6">
        <span className="mt-[9px] size-1.5 shrink-0 bg-fg" />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 font-medium">{title}{link && <Arrow className="size-3 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />}</span>
          <span className="block text-sm text-muted">{desc}</span>
        </span>
        <span className="shrink-0 pt-0.5 font-mono text-xs text-faint">{date}</span>
      </Tag>
    </Reveal>
  );
};

export const Achievements = () => (
  <Section id="achievements" title="Achievements">
    {achievements.map((a, i) => <Item key={a.title} {...a} i={i} />)}
  </Section>
);

export const Certifications = () => (
  <Section id="certifications" title="Certifications">
    {certs.map((c, i) => <Item key={c.title} title={c.title} desc={c.issuer} date={c.date} link={c.link} i={i} />)}
  </Section>
);

export const Education = () => (
  <Section id="education" title="Education">
    <Reveal className="group flex items-start gap-3 px-4 py-4 sm:px-6">
      <OrgLogo name="lpu" alt="LPU logo" />
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{education.school}</span>
        <span className="block text-sm text-muted">{education.degree} · {education.grade}</span>
      </span>
      <span className="shrink-0 pt-0.5 text-right font-mono text-xs text-faint">{education.date}<br /><span className="hidden sm:inline">{education.place}</span></span>
    </Reveal>
  </Section>
);
